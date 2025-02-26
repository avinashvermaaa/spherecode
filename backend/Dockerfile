# Use Node.js 18 as base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Install g++-12 and required dependencies
RUN apt-get update && apt-get install -y g++-12 build-essential libstdc++-12-dev

# Copy package.json and package-lock.json first to leverage Docker cache
COPY backend/package.json backend/package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend code
COPY backend/ .

# Expose the port (optional, useful for local testing)
EXPOSE 5000

# Start the server
CMD ["node", "server.js"]
