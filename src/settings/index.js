import getConfig from 'next/config';

// This way settings resolved at runtime and not at build time
const { publicRuntimeConfig: { MODE } = {} } = getConfig() || {};

const TRIAL_SUB_DOMAIN = 'demo';
const trialApp = process.browser && window.location.host.startsWith(TRIAL_SUB_DOMAIN);

const local = {
   mainAppApi: 'http://localhost:5080/api',
   trialAppApi: 'http://localhost:5080/api',
};

const localStaging = {
   mainAppApi: 'https://in-house-staging-admin-backend.azurewebsites.net/api',
   trialAppApi: 'https://in-house-staging-demo-backend.azurewebsites.net/api',
   trialApp: 'https://demo-staging.in-house.com',
};

const staging = {
   mainAppApi: 'https://in-house-staging-admin-backend.azurewebsites.net/api',
   trialAppApi: 'https://in-house-staging-demo-backend.azurewebsites.net/api',
   trialApp: 'https://demo-staging.in-house.com',
};

const production = {
   mainAppApi: 'https://inhousedev.azurewebsites.net/api',
   trialAppApi: 'https://inhousedev.azurewebsites.net/api',
   trialApp: 'https://demo.in-house.com',
   preLaunchMode: true,
};

const settingsMap = {
   local,
   localStaging,
   staging,
   production,
};

const settings = settingsMap[MODE] || console.error('Environment not supplied!') || {};

settings.trialApp = trialApp;
Object.defineProperty(settings, 'apiUrl', {
   get() {
      return trialApp ? this.trialAppApi : this.mainAppApi;
   },
   configurable: false,
});

export { settings };
