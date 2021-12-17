package com.td.simple.repository;

import com.td.simple.model.employee.Employee;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeRepository extends BaseRepository<Employee, String>, EmployeeRepositoryCustom {

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    boolean existsByPhone(String phone);

    Optional<Employee> findFirstByUsername(String username);

    List<Employee> findAllByUsernameIn(Collection<String> usernames);
}
