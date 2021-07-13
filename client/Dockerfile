FROM node:14.15.4-slim

# Create a directory where our app will be placed
RUN mkdir -p /client

# Change directory so that our commands run inside this new directory
WORKDIR /client

COPY package.json /client

RUN yarn install

COPY . /client
EXPOSE 3000

CMD [ "yarn", "start" ]