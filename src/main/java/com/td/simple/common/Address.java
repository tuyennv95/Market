package com.td.simple.common;

import lombok.Data;

import java.io.Serializable;

@Data
public class Address implements Serializable {
    String id = "";
    String code;
    String name = "";
    String prefix;
}
