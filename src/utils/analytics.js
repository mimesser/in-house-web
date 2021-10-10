import ReactGA from 'react-ga';

export const initGA = () => {
  if (!window.GA_INITIALIZED) {
    if (typeof process.env.NEXT_PUBLIC_GA_KEY !== 'undefined') {
      ReactGA.initialize(process.env.NEXT_PUBLIC_GA_KEY, {
        gaOptions: {
          siteSpeedSampleRate: 100,
        },
      });
      window.GA_INITIALIZED = true;
    } else {
      console.warn('GA key not specified');
    }
  }
};
export const logPageView = () => {
  if (window.GA_INITIALIZED) {
    console.info(`Logging pageview for ${window.location.pathname}`);
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
