FROM node:10-alpine
WORKDIR /usr/src/app
COPY package*.json ./
COPY server.js ./ 
COPY wait-for-it.sh ./ 
COPY ./app/config ./app/config 
COPY ./app/controllers ./app/controllers 
COPY ./app/models ./app/models 
COPY ./app/resources ./app/resources
COPY ./app/routes ./app/routes 
COPY ./app/utils ./app/utils 
RUN apk add --no-cache --upgrade bash
RUN ls -laRt ./
RUN npm install
EXPOSE 8080
CMD [ "node", "server.js" ]

