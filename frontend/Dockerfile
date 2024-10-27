FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm install -g serve

RUN npm run build

EXPOSE 3000

CMD ["serve", "-s", "build", "--single"]
