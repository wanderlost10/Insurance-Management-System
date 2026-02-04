package com.insurance.claim.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "policy-service")
public interface PolicyClient {
    @GetMapping("/policies/{id}")
    Object getPolicy(@PathVariable("id") Long id);
}
