FROM node:16.19.0-alpine
WORKDIR /src/app

COPY node_modules /src/app/node_modules
COPY dist /src/app/dist

EXPOSE 3000

CMD ["node", "dist/main"]