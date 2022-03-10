package com.td.simple.utils;

import java.text.Normalizer;
import java.util.regex.Pattern;

public class StringUtils {

    public static boolean isNullOrEmpty(String str) {
        return str == null || str.isEmpty();
    }

    /**
     * Chuyển tiếng việt có dấu thành tiếng việt không dấu.
     *
     * @param str Chuỗi string tiếng việt có dấu
     * @return Chuỗi string tiếng việt không dấu
     */
    public static String unAccent(String str) {
        if (str == null) {
            return "";
        }

        String temp = Normalizer.normalize(str, Normalizer.Form.NFD);
        Pattern pattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");

        return pattern.matcher(temp).replaceAll("").replaceAll("Đ", "D").replace("đ", "d")
                .toLowerCase();
    }

    private void StringUtils() {
        throw new IllegalStateException("StringUtils class");
    }
}
