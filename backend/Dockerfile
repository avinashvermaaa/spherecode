FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive
ENV PATH="/usr/local/go/bin:/root/.cargo/bin:$PATH"

# Core dependencies
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
  ca-certificates

# ✅ Install Node.js v18 and npm
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

# ✅ Install Go
RUN curl -LO https://golang.org/dl/go1.21.5.linux-amd64.tar.gz && \
  tar -C /usr/local -xzf go1.21.5.linux-amd64.tar.gz && \
  rm go1.21.5.linux-amd64.tar.gz

# ✅ Install Rust
RUN curl https://sh.rustup.rs -sSf | bash -s -- -y

# ✅ Install TypeScript
RUN npm install -g typescript

# Set working directory
WORKDIR /app

# Copy project files
COPY . .

# Install dependencies
RUN npm install

EXPOSE 5000

CMD ["node", "server.js"]
