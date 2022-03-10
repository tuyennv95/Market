package com.td.simple.model_dto.product;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductSuggestionViewDto implements Serializable {

    private String code;

    private String name;

    private String nameDisplay;
}
