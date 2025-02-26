# Use Node.js 18 with Debian Bullseye as the base image
FROM node:18-bullseye

# Set working directory inside the container
WORKDIR /app

# Update and install required dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    g++ gcc libstdc++-dev

# Copy package.json and package-lock.json first (for better caching)
COPY backend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend files
COPY backend/ ./

# Ensure the /app/temp directory exists for compiled files
RUN mkdir -p /app/temp

# Expose the port your server runs on
EXPOSE 5000  

# Start the Node.js server
CMD ["node", "server.js"]
