package com.insurance.policy.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "policies")
public class Policy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String policyNumber;
    private String type; // HEALTH, VEHICLE
    private Double premiumAmount;
    private Long userId; // For simple relationship
}
