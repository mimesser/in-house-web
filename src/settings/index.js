import getConfig from 'next/config';

// This way settings resolved at runtime and not at build time
const { publicRuntimeConfig: { MODE } = {} } = getConfig() || {};

const local = {
  apiUrl: 'http://localhost:5080/api',
};

const dev = {
  apiUrl: 'https://in-house-dev-backend.azurewebsites.net/api',
};

const staging = {
  apiUrl: 'https://in-house-staging-backend.azurewebsites.net/api',
  hotjar: 1456032,
};

const production = {
  apiUrl: 'https://in-house-backend.azurewebsites.net/api',
  hotjar: 1456032,
};

const settingsMap = {
  local,
  dev,
  staging,
  production,
};

const settings = settingsMap[MODE] || console.error('Environment not supplied!') || {};

export const onboardingRoutesConfig = [
  { path: '/', exact: true },
  { path: '/how-it-works', exact: false },
  { path: '/houses/demo', exact: false },
];

export { settings };
