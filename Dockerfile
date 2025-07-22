FROM node:18
WORKDIR /app
COPY . /app
RUN npm install pnpm -g && pnpm install && pnpm run build:prod
EXPOSE 5173
CMD ["pnpm", "run", "serve:prod", "--host", "0.0.0.0", "--port", "25000"]

