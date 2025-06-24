# Use Node.js 20
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files and install deps
COPY package*.json ./
RUN npm install

# Copy everything else
COPY . .

# Build Vite client
RUN npm run build

# Start the server
CMD ["node", "server/index.js"]
