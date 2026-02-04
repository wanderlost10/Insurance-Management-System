# Insurance Management System

This is a microservices-based Insurance Management System built with Java Spring Boot and React.

## Architecture

- **Service Registry**: Eureka Server (Port 8761)
- **API Gateway**: Spring Cloud Gateway (Port 8080)
- **User Service**: User management (Port 8081)
- **Policy Service**: Policy management (Port 8082)
- **Claim Service**: Claim processing (Port 8083)
- **Notification Service**: Notification dispatcher (Port 8084)
- **Frontend**: React + Vite (Port 5173/3000)
- **Database**: MySQL (Port 3306)

## Prerequisites

- Java 17+
- Maven
- Docker & Docker Compose
- Node.js & npm

## How to Run

### 1. Start Backend and Infrastructure

The easiest way to start the backend services is using Docker Compose. However, since the services need to be built first, you can either build them locally or let Docker build them (as configured in the compose file).

**Option A: Run everything with Docker (Recommended)**

```bash
docker-compose up --build
```

This will start MySQL, Eureka, API Gateway, and all Microservices.

**Option B: Manual Run**

1. Start Service Registry
2. Start API Gateway
3. Start User, Policy, Claim, Notification Services

### 2. Start Frontend

Open a new terminal in the `frontend` directory:

```bash
cd frontend
npm install
npm run dev
```

Access the application at the URL provided by Vite (usually `http://localhost:5173`).

## API Endpoints

Through API Gateway (Port 8080):
- `/api/users`
- `/api/policies`
- `/api/claims`
- `/api/notifications`

## Default Credentials

- **MySQL**: root / password
