FROM node:18
WORKDIR /app
COPY . /app
RUN npm install pnpm -g && pnpm install && pnpm run build:prod
EXPOSE 25000
CMD ["pnpm", "run", "serve:prod", "--host"]
