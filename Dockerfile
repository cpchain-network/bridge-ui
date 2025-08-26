FROM node:20
WORKDIR /app
COPY . /app
RUN npm install pnpm -g && pnpm install && pnpm run build
EXPOSE 5173
CMD ["pnpm", "run", "dev", "--host", "0.0.0.0", "--port", "25000"]

