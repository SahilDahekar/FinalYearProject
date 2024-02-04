# Use an official Node.js image as the base image
FROM node:lts-alpine3.18

# Set the working directory in the container
WORKDIR /usr/src/backend

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose ports 8000 for APIs and 5000 for websockets
EXPOSE 8000
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
