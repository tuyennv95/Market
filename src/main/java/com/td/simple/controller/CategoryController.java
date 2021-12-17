package com.td.simple.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/category")
public class CategoryController {

    @GetMapping()
    public String get() {
        return "get_category";
    }

    @GetMapping("/find")
    public String findByCode() {
        return "category";
    }
}


