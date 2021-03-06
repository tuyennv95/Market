package com.td.simple.service.impl;

import com.google.common.base.Strings;
import com.td.simple.common.CustomerBase;
import com.td.simple.model.account.CurrentUser;
import com.td.simple.model.customer.Customer;
import com.td.simple.model.customer.CustomerAddress;
import com.td.simple.model.order.*;
import com.td.simple.model.product.PriceCustom;
import com.td.simple.model.product.Product;
import com.td.simple.model_dto.ApiResult;
import com.td.simple.model_dto.order.OrderViewDto;
import com.td.simple.model_info.order.OrderAddInfo;
import com.td.simple.model_info.order.OrderPageableInfo;
import com.td.simple.model_info.order.OrderProductAddInfo;
import com.td.simple.model_info.order.OrderUpdateInfo;
import com.td.simple.repository.CustomerAddressRepository;
import com.td.simple.repository.CustomerRepository;
import com.td.simple.repository.OrderRepository;
import com.td.simple.repository.ProductRepository;
import com.td.simple.service.OrderService;
import com.td.simple.utils.NextSequenceService;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.DoubleStream;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository repository;
    private final ProductRepository productRepository;
    private final CustomerRepository customerRepository;
    private final CustomerAddressRepository customerAddressRepository;
    private final NextSequenceService nextSequenceService;

    public OrderServiceImpl(OrderRepository repository, ProductRepository productRepository, CustomerRepository customerRepository, CustomerAddressRepository customerAddressRepository, NextSequenceService nextSequenceService) {
        this.repository = repository;
        this.productRepository = productRepository;
        this.customerRepository = customerRepository;
        this.customerAddressRepository = customerAddressRepository;
        this.nextSequenceService = nextSequenceService;
    }

    public static ModelMapper mapper() {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        return modelMapper;
    }

    public static OrderViewDto mapToView(Order order) {
        return mapper().map(order, OrderViewDto.class);
    }

    public static List<OrderViewDto> mapToView(List<Order> orders) {
        return orders.stream().map(d -> mapper().map(d, OrderViewDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public ApiResult<OrderViewDto> create(OrderAddInfo info, CurrentUser currentUser) {
        ApiResult<OrderViewDto> apiResult = new ApiResult<>();

        // Ki???m tra kh??ch h??ng
        Customer customer = customerRepository.findFirstByUsername(currentUser.getUsername()).orElse(null);

        if (customer == null) {
            apiResult.setError(true);
            apiResult.setCode("CUSTOMER_EXISTS");
            apiResult.setMessage("Kh??ch h??ng kh??ng t???n t???i ho???c ???? b??? xo??");

            return apiResult;
        }

        // Ki???m tra ?????a ch??? giao h??ng
//        CustomerAddress address = customerAddressRepository.findFirstById(info.getAddressId()).orElse(null);
//
//        if (address == null) {
//            apiResult.setError(true);
//            apiResult.setCode("ADDRESS_EXISTS");
//            apiResult.setMessage("?????a ch??? giao h??ng kh??ng t???n t???i ho???c ???? b??? xo??");
//
//            return apiResult;
//        }

        // Danh s??ch s???n ph???m l??n ????n
        List<String> productCodeInfos = info.getProducts().stream().map(OrderProductAddInfo::getCode).collect(Collectors.toList());
        List<Product> products = productRepository.findAllByCodeIn(productCodeInfos);

        if (info.getProducts().size() != products.size()) {
            apiResult.setError(true);
            apiResult.setCode("PRODUCT_COUNT");
            apiResult.setMessage("S???n ph???m kh??ng ph?? h???p");

            return apiResult;
        }

        List<OrderProduct> orderProducts = new ArrayList<>();

        for (Product product : products) {
            OrderProductAddInfo productAddInfo = info.getProducts()
                    .stream()
                    .filter(item -> item.getCode().equals(product.getCode())).findFirst().orElse(null);
            assert productAddInfo != null;

            if (productAddInfo.getQuantity() > product.getQuantity()) {
                apiResult.setError(true);
                apiResult.setCode("EXCEED_QUANTITY");
                apiResult.setMessage("S??? l?????ng s???n ph???m " + productAddInfo.getCode() + " v?????t qu?? kho");

                return apiResult;
            }

            // Ki???m tra s??? ti???n
            BigDecimal price;

            if (product.isSale() && product.getPrice().getPriceSale() != null
                    && product.getPrice().getPriceSale().doubleValue() > 0) {
                price = product.getPrice().getPriceSale();
            } else {
                price = product.getPrice().getPrice();
            }

//            if (product.getPrice().getPriceCustoms() == null || product.getPrice().getPriceCustoms().isEmpty()) {
//                if (product.isSale() && product.getPrice().getPriceSale().doubleValue() > 0) {
//                    price = product.getPrice().getPriceSale();
//                } else {
//                    price = product.getPrice().getPrice();
//                }
//            } else {
//                for (PriceCustom custom : product.getPrice().getPriceCustoms()) {
//
//                }
//            }

            OrderProduct orderProduct = new OrderProduct();

            orderProduct.setCode(product.getCode());
            orderProduct.setImage(product.getImage());
            orderProduct.setName(product.getName());
            orderProduct.setNameDisplay(product.getNameDisplay());
            orderProduct.setUnit(product.getUnit());
            orderProduct.setPrivatePrice(product.getPrice());
            orderProduct.setQuantity(productAddInfo.getQuantity());
            orderProduct.setPrice(price);
            orderProduct.setAmount(BigDecimal.valueOf(price.doubleValue() * productAddInfo.getQuantity()));

            orderProducts.add(orderProduct);
        }


        Order order = mapper().map(info, Order.class);

        order.setCode(nextSequenceService.genCodeCommon("order", customer.getCode() + "_", 4));
        order.setImage(orderProducts.get(0).getImage());
        order.setProducts(orderProducts);
        order.setStatus(OrderStatus.NEW);
        order.setOrderStatusHistories(new ArrayList<>());
        order.setCustomer(mapper().map(customer, CustomerBase.class));
        order.makeTextSearch();
        order.setOrderStatusHistories(new ArrayList<>());

        order.getOrderStatusHistories().add(buildOrderStatusHistory(OrderStatus.NEW, order.getCustomerNote(), currentUser));

        order.setTotalProduct(order.getProducts().size());
        order.setAmountProduct(BigDecimal.valueOf(order.getProducts().stream().flatMapToDouble(product -> DoubleStream.of(product.getAmount().doubleValue())).sum()));

        // Set ph?? ship
        if (order.getAmountProduct().doubleValue() < 300000) {
            order.setOtherAmount(BigDecimal.valueOf(30000));
        } else {
            order.setOtherAmount(BigDecimal.valueOf(0));
        }

        order.setAmountDiscount(BigDecimal.ZERO);

//        if (order.getTypeDiscount().equals(TypeDiscount.VND)) {
//            order.setAmountDiscount(BigDecimal.valueOf(order.getValueDiscount()));
//        } else {
//            order.setAmountDiscount(BigDecimal.valueOf((double) (order.getValueDiscount() / 100) * order.getAmountProduct().doubleValue()));
//        }

        order.setAmount(order.getAmountProduct().add(order.getOtherAmount()).subtract(order.getAmountDiscount()));

        apiResult.setResult(mapToView(repository.save(order)));

        // tr??? kho
        for (OrderProductAddInfo addInfo : info.getProducts()) {
            productRepository.updateQuantity(addInfo.getCode(), -addInfo.getQuantity());
        }

        return apiResult;
    }

    @Override
    public ApiResult<OrderViewDto> update(OrderUpdateInfo info, CurrentUser currentUser) {
        ApiResult<OrderViewDto> apiResult = new ApiResult<>();

        Order order = repository.findFirstByCode(info.getCode()).orElse(null);

        if (order == null || (currentUser.isCustomer() && !currentUser.getUsername().equals(order.getCustomer().getUsername()))) {
            return notExists();
        }

        if (Strings.isNullOrEmpty(info.getStatus().getValue())) {
            apiResult = new ApiResult<>();

            apiResult.setError(true);
            apiResult.setCode("STATUS_NULL");
            apiResult.setMessage("Tr???ng th??i kh??ng th??? null");

            return apiResult;
        }

        if (validateChangeStatus(apiResult, order, info.getStatus(), currentUser)) {
            return apiResult;
        }

        if (order.getOrderStatusHistories() == null) {
            order.setOrderStatusHistories(new ArrayList<>());
        }

        order.setStatus(info.getStatus());
        order.getOrderStatusHistories().add(buildOrderStatusHistory(info.getStatus(), info.getNote(), currentUser));

        switch (info.getStatus()) {
            case COMPLETED:
                // c???p nh???t t???ng ti???n mua cho kh??ch
                customerRepository.updateMoneySpent(order.getCustomer().getUsername(), order.getAmount());

                // C???p nh???t s??? l?????ng mua c???a s???n ph???m
                for (OrderProduct product : order.getProducts()) {
                    productRepository.updateQuantityBuy(product.getCode(), product.getQuantity());
                }

                break;

            case CANCELLED:
                // C???ng l???i s??? l?????ng s???n ph???m trong kho
                for (OrderProduct product : order.getProducts()) {
                    productRepository.updateQuantity(product.getCode(), product.getQuantity());
                }

                break;

            case BACK_GOODS:
                // C???ng l???i s??? l?????ng s???n ph???m trong kho
                for (OrderProduct product : order.getProducts()) {
                    productRepository.updateQuantity(product.getCode(), product.getQuantity());
                }

                break;

            case DELIVERING:
                order.setShipInfo(info.getShipInfo());

                break;
        }

        repository.save(order);

        apiResult.setResult(mapToView(order));
        return apiResult;
    }

    private boolean validateChangeStatus(ApiResult<OrderViewDto> apiResult, Order order, OrderStatus status, CurrentUser currentUser) {
        // Kh??ch h??ng c???p nh???t
        if (currentUser.isCustomer() && !(OrderStatus.NEW.equals(order.getStatus())
                && OrderStatus.CANCELLED.equals(status))) {
            apiResult.setError(true);
            apiResult.setCode("CHANGE_STATUS_FAIL");
            apiResult.setMessage("Kh??ch h??ng kh??ng th??? thay ?????i tr???ng th??i n??y");

            return true;
        }

        if (OrderStatus.COMPLETED.equals(order.getStatus())) {
            apiResult.setError(true);
            apiResult.setCode("CHANGE_STATUS_FAIL");
            apiResult.setMessage("????n ???? ho??n th??nh kh??ng th??? thay ?????i tr???ng th??i");

            return true;
        }

        return false;
    }


    private OrderStatusHistory buildOrderStatusHistory(OrderStatus status, String note, CurrentUser currentUser) {
        return OrderStatusHistory.builder()
                .status(status)
                .note(note)
                .createdBy(currentUser.getUsername())
                .createdDate(LocalDateTime.now())
                .isCustomer(currentUser.isCustomer())
                .build();
    }

    @Override
    public ApiResult<OrderViewDto> delete(String code) {
        // Ki???m tra t???n t???i
        Order modelDb = repository.findFirstByCode(code).orElse(null);

        if (modelDb == null || modelDb.isDeleted()) {
            return notExists();
        }

        if (!OrderStatus.CANCELLED.equals(modelDb.getStatus())) {
            ApiResult<OrderViewDto> apiResult = new ApiResult();

            apiResult.setError(true);
            apiResult.setCode("CANCEL_DELETED");
            apiResult.setMessage("Ch??? c?? th??? xo?? ????n ??? tr???ng th??i ???? hu???");

            return apiResult;
        }

        modelDb.setDeleted(true);

        repository.save(modelDb);
        return new ApiResult<>(mapToView(modelDb));
    }

    @Override
    public List<OrderViewDto> search(OrderPageableInfo model, CurrentUser currentUser) {
        if (currentUser.isCustomer()) {
            model.setUsernameCustomer(currentUser.getUsername());
        }

        return mapToView(repository.search(model, currentUser));
    }

    @Override
    public ApiResult<Long> count(OrderPageableInfo model, CurrentUser currentUser) {
        if (currentUser.isCustomer()) {
            model.setUsernameCustomer(currentUser.getUsername());
        }

        return new ApiResult<>(repository.count(model, currentUser));
    }

    @Override
    public ApiResult<OrderViewDto> findByCode(String code) {
        // Ki???m tra t???n t???i
        Order modelDb = repository.findFirstByCode(code).orElse(null);

        if (modelDb == null || modelDb.isDeleted()) {
            return notExists();
        }

        return new ApiResult<>(mapToView(modelDb));
    }

    @Override
    public List<OrderViewDto> findByCodes(List<String> codes) {
        return mapToView(repository.findAllByCodeIn(codes)
                .stream()
                .filter(item -> !item.isDeleted())
                .collect(Collectors.toList()));
    }

    @Override
    public List<String> getAddressPurchaseHistory(CurrentUser currentUser) {
        List<Order> orders = repository.findAllByCustomerUsername(currentUser.getUsername(),
                PageRequest.of(0, 100, Sort.by(Sort.Direction.DESC, "createdDate")));

        List<String> address = new ArrayList<>();

        for (Order order : orders) {
            if (address.size() == 5) {
                return address;
            }

            if (!address.contains(order.getAddress())) {
                address.add(order.getAddress());
            }
        }

        return address;
    }

    // ===================================

    /**
     * @return Kh??ng t??m th???y Object
     */
    private ApiResult<OrderViewDto> notExists() {
        ApiResult<OrderViewDto> apiResult = new ApiResult<>();

        apiResult.setError(true);
        apiResult.setCode("NOT_EXISTS");
        apiResult.setMessage("B???n ghi kh??ng t???n t???i");

        return apiResult;
    }
}
