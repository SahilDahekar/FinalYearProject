# Use an official Node.js runtime as a parent image
FROM node:lts-alpine3.18

# Set the working directory in the container
WORKDIR /usr/src/encoder

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the remaining application code to the working directory
COPY . .

# Expose port 3000 for the encoder application
EXPOSE 3000
EXPOSE 5001

# Command to run the application
CMD ["npm", "start"]
