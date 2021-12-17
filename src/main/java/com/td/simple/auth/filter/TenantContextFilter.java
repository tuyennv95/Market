package com.td.simple.auth.filter;

import com.td.simple.config.TenantContext;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class TenantContextFilter extends OncePerRequestFilter {

  public static final String TENANT_HTTP_HEADER = "X-Tenant";

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
      FilterChain filterChain) throws ServletException, IOException {

    String targetTenantId = request.getHeader(TENANT_HTTP_HEADER);

    TenantContext.setCurrentTenant(targetTenantId);

    filterChain.doFilter(request, response);
  }
}
