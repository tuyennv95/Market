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

        // In th?????ng m??
        model.setUsername(model.getUsername().trim().toLowerCase());
        model.setUsernameRoot(model.getUsernameRoot().trim().toLowerCase());

        // Ki???m tra th??ng tin account c?? ph?? h???p kh??ng?
        if (validateEmployeeCreate(apiResult, model)) {
            return apiResult;
        }

        // map d??? li???u
        Employee employee = mapper().map(model, Employee.class);

        if (StringUtils.isNullOrEmpty(employee.getPassword())) {
            employee.setPassword(defaultPassword);
        }

        employee.setPassword(new BCryptPasswordEncoder().encode(employee.getPassword()));
        employee.buildFullName();

        // T??ch t??n nh???p v??o ra H???, T??n, T??n ?????m
        employee.buildFullName();
        employee.processName();
        // Kh???i t???o gi?? tr??? m???c ?????nh.
        initDefault(employee);
        employee.makeTextSearch();

        Employee dataSaved = repository.save(employee);

        //T??ng s??? l?????ng code tr??ng
        if (!StringUtils.isNullOrEmpty(model.getUsernameRoot())) {
            sequence.incCountEmployeeCodeHrm(model.getUsernameRoot());
        }

        apiResult.setResult(mapToView(dataSaved));
        return apiResult;
    }

    /**
     * @return Ki???m tra th??ng tin d??? li???u employee khi th??m
     */
    private boolean validateEmployeeCreate(ApiResult<EmployeeViewDto> apiResult, EmployeeAddInfo info) {
        // username ????? tr???ng
        if (StringUtils.isNullOrEmpty(info.getUsername())) {
            apiResult.setError(true);
            apiResult.setCode("ACCOUNT.USERNAME_EMPTY");

            return true;
        }

        // username ???? t???n t???i trong cms ho???c hrm
        if (repository.existsByUsername(info.getUsername())) {
            apiResult.setError(true);
            apiResult.setCode("CODE_EXISTED");

            return true;
        }

        // Sinh m?? 1 c??ch t??? ?????ng
        if (!StringUtils.isNullOrEmpty(info.getUsernameRoot())) {
            int count = sequence.getCountEmployeesCodeHrm(info.getUsernameRoot());
            String codeTemp = count == 0 ? info.getUsernameRoot() : info.getUsernameRoot() + "" + ++count;

            if (!info.getUsername().equals(codeTemp)) {
                apiResult.setError(true);
                apiResult.setCode("CODE_INVALID");

                return true;
            }
        }

        // H??? t??n ????? tr???ng
        if (StringUtils.isNullOrEmpty(info.getFullName())) {
            apiResult.setError(true);
            apiResult.setCode("FULL_NAME_NOT_NULL");

            return true;
        }

        // SDT ????? tr???ng
        if (StringUtils.isNullOrEmpty(info.getPhone())) {
            apiResult.setError(true);
            apiResult.setCode("PHONE_NOT_NULL");

            return true;
        }

        // SDT ???? t???n t???i
        if (repository.existsByPhone(info.getPhone())) {
            apiResult.setError(true);
            apiResult.setCode("PHONE_EXISTED");

            return true;
        }

        // email ???? t???n t???i
        if (!StringUtils.isNullOrEmpty(info.getEmail()) && repository.existsByEmail(info.getEmail())) {
            apiResult.setError(true);
            apiResult.setCode("EMAIL_EXISTED");
        }

        return false;
    }

    @Override
    public ApiResult<EmployeeViewDto> update(EmployeeUpdateInfo model, CurrentUser currentUser) {
        ApiResult<EmployeeViewDto> apiResult = new ApiResult<>();
        // Ki???m tra t???n t???i
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
        // H??? t??n ????? tr???ng
        if (StringUtils.isNullOrEmpty(model.getFullName())) {
            apiResult.setError(true);
            apiResult.setCode("FULL_NAME_NOT_NULL");

            return true;
        }

        // SDT ????? tr???ng
        if (StringUtils.isNullOrEmpty(model.getPhone())) {
            apiResult.setError(true);
            apiResult.setCode("PHONE_NOT_NULL");

            return true;
        }

        // SDT ???? t???n t???i
        if (!modelDb.getPhone().equals(model.getPhone()) && repository.existsByPhone(model.getPhone())) {
            apiResult.setError(true);
            apiResult.setCode("PHONE_EXISTED");

            return true;
        }

        // email ???? t???n t???i
        if (!modelDb.getPhone().equals(model.getPhone()) && !StringUtils.isNullOrEmpty(model.getEmail()) && repository.existsByEmail(model.getEmail())) {
            apiResult.setError(true);
            apiResult.setCode("EMAIL_EXISTED");
        }

        return false;
    }

    @Override
    public ApiResult<EmployeeViewDto> delete(String username, CurrentUser currentUser) {
        // Ki???m tra t???n t???i
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
        // Ki???m tra t???n t???i
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

        // Ki???m tra t???n t???i
        Employee modelDb = repository.findFirstByUsername(currentUser.getUsername()).orElse(null);

        if (modelDb == null) {
            apiResult.setError(true);
            apiResult.setCode("NOT_EXISTS");
            apiResult.setMessage("B???n ghi kh??ng t???n t???i");

            return apiResult;
        }

        // D??? li???u ????? tr???ng
        if (Strings.isNullOrEmpty(info.getCurrentPassword()) || Strings.isNullOrEmpty(info.getNewPassword()) ||
                Strings.isNullOrEmpty(info.getVerifyPassword())) {
            apiResult.setError(true);
            apiResult.setCode("DATA_UPDATE_PASSWORD_NULL");
            apiResult.setMessage("D??? li???u thay ?????i password kh??ng ???????c ????? tr???ng");

            return apiResult;
        }

        // M???t kh???u x??c nh???n kh??ng tr??ng
        if (!info.getNewPassword().equals(info.getVerifyPassword())) {
            apiResult.setError(true);
            apiResult.setCode("UPDATE_PASSWORD_VERIFY_FALSE");
            apiResult.setMessage("M???t kh???u x??c nh???n kh??ng tr??ng");

            return apiResult;
        }

        // M???t kh???u c?? kh??ng ????ng
        if (!new BCryptPasswordEncoder().matches(info.getCurrentPassword(), modelDb.getPassword())) {
            apiResult.setError(true);
            apiResult.setCode("PASSWORD_EXISTS");
            apiResult.setMessage("M???t kh???u c?? kh??ng ????ng");

            return apiResult;
        }

        // M???t kh???u m???i tr??ng v???i m???t kh???u c??
        if (new BCryptPasswordEncoder().matches(info.getNewPassword(), modelDb.getPassword())) {
            apiResult.setError(true);
            apiResult.setCode("DUPLICATE_PASSWORD");
            apiResult.setMessage("M???t kh???u m???i tr??ng v???i m???t kh???u c??");

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
     * @return Kh??ng t??m th???y Object
     */
    private ApiResult<EmployeeViewDto> notExists() {
        ApiResult<EmployeeViewDto> apiResult = new ApiResult<>();

        apiResult.setError(true);
        apiResult.setCode("NOT_EXISTS");
        apiResult.setMessage("B???n ghi kh??ng t???n t???i");

        return apiResult;
    }
}
