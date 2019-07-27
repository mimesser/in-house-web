import getConfig from 'next/config';

// This way settings resolved at runtime and not at build time
const { publicRuntimeConfig: { MODE } = {} } = getConfig() || {};

const TRIAL_SUB_DOMAIN = 'demo';
const demoApp = process.browser && window.location.host.startsWith(TRIAL_SUB_DOMAIN);

const local = {
   mainAppApi: 'http://localhost:5080/api',
   demoAppApi: 'http://localhost:5080/api',
};

const localStaging = {
   mainAppApi: 'https://in-house-staging-backend.azurewebsites.net/api',
   demoAppApi: 'https://in-house-staging-demo-backend.azurewebsites.net/api',
   demoAppUrl: 'https://demo-staging.in-house.com',
};

const dev = {
   mainAppApi: 'https://in-house-dev-backend.azurewebsites.net/api',
   demoAppApi: 'https://in-house-dev-demo-backend.azurewebsites.net/api',
   demoAppUrl: 'https://demo-dev.in-house.com',
};

const staging = {
   mainAppApi: 'https://in-house-staging-backend.azurewebsites.net/api',
   demoAppApi: 'https://in-house-staging-demo-backend.azurewebsites.net/api',
   demoAppUrl: 'https://demo-staging.in-house.com',
};

const production = {
   mainAppApi: 'https://inhousedev.azurewebsites.net/api',
   demoAppApi: 'https://inhousedev.azurewebsites.net/api',
   demoAppUrl: 'https://demo.in-house.com',
   preLaunchMode: true,
};

const settingsMap = {
   local,
   localStaging,
   dev,
   staging,
   production,
};

const settings = settingsMap[MODE] || console.error('Environment not supplied!') || {};

settings.demoApp = demoApp;
Object.defineProperty(settings, 'apiUrl', {
   get() {
      return demoApp ? this.demoAppApi : this.mainAppApi;
   },
   configurable: false,
});

export { settings };
