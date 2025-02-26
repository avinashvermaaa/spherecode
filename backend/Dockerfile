# Use Node.js 18 as the base image
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Update and install required dependencies
RUN apt-get update && apt-get install -y software-properties-common

# Add Ubuntu Toolchain PPA and install g++-14
RUN add-apt-repository ppa:ubuntu-toolchain-r/test -y && \
    apt-get update && \
    apt-get install -y g++-14 gcc-14 build-essential libstdc++-14-dev

# Set g++-14 as the default compiler
RUN update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-14 100 \
    && update-alternatives --install /usr/bin/g++ g++ /usr/bin/g++-14 100

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
