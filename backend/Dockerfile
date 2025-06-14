FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive
ENV PATH="/usr/local/go/bin:/root/.cargo/bin:$PATH"

# Install core dependencies
RUN apt-get update && apt-get install -y \
  build-essential \
  g++ \
  gcc \
  python3 \
  python3-pip \
  curl \
  php \
  openjdk-17-jdk \
  software-properties-common \
  git \
  ca-certificates \
  nodejs \
  npm \
  && apt-get clean

# Install Go (v1.21.5)
RUN curl -LO https://golang.org/dl/go1.21.5.linux-amd64.tar.gz && \
  tar -C /usr/local -xzf go1.21.5.linux-amd64.tar.gz && \
  rm go1.21.5.linux-amd64.tar.gz

# Install Rust
RUN curl https://sh.rustup.rs -sSf | bash -s -- -y

# Install TypeScript globally
RUN npm install -g typescript

# Set working directory to backend folder
WORKDIR /app/backend

# Copy only backend folder
COPY . .

# Install backend dependencies
RUN npm install

# Expose backend port
EXPOSE 5000

# Start backend server
CMD ["node", "server.js"]
