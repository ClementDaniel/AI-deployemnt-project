# Monorepo CI/CD

This document provides a detailed guide for the design, setup, and operation of the Monorepo CI/CD project, which includes services for a backend (Node.js API), frontend (React with Vite), and a machine learning service (Flask API). The architecture follows a monorepo structure managed with Nx.

---

## Project Overview

The Monorepo CI/CD project integrates a frontend, backend, and machine learning service into a single repository. Each service is containerized using Docker and deployed using Kubernetes. Key features include:

- **Services**:
  - **Backend**: Node.js API (TypeScript-based).
  - **Frontend**: React app using Vite for development.
  - **ML-Service**: Flask-based API for machine learning tasks.

- **Monorepo Management**: Nx is used for managing dependencies and building each service.

- **Ports**:
  - Backend: `3000`
  - Frontend: `4200`
  - ML-Service: `5001`

- **CI/CD**:
  - GitHub Actions for continuous integration and delivery.
  - Build, test, and containerize each service.
  - Automated deployments to multiple environments (development, staging, canary, and production).

- **Deployment Strategy**:
  - Cloud-agnostic using Terraform and Kubernetes.
  - Supports AWS, Azure, and GCS.
  - Utilizes Docker Hub for container image storage.

---

## Folder Structure

The monorepo is structured as follows:

├── backend # Backend service (Node.js/TypeScript) 
├── backend-e2e # End-to-end tests for the backend 
├── deployment # Kubernetes deployment configuration files 
├── docker-compose.yml # Docker Compose configuration for local orchestration 
├── Dockerfile # Base Dockerfile for all services 
├── frontend # Frontend service (React with Vite) 
├── jest.config.ts # Jest configuration 
├── jest.preset.js # Jest preset configuration 
├── ml-service # Machine Learning service (Flask API) 
├── node_modules # Node.js dependencies 
├── nx.json # Nx workspace configuration 
├── package.json # Package manager configuration 
├── package-lock.json # Lockfile for npm dependencies 
├── packages # Shared libraries or utilities 
├── README.md # Documentation 
├── terraform # Terraform configuration for cloud infrastructure 
├── tsconfig.base.json # Base TypeScript configuration 
└── tsconfig.json # Project-specific TypeScript configuration

---


## Service Details

### Backend Service
- **Language**: Node.js (TypeScript)
- **Command to start locally**:
  ```bash
  npx ts-node ./src/main.ts
  ```
- **Exposed Port**: 3000

### Frontend Service
- **Framework**: React with Vite
- **Command to start locally**:
    ```bash
    npx nx serve frontend
    ```
- **Exposed Port**: 4200

### ML Service
- **Framework**: Flask
- Commands to Start locally: Run the first command once to train the model
    ```bash
    python3 train.py
    ```
  Start the FlaskAPI:
    ```bash
    python3 app.py
    ```

---

## Containerization
Since this project uses a monorepo, the source files for the frontend and backend are in the same repository. Therefore, a single Dockerfile can be used to build both services. The ML service will use its own Dockerfile.

### Dockerfile
```bash
    # Root Dockerfile
FROM node:18

WORKDIR /app

# Copy the entire monorepo
COPY . .

# Install root-level dependencies
RUN npm install

# Build the specified app
ARG APP
WORKDIR /app/$APP

# Install app-specific dependencies
RUN npm install

# Expose the correct port
ARG PORT
EXPOSE ${PORT}

# Start the application
CMD ["npm", "run", "start"]

```

### Docker Compose Configuration
The docker-compose.yml file orchestrates the three services.

### docker-compose.yml
```bash
services:
  frontend:
    build:
      context: .
      dockerfile: Dockerfile
      args:
        APP: frontend
    ports:
      - "4200:4200"
    environment:
      - PORT=4200
      - REACT_APP_BACKEND_URL=http://localhost:3000
    depends_on:
      - backend  # Ensure backend starts first

  backend:
    build:
      context: .
      dockerfile: Dockerfile
      args:
        APP: backend
    ports:
      - "3000:3000"
    environment:
      - PORT=3000
      - NODE_ENV=development
      - ML_SERVICE_URL=http://flask-api:5001  # Point backend to ml-service
    depends_on:
      - flask-api  # Ensure ml-service starts first

  flask-api:
    build:
      context: ./ml-service
      dockerfile: Dockerfile
    ports:
      - "5001:5001"
    environment:
      - PORT=5001
      - FLASK_ENV=development
```
---

## CI/CD Configuration

The CI/CD pipeline is managed using GitHub Actions. The workflows are designed to:

- Build and test services (backend, frontend, and ML service) using Nx and Docker.
- Push container images to Docker Hub.
- Deploy services to Kubernetes clusters in development, staging, canary, and production environments.

The GitHub Actions workflow configuration is located in the `.github/workflows` folder.

---

## CI/CD Configuration

The CI/CD pipeline is managed using GitHub Actions. The workflows are designed to:

- Build and test services (backend, frontend, and ML service) using Nx and Docker.
- Push container images to Docker Hub.
- Deploy services to Kubernetes clusters in development, staging, canary, and production environments.

The GitHub Actions workflow configuration is located in the `.github/workflows` folder. 
Refer to the workflow files for detailed pipeline steps and logic.
