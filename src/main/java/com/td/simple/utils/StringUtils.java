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

    public static String buildFullName(String fullName) {
        String fullNameTemp = fullName.trim().replaceAll("\\s+", " ").toLowerCase();

        // Creating array of string length
        char[] ch = new char[fullNameTemp.length()];

        // Copy character by character into array
        for (int i = 0; i < fullNameTemp.length(); i++) {
            if (i == 0 || fullNameTemp.charAt(i - 1) == ' ') {
                ch[i] = Character.toUpperCase(fullNameTemp.charAt(i));
            } else {
                ch[i] = fullNameTemp.charAt(i);
            }
        }

        return String.valueOf(ch);
    }

    private void StringUtils() {
        throw new IllegalStateException("StringUtils class");
    }
}
