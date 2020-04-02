require('dotenv').config();

module.exports = {
  experimental: {
    publicDirectory: true,
  },
  publicRuntimeConfig: {
    API_URL: process.env.API_URL,
  },
};
