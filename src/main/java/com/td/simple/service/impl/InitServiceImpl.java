package com.td.simple.service.impl;

import com.td.simple.common.DepartmentRoleType;
import com.td.simple.model.catalog.Catalog;
import com.td.simple.model.catalog.CatalogGroup;
import com.td.simple.model.employee.Employee;
import com.td.simple.model_dto.ApiResult;
import com.td.simple.repository.CatalogGroupRepository;
import com.td.simple.repository.CatalogRepository;
import com.td.simple.repository.EmployeeRepository;
import com.td.simple.service.InitService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class InitServiceImpl implements InitService {

    private final EmployeeRepository employeeRepository;
    private final CatalogGroupRepository catalogGroupRepository;
    private final CatalogRepository catalogRepository;

    public InitServiceImpl(EmployeeRepository employeeRepository, CatalogGroupRepository catalogGroupRepository, CatalogRepository catalogRepository) {
        this.employeeRepository = employeeRepository;
        this.catalogGroupRepository = catalogGroupRepository;
        this.catalogRepository = catalogRepository;
    }

    @Override
    public ApiResult<Boolean> initData() {

        initEmployee();
        initCatalog();

        return new ApiResult<>(true);
    }

    private void initEmployee() {
        List<Employee> employeesRemove = employeeRepository.findAllBySystem(true);

        Employee employee = new Employee();

        employee.setSystem(true);
        employee.setUsername("admin");
        employee.setFullName("Admin");
        employee.setDepartmentRole(DepartmentRoleType.MANAGER);
        employee.setEnabled(true);
        employee.setEmail("admin@tenant.com");
        employee.setPassword(new BCryptPasswordEncoder().encode("admin"));
        employee.setRoles(new HashSet<>(Collections.singletonList("ADMIN")));

        employee.makeTextSearch();

        try {
            if (!employeesRemove.isEmpty()) {
                employeeRepository.deleteAll(employeesRemove);
            }

            employeeRepository.save(employee);
        } catch (Exception exception) {
            throw new RuntimeException();
        }
    }

    private void initCatalog() {
        List<Catalog> catalogRemoves = catalogRepository.findAllBySystem(true);
        List<CatalogGroup> catalogGroupRemoves = catalogGroupRepository.findAllBySystem(true);

        List<CatalogGroup> catalogGroups = new ArrayList<>();

        CatalogGroup tag = new CatalogGroup();
        tag.setSystem(true);
        tag.setCode("TAG");
        tag.setName("TAG");
        tag.setData(new HashMap<>());
        tag.setAttributes(new ArrayList<>());
        tag.makeTextSearch();

        CatalogGroup brand = new CatalogGroup();
        brand.setSystem(true);
        brand.setCode("BRAND");
        brand.setName("BRAND");
        brand.setData(new HashMap<>());
        brand.setAttributes(new ArrayList<>());
        brand.makeTextSearch();

        // ==============================

        CatalogGroup group = new CatalogGroup();
        group.setSystem(true);
        group.setCode("GROUP_CUSTOMER");
        group.setName("GROUP_CUSTOMER");
        group.setData(new HashMap<>());
        group.setAttributes(new ArrayList<>());
        group.makeTextSearch();

        CatalogGroup type = new CatalogGroup();
        type.setSystem(true);
        type.setCode("TYPE_CUSTOMER");
        type.setName("TYPE_CUSTOMER");
        type.setData(new HashMap<>());
        type.setAttributes(new ArrayList<>());
        type.makeTextSearch();

        catalogGroups.add(tag);
        catalogGroups.add(brand);
        catalogGroups.add(group);
        catalogGroups.add(type);

        try {
            if (!catalogRemoves.isEmpty()) {
                catalogRepository.deleteAll(catalogRemoves);
            }

            if (!catalogGroupRemoves.isEmpty()) {
                catalogGroupRepository.deleteAll(catalogGroupRemoves);
            }

            catalogGroupRepository.saveAll(catalogGroups);
        } catch (Exception exception) {
            throw new RuntimeException();
        }
    }
}
