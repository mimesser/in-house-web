const { MODE } = process.env;

const env = (() => {
   switch (MODE) {
      case 'local': {
         return {
            apiUrl: 'http://localhost:5080/api',
            baseUrl: 'http://localhost:3000',
         };
      }
      // If you want to test against the staging server, locally.
      case 'local-staging': {
         return {
            apiUrl: 'https://inhousedev.azurewebsites.net/api',
            baseUrl: 'http://localhost:3000',
         };
      }
      case 'staging': {
         return {
            apiUrl: 'https://inhousedev.azurewebsites.net/api',
            baseUrl: 'https://staging.in-house.com',
         };
      }
      case 'production': {
         return {
            apiUrl: 'https://inhousedev.azurewebsites.net/api',
            baseUrl: 'https://in-house.com',
         };
      }
      default: {
         console.error('Environment not supplied!');
         return {};
      }
   }
})();

module.exports = {
   env,
};
