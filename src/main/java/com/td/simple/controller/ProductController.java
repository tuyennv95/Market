package com.td.simple.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/product")
public class ProductController {

    @GetMapping()
    public String get() {
        return "get_product";
    }

    @GetMapping("/find")
    public String findByCode() {
        return "product";
    }
}
