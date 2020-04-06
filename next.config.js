require('dotenv').config();

module.exports = {
  experimental: {
    publicDirectory: true,
  },
  env: {
    API_URL: process.env.API_URL,
    PORT: process.env.PORT,
  },
};
