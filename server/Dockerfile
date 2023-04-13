# specifies node installation
FROM node:alpine

# creates a directory for the app in docker container
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# copies package.json to the app directory and npm installs
COPY package.json /usr/src/app/
RUN npm install --silent

# copies the rest of the app
COPY . /usr/src/app

EXPOSE 6969

# runs server.js
CMD ["server.js"]