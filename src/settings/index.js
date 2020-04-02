import getNextConfig from 'next/config';
import { DEMO_VENUE_ID, DEMO_VENUES_ID } from '../store/demo/data';

const { publicRuntimeConfig } = getNextConfig() || {};
const { API_URL } = publicRuntimeConfig;

const ONBOARDING_PATHS_REGEX = new RegExp(`(^/$|^/houses/(${DEMO_VENUE_ID}|${DEMO_VENUES_ID}))`);

export { ONBOARDING_PATHS_REGEX, API_URL };
