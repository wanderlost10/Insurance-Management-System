package com.insurance.claim.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Data
@Table(name = "claims")
public class Claim {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long policyId;
    private Long userId;
    private String description;
    private String status; // PENDING, APPROVED, REJECTED
    private LocalDate submitDate;
}
