package com.td.simple.model_dto;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Getter
@Data
@NoArgsConstructor
public class ApiResult<T> implements Serializable {

    /**
     *
     */
    private static final long serialVersionUID = 1L;

    private T result;
    private boolean isError;
    private String code;
    // Note cho dev
    private String message;

    public ApiResult(T result) {
        this.result = result;
    }

    public T getResult() {
        return result;
    }

    public void setResult(T result) {
        this.result = result;
    }
}
