package com.insurance.policy.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "user-service")
public interface UserClient {
    @GetMapping("/users/{username}")
    Object getUserByUsername(@PathVariable("username") String username);

    // Using Object to avoid duplicating DTOs for now, or just check existence
    @GetMapping("/users/{username}")
    String checkUser(@PathVariable("username") String username);
}
