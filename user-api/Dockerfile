# Create image based on the official Node 6 image from the dockerhub
FROM node:12.13.0-alpine
# Create a directory where our app will be placed
RUN mkdir -p /usr/src/app
# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app
# Get all the code needed to run the app
COPY . .
# install PM2
RUN npm install pm2 -g
# install all dependencies
RUN npm install
# Serve the app
CMD ["pm2-runtime", "index.js"]