package com.insurance.policy.service;

import com.insurance.policy.entity.Policy;
import com.insurance.policy.repository.PolicyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PolicyService {

    @Autowired
    private PolicyRepository policyRepository;

    public Policy createPolicy(Policy policy) {
        return policyRepository.save(policy);
    }

    public List<Policy> getAllPolicies() {
        return policyRepository.findAll();
    }
    
    public List<Policy> getPoliciesByUserId(Long userId) {
        return policyRepository.findByUserId(userId);
    }
    
    public Policy getPolicy(Long id) {
        return policyRepository.findById(id).orElse(null);
    }
    
    public void deletePolicy(Long id) {
        policyRepository.deleteById(id);
    }
}
