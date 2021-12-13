package com.td.simple.config;

import com.td.simple.utils.StringUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;

@Slf4j
public class TenantContext {

    private static ThreadLocal<String> currentTenant = new ThreadLocal<>();

    @Value("${app.defaultTenant}")
    private static String defaultTenant;

    private TenantContext() {
    }

    public static String getCurrentTenant() {
        return StringUtils.isNullOrEmpty(currentTenant.get()) ? defaultTenant : currentTenant.get();
    }

    public static void setCurrentTenant(String tenant) {
        log.debug("set current tenant to " + tenant);

        currentTenant.set(StringUtils.isNullOrEmpty(tenant) ? defaultTenant : tenant);
    }
}
