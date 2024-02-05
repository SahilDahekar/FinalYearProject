# Use an official Node.js image as the base image
FROM node:lts-alpine3.18

# Set the working directory in the container
WORKDIR /usr/src/frontend

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose port 5173
EXPOSE 5173
EXPOSE 5001

# Start the application
CMD ["npm", "run", "dev"]
