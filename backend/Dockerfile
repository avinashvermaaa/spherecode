FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive

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
  && apt-get clean

# Install Node.js (v18 LTS) & npm
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

# Install Go (official method)
RUN curl -LO https://golang.org/dl/go1.21.5.linux-amd64.tar.gz && \
    tar -C /usr/local -xzf go1.21.5.linux-amd64.tar.gz && \
    ln -s /usr/local/go/bin/go /usr/bin/go && \
    rm go1.21.5.linux-amd64.tar.gz

# Install Rust
RUN curl https://sh.rustup.rs -sSf | bash -s -- -y && \
    ln -s /root/.cargo/bin/rustc /usr/bin/rustc && \
    ln -s /root/.cargo/bin/cargo /usr/bin/cargo

# Install TypeScript globally using npm
RUN npm install -g typescript

# Set working directory
WORKDIR /app

# Copy project files
COPY . .

# Install project dependencies
RUN npm install

# Expose backend port
EXPOSE 5000

# Start the backend server
CMD ["node", "server.js"]
