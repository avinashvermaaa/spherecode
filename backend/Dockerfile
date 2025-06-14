# Use Node.js 18 as the base image
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Install required dependencies for Node.js, Go, Rust, PHP, and TypeScript
RUN apt-get update && apt-get install -y \
    g++-12 \
    build-essential \
    libstdc++-12-dev \
    curl \
    gnupg \
    lsb-release \
    ca-certificates \
    && \
    # Install Go (version 1.18 or higher)
    curl -OL https://golang.org/dl/go1.18.10.linux-amd64.tar.gz && \
    tar -C /usr/local -xzf go1.18.10.linux-amd64.tar.gz && \
    rm go1.18.10.linux-amd64.tar.gz && \
    echo "export PATH=$PATH:/usr/local/go/bin" >> ~/.bashrc && \
    source ~/.bashrc && \
    # Install Rust via rustup
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y && \
    # Ensure Rust binaries are added to the path
    echo "export PATH=$HOME/.cargo/bin:$PATH" >> ~/.bashrc && \
    # Install PHP
    curl -sL https://deb.nodesource.com/setup_16.x | bash && \
    apt-get install -y php-cli && \
    # Install TypeScript globally
    npm install -g typescript && \
    # Ensure global npm binaries are in the PATH
    echo "export PATH=$PATH:/usr/local/bin" >> ~/.bashrc

# Copy the backend folder into the container
COPY ./backend /app/

# Install backend dependencies (Node.js dependencies)
RUN npm install

# Expose port 5000 for your app
EXPOSE 5000

# Start the server
CMD ["node", "server.js"]
