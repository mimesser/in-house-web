require('dotenv').config();

module.exports = {
  experimental: {
    publicDirectory: true,
  },
  env: {
    API_URL: process.env.API_URL,
    PORT: process.env.PORT,
    GA_KEY: process.env.GA_KEY,
    G_OPTIMIZE_KEY: process.env.G_OPTIMIZE_KEY,
  },
};
