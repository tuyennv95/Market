package com.td.simple.model.catalog;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.io.Serializable;

@AllArgsConstructor
@Getter
public enum CatalogAttribute implements Serializable {
    SYSTEM("SYSTEM", "Hệ thống");

    private final String value;
    private final String reasonPhrase;
}
