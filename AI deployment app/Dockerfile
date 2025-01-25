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
