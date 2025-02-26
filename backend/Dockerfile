# Use Node.js 18 as the base image
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Install required dependencies
RUN apt-get update && apt-get install -y g++-12 build-essential libstdc++-12-dev

# Copy package.json and package-lock.json first (faster builds)
COPY backend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend files
COPY backend/ .

# Expose the port your server runs on
EXPOSE 5000  

# Start the Node.js server
CMD ["node", "server.js"]
