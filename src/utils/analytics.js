import ReactGA from 'react-ga';

export const initGA = () => {
  console.log('GA init');
  console.log(window.GA_INITIALIZED, process.env.GA_KEY);
  if (!window.GA_INITIALIZED) {
    if (process.env.GA_KEY) {
      ReactGA.initialize(process.env.GA_KEY);
    } else {
      console.log('GA key not specified');
    }
    window.GA_INITIALIZED = true;
  }
};
export const logPageView = () => {
  if (window.GA_INITIALIZED) {
    console.log(`Logging pageview for ${window.location.pathname}`);
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
  }
};
export const logEvent = (category = '', action = '') => {
  if (window.GA_INITIALIZED) {
    if (category && action) {
      ReactGA.event({ category, action });
    }
  }
};
export const logException = (description = '', fatal = false) => {
  if (window.GA_INITIALIZED) {
    if (description) {
      ReactGA.exception({ description, fatal });
    }
  }
};