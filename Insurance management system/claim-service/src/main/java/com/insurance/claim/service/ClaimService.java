package com.insurance.claim.service;

import com.insurance.claim.entity.Claim;
import com.insurance.claim.repository.ClaimRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ClaimService {

    @Autowired
    private ClaimRepository claimRepository;

    @Autowired
    private com.insurance.claim.client.PolicyClient policyClient;

    public Claim submitClaim(Claim claim) {
        // Validate policy existence via microservice call
        try {
            Object policy = policyClient.getPolicy(claim.getPolicyId());
            if (policy == null) {
                throw new RuntimeException("Policy not found");
            }
        } catch (Exception e) {
            throw new RuntimeException("Invalid Policy ID");
        }

        claim.setSubmitDate(LocalDate.now());
        claim.setStatus("PENDING");
        return claimRepository.save(claim);
    }

    public List<Claim> getClaimsByUser(Long userId) {
        return claimRepository.findByUserId(userId);
    }

    public List<Claim> getAllClaims() {
        return claimRepository.findAll();
    }

    public Claim updateStatus(Long id, String status) {
        Claim claim = claimRepository.findById(id).orElse(null);
        if (claim != null) {
            claim.setStatus(status);
            return claimRepository.save(claim);
        }
        return null;
    }
}
