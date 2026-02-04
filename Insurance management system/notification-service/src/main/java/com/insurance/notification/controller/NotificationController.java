package com.insurance.notification.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/notifications")
public class NotificationController {

    private static final Logger logger = LoggerFactory.getLogger(NotificationController.class);

    @PostMapping
    public ResponseEntity<String> sendNotification(@RequestParam String to, @RequestParam String message) {
        logger.info("Sending notification to {}: {}", to, message);
        // Simulating email sending
        return ResponseEntity.ok("Notification sent to " + to);
    }
}
