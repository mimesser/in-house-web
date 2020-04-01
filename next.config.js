require('dotenv').config();

module.exports = {
  experimental: {
    publicDirectory: true,
  },
  publicRuntimeConfig: {
    MODE: process.env.MODE,
  },
};
