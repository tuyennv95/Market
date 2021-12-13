package com.td.simple.model_dto.product;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductViewDto implements Serializable {
    private static final long serialVersionUID = 1L;

    private String code;
}
