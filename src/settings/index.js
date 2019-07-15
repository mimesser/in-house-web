import getConfig from 'next/config';

// This way settings resolved at runtime and not at build time
const { publicRuntimeConfig: { MODE } = {} } = getConfig() || {};

const local = {
   apiUrl: 'http://localhost:5080/api',
};

const localStaging = {
   apiUrl: 'https://inhousedev.azurewebsites.net/api',
};

const staging = {
   apiUrl: 'https://inhousedev.azurewebsites.net/api',
};

const production = {
   apiUrl: 'https://inhousedev.azurewebsites.net/api',
};

const settingsMap = {
   local,
   localStaging,
   staging,
   production,
};

export const settings = settingsMap[MODE] || console.error('Environment not supplied!') || {};
