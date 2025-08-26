
FROM node:20

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "dev", "--host", "0.0.0.0", "--port", "25000"]

