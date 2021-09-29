const { withSentryConfig } = require('@sentry/nextjs');

const moduleExports = {};

// Additional config options for the Sentry Webpack plugin. Keep in mind that
// the following options are set automatically, and overriding them is not
// recommended:
//   release, url, org, project, authToken, configFile, stripPrefix,
//   urlPrefix, include, ignore
// For all available options, see:
// https://github.com/getsentry/sentry-webpack-plugin#options.
const SentryWebpackPluginOptions = {};

module.exports = withSentryConfig(moduleExports, SentryWebpackPluginOptions);
