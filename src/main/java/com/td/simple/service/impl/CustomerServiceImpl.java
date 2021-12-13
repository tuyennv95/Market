package com.td.simple.service.impl;

import com.td.simple.model.account.CurrentUser;
import com.td.simple.model.customer.Customer;
import com.td.simple.model_dto.ApiResult;
import com.td.simple.model_dto.customer.CustomerViewDto;
import com.td.simple.model_info.customer.CustomerAddInfo;
import com.td.simple.model_info.customer.CustomerPageableInfo;
import com.td.simple.model_info.customer.CustomerUpdateInfo;
import com.td.simple.model_info.employee.UpdatePasswordInfo;
import com.td.simple.repository.CustomerRepository;
import com.td.simple.service.CustomerService;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository repository;

    public CustomerServiceImpl(CustomerRepository repository) {
        this.repository = repository;
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
    public ApiResult<CustomerViewDto> create(CustomerAddInfo model, CurrentUser currentUser) {
        return null;
    }

    @Override
    public ApiResult<CustomerViewDto> update(CustomerUpdateInfo model, CurrentUser currentUser) {
        return null;
    }

    @Override
    public ApiResult<CustomerViewDto> delete(String username, CurrentUser currentUser) {
        // Kiểm tra tồn tại
        Customer modelDb = repository.findFirstByUsername(username).orElse(null);

        if (modelDb == null) {
            return notExists();
        }

        modelDb.setEnabled(false);

        return new ApiResult<>(mapToView(repository.save(modelDb)));
    }

    @Override
    public List<CustomerViewDto> search(CustomerPageableInfo model, CurrentUser currentUser) {
        return mapToView(repository.search(model, currentUser));
    }

    @Override
    public ApiResult<Long> count(CustomerPageableInfo model, CurrentUser currentUser) {
        return new ApiResult<>(repository.count(model, currentUser));
    }

    @Override
    public ApiResult<CustomerViewDto> findByUsername(String username) {
        // Kiểm tra tồn tại
        Customer modelDb = repository.findFirstByUsername(username).orElse(null);

        if (modelDb == null) {
            return notExists();
        }

        return new ApiResult<>(mapToView(modelDb));
    }

    @Override
    public List<CustomerViewDto> findByUsernameIn(List<String> usernames) {
        return mapToView(repository.findAllByUsernameIn(usernames));
    }

    @Override
    public List<CustomerViewDto> suggestion(String keyword, String keywordType, int top) {
        return null;
    }

    @Override
    public ApiResult<Boolean> updatePassword(UpdatePasswordInfo info, CurrentUser currentUser) {
        return null;
    }

    // ===================================

    /**
     * @return Không tìm thấy Object
     */
    private ApiResult<CustomerViewDto> notExists() {
        ApiResult<CustomerViewDto> apiResult = new ApiResult<>();

        apiResult.setError(true);
        apiResult.setCode("NOT_EXISTS");

        return apiResult;
    }
}
