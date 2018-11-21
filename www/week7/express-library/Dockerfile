FROM node:8
WORKDIR /urs/src/app
COPY package*.json ./
RUN npm install
COPY app/ ./
EXPOSE 8080
CMD ["npm", "start"]

