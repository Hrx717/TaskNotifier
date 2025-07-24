FROM node:22
WORKDIR /app
COPY package*json /app/
RUN npm i
COPY . .
EXPOSE 3003
CMD [ "node", "index.js" ]