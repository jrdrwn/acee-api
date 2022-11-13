// utils/config.js

const config = {
  app: {
    host: process.env.HOST,
    port: process.env.PORT,
  },
  jwt: {
    accessToken: {
      key: process.env.ACCESS_TOKEN_KEY,
      age: process.env.ACCESS_TOKEN_AGE,
    },
  },
  pg: {
    uri: process.env.DATABASE_URL,
  },
};

module.exports = config;
