package com.td.simple.service.impl;

import com.google.common.base.Strings;
import com.td.simple.constants.Common;
import com.td.simple.model.account.CurrentUser;
import com.td.simple.model.customer.Customer;
import com.td.simple.model_dto.ApiResult;
import com.td.simple.model_dto.customer.CustomerSuggestionViewDto;
import com.td.simple.model_dto.customer.CustomerViewDto;
import com.td.simple.model_info.customer.CustomerAddInfo;
import com.td.simple.model_info.customer.CustomerPageableInfo;
import com.td.simple.model_info.customer.CustomerRegistrationInfo;
import com.td.simple.model_info.customer.CustomerUpdateInfo;
import com.td.simple.model_info.employee.UpdatePasswordInfo;
import com.td.simple.repository.CatalogRepository;
import com.td.simple.repository.CustomerRepository;
import com.td.simple.service.CustomerService;
import com.td.simple.utils.NextSequenceService;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomerServiceImpl implements CustomerService {

    @Value("${default.password}")
    private String defaultPassword;

    private final CustomerRepository repository;
    private final NextSequenceService nextSequenceService;
    private final CatalogRepository catalogRepository;

    public CustomerServiceImpl(CustomerRepository repository, NextSequenceService nextSequenceService, CatalogRepository catalogRepository) {
        this.repository = repository;
        this.nextSequenceService = nextSequenceService;
        this.catalogRepository = catalogRepository;
    }

    public static ModelMapper mapper() {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        return modelMapper;
    }

    public static CustomerViewDto mapToView(Customer customer) {
        return mapper().map(customer, CustomerViewDto.class);
    }

    public static List<CustomerViewDto> mapToView(List<Customer> customers) {
        return customers.stream().map(d -> mapper().map(d, CustomerViewDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public ApiResult<CustomerViewDto> create(CustomerAddInfo model, boolean createdByCustomer) {
        ApiResult<CustomerViewDto> apiResult = new ApiResult<>();

        model.setUsername(model.getUsername().trim().replace(" ", "").toLowerCase());

        if (validateCreate(apiResult, model)) {
            return apiResult;
        }

        Customer customer = mapper().map(model, Customer.class);

        if (Strings.isNullOrEmpty(customer.getPassword())) {
            customer.setPassword(defaultPassword);
        }

        if (validateData(apiResult, customer)) {
            return apiResult;
        }

        customer.setEnabled(true);
        customer.setCustomer(true);
        customer.setCreatedByCustomer(createdByCustomer);
        customer.setCode(nextSequenceService.genCodeCommon("customer", "KH", 4));
        customer.setPassword(new BCryptPasswordEncoder().encode(customer.getPassword()));
        customer.setPhone(customer.getUsername());
        customer.setMoneySpent(BigDecimal.ZERO);
        customer.setProductFavorite(new ArrayList<>());
        customer.buildFullName();
        customer.processName();
        customer.makeTextSearch();

        apiResult.setResult(mapToView(repository.save(customer)));

        return apiResult;
    }

    private boolean validateCreate(ApiResult<CustomerViewDto> apiResult, CustomerAddInfo model) {
        if (Strings.isNullOrEmpty(model.getUsername())) {
            apiResult.setError(true);
            apiResult.setCode("USERNAME_NULL");
            apiResult.setMessage("Username không được để trống!");

            return true;
        }

        if (Strings.isNullOrEmpty(model.getFullName())) {
            apiResult.setError(true);
            apiResult.setCode("FULL_NAME_NULL");
            apiResult.setMessage("Họ tên không được để trống!");

            return true;
        }

        if (repository.existsByUsername(model.getUsername())) {
            apiResult.setError(true);
            apiResult.setCode("DUPLICATE_USERNAME");
            apiResult.setMessage("Username đã tồn tại!");

            return true;
        }

        if (!Strings.isNullOrEmpty(model.getEmail()) && repository.existsByEmail(model.getEmail())) {
            apiResult.setError(true);
            apiResult.setCode("DUPLICATE_EMAIL");
            apiResult.setMessage("email đã tồn tại!");

            return true;
        }

        return false;
    }

    private boolean validateData(ApiResult<CustomerViewDto> apiResult, Customer customer) {
        boolean checkGroup = !Strings.isNullOrEmpty(customer.getGroup()) && !catalogRepository.existsByCodeAndGroupCode(customer.getGroup(), Common.GROUP_CUSTOMER);
        boolean checkType = !Strings.isNullOrEmpty(customer.getType()) && !catalogRepository.existsByCodeAndGroupCode(customer.getType(), Common.TYPE_CUSTOMER);

        if (checkGroup || checkType) {
            apiResult.setError(true);
            apiResult.setCode("CATALOG_EXISTS");
            apiResult.setMessage("Dữ liệu không tồn tại bên catalog!");

            return true;
        }

        return false;
    }

    @Override
    public ApiResult<CustomerViewDto> update(CustomerUpdateInfo model, CurrentUser currentUser) {
        ApiResult<CustomerViewDto> apiResult = new ApiResult<>();
        // Kiểm tra tồn tại
        Customer modelDb = repository.findFirstByUsername(model.getUsername()).orElse(null);

        if (modelDb == null) {
            return notExists();
        }

        if (validateUpdate(apiResult, modelDb, model)) {
            return apiResult;
        }

        // Nếu khách hàng cập nhật thì giới hạn các thông tin
        if (currentUser.isCustomer()) {
            model.setOther(modelDb.getOther());
            model.setGroup(modelDb.getGroup());
            model.setType(modelDb.getType());
            model.setNote(modelDb.getNote());
        }

        mapper().map(model, modelDb);

        if (!currentUser.isCustomer() && validateData(apiResult, modelDb)) {
            return apiResult;
        }

        modelDb.buildFullName();
        modelDb.processName();
        modelDb.makeTextSearch();

        apiResult.setResult(mapToView(repository.save(modelDb)));

        return apiResult;
    }

    private boolean validateUpdate(ApiResult<CustomerViewDto> apiResult, Customer modelDb, CustomerUpdateInfo model) {
        if (Strings.isNullOrEmpty(model.getFullName())) {
            apiResult.setError(true);
            apiResult.setCode("FULL_NAME_NULL");
            apiResult.setMessage("Họ tên không được để trống!");

            return true;
        }

        if (modelDb.getEmail() == null) {
            modelDb.setEmail("");
        }

        if (model.getEmail() == null) {
            model.setEmail("");
        }

        if (!modelDb.getEmail().equals(model.getEmail()) && !Strings.isNullOrEmpty(model.getEmail())
                && repository.existsByEmail(model.getEmail())) {
            apiResult.setError(true);
            apiResult.setCode("DUPLICATE_EMAIL");
            apiResult.setMessage("email đã tồn tại!");

            return true;
        }

        return false;
    }

    @Override
    public ApiResult<CustomerViewDto> delete(String username) {
        // Kiểm tra tồn tại
        Customer modelDb = repository.findFirstByUsername(username).orElse(null);

        if (modelDb == null || !modelDb.isEnabled()) {
            return notExists();
        }

        modelDb.setEnabled(false);

        return new ApiResult<>(mapToView(repository.save(modelDb)));
    }

    @Override
    public List<CustomerViewDto> search(CustomerPageableInfo model) {
        return mapToView(repository.search(model));
    }

    @Override
    public ApiResult<Long> count(CustomerPageableInfo model) {
        return new ApiResult<>(repository.count(model));
    }

    @Override
    public ApiResult<CustomerViewDto> findByUsername(String username) {
        // Kiểm tra tồn tại
        Customer modelDb = repository.findFirstByUsername(username).orElse(null);

        if (modelDb == null || !modelDb.isEnabled()) {
            return notExists();
        }

        return new ApiResult<>(mapToView(modelDb));
    }

    @Override
    public List<CustomerViewDto> findByUsernameIn(List<String> usernames) {
        return mapToView(repository.findAllByUsernameIn(usernames));
    }

    @Override
    public List<CustomerSuggestionViewDto> suggestion(String keyword, String keywordType, int top) {
        List<Customer> customers = repository.suggestion(keyword, keywordType, top);

        return customers.stream().map(customer -> mapper().map(customer, CustomerSuggestionViewDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public ApiResult<CustomerViewDto> registration(CustomerRegistrationInfo model) {
        ApiResult<CustomerViewDto> apiResult = new ApiResult<>();

        // Mật khẩu xác nhận không trùng
        if (!model.getPassword().equals(model.getVerifyPassword())) {
            apiResult.setError(true);
            apiResult.setCode("VERIFY_PASSWORD");
            apiResult.setMessage("Mật khẩu xác nhận không đúng");

            return apiResult;
        }

        CustomerAddInfo info = mapper().map(model, CustomerAddInfo.class);
        info.setUsername(model.getPhone());

        return create(info, true);
    }

    @Override
    public ApiResult<Boolean> updatePassword(UpdatePasswordInfo info, CurrentUser currentUser) {
        ApiResult<Boolean> apiResult = new ApiResult<>();

        // Kiểm tra tồn tại
        Customer modelDb = repository.findFirstByUsername(currentUser.getUsername()).orElse(null);

        if (modelDb == null) {
            apiResult.setError(true);
            apiResult.setCode("NOT_EXISTS");
            apiResult.setMessage("Bản ghi không tồn tại");

            return apiResult;
        }

        // Dữ liệu để trống
        if (Strings.isNullOrEmpty(info.getCurrentPassword()) || Strings.isNullOrEmpty(info.getNewPassword()) ||
                Strings.isNullOrEmpty(info.getVerifyPassword())) {
            apiResult.setError(true);
            apiResult.setCode("DATA_UPDATE_PASSWORD_NULL");
            apiResult.setMessage("Dữ liệu thay đổi password không được để trống");

            return apiResult;
        }

        // Mật khẩu xác nhận không trùng
        if (!info.getNewPassword().equals(info.getVerifyPassword())) {
            apiResult.setError(true);
            apiResult.setCode("UPDATE_PASSWORD_VERIFY_FALSE");
            apiResult.setMessage("Mật khẩu xác nhận không trùng");

            return apiResult;
        }

        // Mật khẩu cũ không đúng
        if (!new BCryptPasswordEncoder().matches(info.getCurrentPassword(), modelDb.getPassword())) {
            apiResult.setError(true);
            apiResult.setCode("PASSWORD_EXISTS");
            apiResult.setMessage("Mật khẩu cũ không đúng");

            return apiResult;
        }

        // Mật khẩu mới trùng với mật khẩu cũ
        if (new BCryptPasswordEncoder().matches(info.getNewPassword(), modelDb.getPassword())) {
            apiResult.setError(true);
            apiResult.setCode("DUPLICATE_PASSWORD");
            apiResult.setMessage("Mật khẩu mới trùng với mật khẩu cũ");

            return apiResult;
        }

        info.setNewPassword(new BCryptPasswordEncoder().encode(info.getNewPassword()));

        repository.updatePassword(currentUser, info.getNewPassword());

        apiResult.setResult(true);

        return apiResult;
    }

    @Override
    public ApiResult<Boolean> favorite(String productCode, CurrentUser currentUser) {
        Customer customer = repository.findFirstByUsername(currentUser.getUsername()).orElse(null);

        assert customer != null;
        // Xoá
        if (customer.getProductFavorite().contains(productCode)) {
            customer.getProductFavorite().remove(productCode);
        } else { // Thêm mới
            customer.getProductFavorite().add(productCode);
        }

        repository.favorite(customer);

        return new ApiResult<>(true);
    }

    // ===================================

    /**
     * @return Không tìm thấy Object
     */
    private ApiResult<CustomerViewDto> notExists() {
        ApiResult<CustomerViewDto> apiResult = new ApiResult<>();

        apiResult.setError(true);
        apiResult.setCode("NOT_EXISTS");
        apiResult.setMessage("Bản ghi không tồn tại");

        return apiResult;
    }
}
