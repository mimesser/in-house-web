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
   mainAppApi: 'https://inhousedev.azurewebsites.net/api',
   trialAppApi: 'https://inhousedev.azurewebsites.net/api',
};

const staging = {
   mainAppApi: 'https://inhousedev.azurewebsites.net/api',
   trialAppApi: 'https://inhousedev.azurewebsites.net/api',
};

const production = {
   mainAppApi: 'https://inhousedev.azurewebsites.net/api',
   trialAppApi: 'https://inhousedev.azurewebsites.net/api',
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
