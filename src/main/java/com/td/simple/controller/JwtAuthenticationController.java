package com.td.simple.controller;

import com.td.simple.auth.service.CustomUserDetailsService;
import com.td.simple.auth.service.JwtTokenService;
import com.td.simple.model_dto.ApiResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin
public class JwtAuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenService jwtTokenService;

    @PostMapping("/authenticate")
    public ResponseEntity<ApiResult<String>> createAuthenticationToken(@RequestParam("username") String username,
                                                                       @RequestParam("password") String password,
                                                                       HttpServletRequest request) {
        String requestTokenHeader = request.getHeader("clientId");

        if (!"customer".equals(requestTokenHeader) && !"employee".equals(requestTokenHeader)) {
            ApiResult<String> apiResult = new ApiResult<>();

            apiResult.setError(true);
            apiResult.setCode("ERROR_CLIENT_ID");
            apiResult.setMessage("Header request không hợp lệ");

            return new ResponseEntity<>(apiResult, HttpStatus.BAD_REQUEST);
        }

        username = requestTokenHeader + "_" + username;

        // Xác thực từ username và password.
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Mã hoá dữ liệu
        String token = jwtTokenService.generateToken((CustomUserDetailsService.CustomUserDetail) authentication.getPrincipal());

        return ResponseEntity.ok(new ApiResult<>(token));
    }
}
