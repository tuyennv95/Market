package com.td.simple.service.impl;

import com.google.common.base.Strings;
import com.td.simple.model.account.CurrentUser;
import com.td.simple.model.employee.Employee;
import com.td.simple.model.employee.EmployeeStatusType;
import com.td.simple.model_dto.ApiResult;
import com.td.simple.model_dto.employee.EmployeeViewDto;
import com.td.simple.model_info.employee.EmployeeAddInfo;
import com.td.simple.model_info.employee.EmployeePageableInfo;
import com.td.simple.model_info.employee.EmployeeUpdateInfo;
import com.td.simple.model_info.employee.UpdatePasswordInfo;
import com.td.simple.repository.EmployeeRepository;
import com.td.simple.service.EmployeeService;
import com.td.simple.utils.NextSequenceService;
import com.td.simple.utils.StringUtils;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository repository;
    private final NextSequenceService sequence;

    @Value("${default.password}")
    private String defaultPassword;

    public EmployeeServiceImpl(EmployeeRepository repository, NextSequenceService sequence) {
        this.repository = repository;
        this.sequence = sequence;
    }

    public static ModelMapper mapper() {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        return modelMapper;
    }

    public static EmployeeViewDto mapToView(Employee employee) {
        return mapper().map(employee, EmployeeViewDto.class);
    }

    public static List<EmployeeViewDto> mapToView(List<Employee> employees) {
        return employees.stream().map(d -> mapper().map(d, EmployeeViewDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public ApiResult<EmployeeViewDto> create(EmployeeAddInfo model, CurrentUser currentUser) {
        ApiResult<EmployeeViewDto> apiResult = new ApiResult<>();

        // In thường mã
        model.setUsername(model.getUsername().trim().toLowerCase());
        model.setUsernameRoot(model.getUsernameRoot().trim().toLowerCase());

        // Kiểm tra thông tin account có phù hợp không?
        if (validateEmployeeCreate(apiResult, model)) {
            return apiResult;
        }

        // map dữ liệu
        Employee employee = mapper().map(model, Employee.class);

        if (StringUtils.isNullOrEmpty(employee.getPassword())) {
            employee.setPassword(defaultPassword);
        }

        employee.setPassword(new BCryptPasswordEncoder().encode(employee.getPassword()));
        employee.buildFullName();

        // Tách tên nhập vào ra Họ, Tên, Tên đệm
        employee.buildFullName();
        employee.processName();
        // Khởi tạo giá trị mặc định.
        initDefault(employee);
        employee.makeTextSearch();

        Employee dataSaved = repository.save(employee);

        //Tăng số lượng code trùng
        if (!StringUtils.isNullOrEmpty(model.getUsernameRoot())) {
            sequence.incCountEmployeeCodeHrm(model.getUsernameRoot());
        }

        apiResult.setResult(mapToView(dataSaved));
        return apiResult;
    }

    /**
     * @return Kiểm tra thông tin dữ liệu employee khi thêm
     */
    private boolean validateEmployeeCreate(ApiResult<EmployeeViewDto> apiResult, EmployeeAddInfo info) {
        // username để trống
        if (StringUtils.isNullOrEmpty(info.getUsername())) {
            apiResult.setError(true);
            apiResult.setCode("ACCOUNT.USERNAME_EMPTY");

            return true;
        }

        // username đã tồn tại trong cms hoặc hrm
        if (repository.existsByUsername(info.getUsername())) {
            apiResult.setError(true);
            apiResult.setCode("CODE_EXISTED");

            return true;
        }

        // Sinh mã 1 cách tự động
        if (!StringUtils.isNullOrEmpty(info.getUsernameRoot())) {
            int count = sequence.getCountEmployeesCodeHrm(info.getUsernameRoot());
            String codeTemp = count == 0 ? info.getUsernameRoot() : info.getUsernameRoot() + "" + ++count;

            if (!info.getUsername().equals(codeTemp)) {
                apiResult.setError(true);
                apiResult.setCode("CODE_INVALID");

                return true;
            }
        }

        // Họ tên để trống
        if (StringUtils.isNullOrEmpty(info.getFullName())) {
            apiResult.setError(true);
            apiResult.setCode("FULL_NAME_NOT_NULL");

            return true;
        }

        // SDT để trống
        if (StringUtils.isNullOrEmpty(info.getPhone())) {
            apiResult.setError(true);
            apiResult.setCode("PHONE_NOT_NULL");

            return true;
        }

        // SDT đã tồn tại
        if (repository.existsByPhone(info.getPhone())) {
            apiResult.setError(true);
            apiResult.setCode("PHONE_EXISTED");

            return true;
        }

        // email đã tồn tại
        if (!StringUtils.isNullOrEmpty(info.getEmail()) && repository.existsByEmail(info.getEmail())) {
            apiResult.setError(true);
            apiResult.setCode("EMAIL_EXISTED");
        }

        return false;
    }

    @Override
    public ApiResult<EmployeeViewDto> update(EmployeeUpdateInfo model, CurrentUser currentUser) {
        ApiResult<EmployeeViewDto> apiResult = new ApiResult<>();
        // Kiểm tra tồn tại
        Employee modelDb = repository.findFirstByUsername(model.getUsername()).orElse(null);

        if (modelDb == null) {
            return notExists();
        }

        if (validateUpdate(apiResult, modelDb, model)) {
            return apiResult;
        }

        mapper().map(model, modelDb);

        modelDb.buildFullName();
        modelDb.processName();
        modelDb.makeTextSearch();

        apiResult.setResult(mapToView(repository.save(modelDb)));

        return apiResult;
    }

    boolean validateUpdate(ApiResult<EmployeeViewDto> apiResult, Employee modelDb, EmployeeUpdateInfo model) {
        // Họ tên để trống
        if (StringUtils.isNullOrEmpty(model.getFullName())) {
            apiResult.setError(true);
            apiResult.setCode("FULL_NAME_NOT_NULL");

            return true;
        }

        // SDT để trống
        if (StringUtils.isNullOrEmpty(model.getPhone())) {
            apiResult.setError(true);
            apiResult.setCode("PHONE_NOT_NULL");

            return true;
        }

        // SDT đã tồn tại
        if (!modelDb.getPhone().equals(model.getPhone()) && repository.existsByPhone(model.getPhone())) {
            apiResult.setError(true);
            apiResult.setCode("PHONE_EXISTED");

            return true;
        }

        // email đã tồn tại
        if (!modelDb.getPhone().equals(model.getPhone()) && !StringUtils.isNullOrEmpty(model.getEmail()) && repository.existsByEmail(model.getEmail())) {
            apiResult.setError(true);
            apiResult.setCode("EMAIL_EXISTED");
        }

        return false;
    }

    @Override
    public ApiResult<EmployeeViewDto> delete(String username, CurrentUser currentUser) {
        // Kiểm tra tồn tại
        Employee modelDb = repository.findFirstByUsername(username).orElse(null);

        if (modelDb == null) {
            return notExists();
        }

        modelDb.setEnabled(false);
        modelDb.setStatus(EmployeeStatusType.DIS_ENABLED);

        return new ApiResult<>(mapToView(repository.save(modelDb)));
    }

    @Override
    public List<EmployeeViewDto> search(EmployeePageableInfo model, CurrentUser currentUser) {
        return mapToView(repository.search(model, currentUser));
    }

    @Override
    public ApiResult<Long> count(EmployeePageableInfo model, CurrentUser currentUser) {
        return new ApiResult<>(repository.count(model, currentUser));
    }

    @Override
    public ApiResult<EmployeeViewDto> findByUsername(String username) {
        // Kiểm tra tồn tại
        Employee modelDb = repository.findFirstByUsername(username).orElse(null);

        if (modelDb == null) {
            return notExists();
        }

        return new ApiResult<>(mapToView(modelDb));
    }

    @Override
    public List<EmployeeViewDto> findByUsernameIn(List<String> usernames) {
        return mapToView(repository.findAllByUsernameIn(usernames));
    }

    @Override
    public List<EmployeeViewDto> suggestion(String keyword, String keywordType, int top) {
        return null;
    }

    @Override
    public ApiResult<Boolean> updatePassword(UpdatePasswordInfo info, CurrentUser currentUser) {
        ApiResult<Boolean> apiResult = new ApiResult<>();

        // Kiểm tra tồn tại
        Employee modelDb = repository.findFirstByUsername(currentUser.getUsername()).orElse(null);

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

    // ===================================

    private void initDefault(Employee modelToAdd) {
        if (modelToAdd.getDepartmentModes() == null) {
            modelToAdd.setDepartmentModes(new HashSet<>());
        }

        if (modelToAdd.getRoles() == null) {
            modelToAdd.setRoles(new HashSet<>());
        }

        if (modelToAdd.getAncestorsDepartmentCode() == null) {
            modelToAdd.setAncestorsDepartmentCode(new HashSet<>());
        }
    }

    // ===================================

    /**
     * @return Không tìm thấy Object
     */
    private ApiResult<EmployeeViewDto> notExists() {
        ApiResult<EmployeeViewDto> apiResult = new ApiResult<>();

        apiResult.setError(true);
        apiResult.setCode("NOT_EXISTS");
        apiResult.setMessage("Bản ghi không tồn tại");

        return apiResult;
    }
}
