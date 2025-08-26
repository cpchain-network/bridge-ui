FROM node:20
WORKDIR /app
COPY . /app
RUN npm install yarn -g && yarn install && npm run build
EXPOSE 5173
CMD ["npm", "run", "dev", "--host", "0.0.0.0", "--port", "25000"]

