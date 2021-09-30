require('dotenv').config();
const { withSentryConfig } = require('@sentry/nextjs');

const moduleExports = {
  experimental: {
    publicDirectory: true,
  },
  env: {
    SENTRY_DSN: process.env.SENTRY_DSN,
    SENTRY_ENVIRONMENT: process.env.SENTRY_ENVIRONMENT || 'development',
    SENTRY_RELEASE: process.env.NPM_PACKAGE_VERSION || '0.0.0',
    API_URL: process.env.API_URL,
    PORT: process.env.PORT,
    GA_KEY: process.env.GA_KEY,
    G_OPTIMIZE_KEY: process.env.G_OPTIMIZE_KEY,
    HOTJAR_SITE_ID: process.env.HOTJAR_SITE_ID,
    SENTRY_ENVIRONMENT: process.env.SENTRY_ENVIRONMENT,
  },
};

const SentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

module.exports = withSentryConfig(moduleExports, SentryWebpackPluginOptions);
