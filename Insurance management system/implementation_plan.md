# Implementation Plan: Insurance Management System

## Overview
This project is a microservices-based Insurance Management System including User, Policy, Claim, and Notification services, orchestrated by a Service Registry and API Gateway. The frontend is built with React.

## Components

1.  **Service Registry (Eureka Server)**
    -   Port: 8761
    -   Role: Service discovery

2.  **API Gateway (Spring Cloud Gateway)**
    -   Port: 8080
    -   Role: Routing, Load Balancing

3.  **User Service**
    -   Port: 8081
    -   DB: MySQL (user_db)
    -   Tech: JPA, Security (JWT)

4.  **Policy Service**
    -   Port: 8082
    -   DB: MySQL (policy_db)
    -   Tech: JPA

5.  **Claim Service**
    -   Port: 8083
    -   DB: MySQL (claim_db)
    -   Tech: JPA

6.  **Notification Service**
    -   Port: 8084
    -   Tech: Spring Boot (Mock/Email)

7.  **Frontend**
    -   Port: 3000
    -   Tech: React.js, Vite (preferred for speed)

8.  **Infrastructure**
    -   Docker Compose (MySQL, All Services)

## Steps

- [x] Initialize Service Registry
- [x] Initialize API Gateway
- [x] Initialize User Service
- [x] Initialize Policy Service
- [x] Initialize Claim Service
- [x] Initialize Notification Service
- [x] Create Docker Compose file
- [x] Initialize Frontend (React)
