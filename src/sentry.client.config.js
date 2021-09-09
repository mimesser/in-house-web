// This file configures the initialization of Sentry on the browser.
// The config you add here will be used whenever a page is visited.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  dsn: SENTRY_DSN || 'https://e712c44468354a0d9e81701b28d9c2c2@o993132.ingest.sentry.io/5951040',
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1.0,
  environment: process.env.SENTRY_ENVIRONMENT || 'development',
  release: `in-house@${process.env.SENTRY_RELEASE}`,
  maxBreadcrumbs: 50,
  debug: process.env.NODE_ENV !== 'production',
  denyUrls: [
    // Keep this list to an absolute minimum!
    // It's better to use Sentry's built-in integration for error reporting
    // than to blacklist individual URLs from being reported.
    /^http:\/\/localhost:\d+\/_next\//,
    /^http:\/\/localhost:\d+\/static\//,
  ],
  // ...
  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
});
