FROM node:22
WORKDIR /app
COPY package*json /app/
RUN npm i
COPY . .
EXPOSE 3001
CMD [ "node", "index.js" ]