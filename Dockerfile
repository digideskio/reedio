FROM node:latest
RUN mkdir -p /usr/src/app
COPY package.json /usr/src/app/package.json
RUN cd /usr/src/app && rm -rf node_modules/ && npm cache clean && npm install --production
COPY . /usr/src/app
WORKDIR /usr/src/app
