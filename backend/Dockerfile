# Use an official base image with build tools
FROM ubuntu:22.04

# Disable interactive prompts during package install
ENV DEBIAN_FRONTEND=noninteractive

# Install dependencies
RUN apt-get update && apt-get install -y \
  build-essential \
  g++ \
  gcc \
  python3 \
  nodejs \
  npm \
  openjdk-17-jdk \
  curl \
  php \
  golang-go \
  rustc \
  typescript \
  && apt-get clean

# Set up working directory
WORKDIR /app

# Copy app files
COPY . .

# Install Node dependencies
RUN npm install

# Expose the port
EXPOSE 5000

# Start the server
CMD ["node", "server.js"]
