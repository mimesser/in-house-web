import { created, timestamp } from './config';
import industry from './industry';

export default {
   date: created,
   timestamp,
   userId: '-1',
   isFormerInsider: false,
   isTermsAccepted: false,
   industries: [industry],
   insiderVenueIds: [],
};
