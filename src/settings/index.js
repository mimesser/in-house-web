import { DEMO_VENUE_ID, DEMO_VENUES_ID } from '../store/demo/data';

const ONBOARDING_PATHS_REGEX = new RegExp(`(^/$|^/houses/(${DEMO_VENUE_ID}|${DEMO_VENUES_ID}))`);

export { ONBOARDING_PATHS_REGEX };
