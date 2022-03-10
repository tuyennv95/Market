package com.td.simple.model_dto.customer;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CustomerSuggestionViewDto implements Serializable {

    private String avatar;

    private String code;

    private String username;

    private String fullName;

    private String phone;

    private String email;

    private String note;

//    private EmployeeBase sale;
}
