# Use Node.js 18 as the base image
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Update and install required dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    software-properties-common \
    wget

# Manually add Debian Backports and install g++-14
RUN echo "deb http://deb.debian.org/debian bookworm-backports main" >> /etc/apt/sources.list && \
    apt-get update && \
    apt-get -t bookworm-backports install -y g++-14 gcc-14 libstdc++-14-dev

# Set g++-14 as the default compiler
RUN update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-14 100 && \
    update-alternatives --install /usr/bin/g++ g++ /usr/bin/g++-14 100

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
