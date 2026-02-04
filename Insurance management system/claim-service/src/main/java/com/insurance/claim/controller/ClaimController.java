package com.insurance.claim.controller;

import com.insurance.claim.entity.Claim;
import com.insurance.claim.service.ClaimService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/claims")
public class ClaimController {

    @Autowired
    private ClaimService claimService;

    @PostMapping
    public ResponseEntity<Claim> submitClaim(@RequestBody Claim claim) {
        return ResponseEntity.ok(claimService.submitClaim(claim));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Claim>> getClaimsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(claimService.getClaimsByUser(userId));
    }
    
    @GetMapping
    public ResponseEntity<List<Claim>> getAllClaims() {
        return ResponseEntity.ok(claimService.getAllClaims());
    }
    
    @PutMapping("/{id}/status")
    public ResponseEntity<Claim> updateStatus(@PathVariable Long id, @RequestParam String status) {
        return ResponseEntity.ok(claimService.updateStatus(id, status));
    }
}
