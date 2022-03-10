package com.td.simple.auth.service;

import com.google.common.base.Strings;
import com.td.simple.model.account.CurrentUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.context.WebApplicationContext;

import javax.servlet.http.HttpServletRequest;


@Component
@Scope(value = WebApplicationContext.SCOPE_REQUEST, proxyMode = ScopedProxyMode.TARGET_CLASS)
public class CurrentUserService {

    @Autowired
    JwtTokenService jwtTokenService;

    private CurrentUser currentUser;
    private HttpServletRequest httpServletRequest;

    @Autowired
    public CurrentUserService(HttpServletRequest httpServletRequest) {

        this.httpServletRequest = httpServletRequest;
    }

    public CurrentUser getCurrentUser() {
        if (Strings.isNullOrEmpty(httpServletRequest.getHeader("Authorization"))) {
            return null;
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            return null;
        }

        if (currentUser != null) {
            return currentUser;
        }

        CustomUserDetailsService.CustomUserDetail data = (CustomUserDetailsService.CustomUserDetail) authentication.getPrincipal();
        currentUser = new CurrentUser();

        currentUser.setUsername(data.getUsername());
        currentUser.setCustomer("customer".equals(data.getClientId()));
        currentUser.setEmail(data.getEmail());
        currentUser.setPhone(data.getPhone());
        currentUser.setProductFavorite(data.getProductFavorite());

        // Fix currentUser
        currentUser.setAccessToken(getToken());
        currentUser.setTimeZone(getTimeZone());

        return currentUser;
    }

    public String getToken() {
        return httpServletRequest.getHeader("Authorization");
    }

    public String getTimeZone() {

        return httpServletRequest.getHeader("TimeZone") != null
                ? httpServletRequest.getHeader("TimeZone")
                : "0";
    }

    public String getCulture() {
        return httpServletRequest.getHeader("Culture");
    }

}
