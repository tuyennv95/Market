package com.td.simple.config;

import org.bson.types.Decimal128;
import org.springframework.core.convert.converter.Converter;

import java.math.BigDecimal;

public class DecimalToBigDecimalConverter implements Converter<Decimal128, BigDecimal> {

    @Override
    public BigDecimal convert(Decimal128 decimal128) {
        return decimal128.bigDecimalValue();
    }

}
