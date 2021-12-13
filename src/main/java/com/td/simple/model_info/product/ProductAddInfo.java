package com.td.simple.model_info.product;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductAddInfo implements Serializable {
    private static final long serialVersionUID = 1L;

    private String name;
}
