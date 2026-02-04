# Enhancement Plan: Auth & Inter-service Communication

## 1. Inter-Service Communication (OpenFeign)
The microservices are currently isolated. We need to connect them:
- **Policy Service** -> needs to verify **User Service** (Does user exist?)
- **Claim Service** -> needs to verify **Policy Service** (Does policy exist?)

**Actions:**
- Add `spring-cloud-starter-openfeign` to `policy-service` and `claim-service` pom.xml.
- generic UserClient in Policy Service.
- generic PolicyClient in Claim Service.

## 2. Authentication & Security (JWT)
Currently, there is no real login.
- **User Service**: 
    - Add `spring-boot-starter-security` and `jjwt` dependencies.
    - Implement `AuthConfig` to allow public access to auth endpoints (we will handle auth logic manually or via standard filter, manually is easier for rapid dev of token generation endpoint).
    - Create `AuthService` to validate credentials and generate JWT.
    - Create `/auth/register` and `/auth/token` endpoints.
- **API Gateway**:
    - Add `jjwt` dependency.
    - Create `AuthenticationFilter` (Global or specific) to validate JWT on secured routes.
    - Whitelist `/auth/**` and `/users/register`.

## 3. Frontend Integration
- Update `Login.jsx` to call `/auth/token`.
- Store user info and JWT in `localStorage`.
- Add Axios interceptor to inject `Authorization: Bearer <token>` header.
