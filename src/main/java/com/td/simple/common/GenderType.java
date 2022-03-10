package com.td.simple.common;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum GenderType {
    MALE("MALE", "Nam"),
    FEMALE("FEMALE", "Nữ"),
    OTHER("OTHER", "Khác");

    private final String value;
    private final String reasonPhrase;
}
