# Use Node.js 18 as the base image
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Install required dependencies
RUN apt-get update && apt-get install -y g++-12 build-essential libstdc++-12-dev

# Copy backend files into the container
COPY . .

# Install dependencies
RUN npm install

# Expose the port your server runs on
EXPOSE 5000  # Change if your app uses a different port

# Start the Node.js server
CMD ["node", "server.js"]
