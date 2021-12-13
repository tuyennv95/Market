package com.td.simple.constants;

import java.time.format.DateTimeFormatter;

public interface DateFormatter {
    String DATE_FORMAT_PATTERN = "dd/MM/yyyy";
    String DATE_TIME_FORMAT_PATTERN = "dd/MM/yyyy HH:mm:ss";

    DateTimeFormatter DATE_TIME_FORMAT = DateTimeFormatter.ofPattern(DATE_TIME_FORMAT_PATTERN);
    DateTimeFormatter DATE_FORMAT = DateTimeFormatter.ofPattern(DATE_FORMAT_PATTERN);
}
