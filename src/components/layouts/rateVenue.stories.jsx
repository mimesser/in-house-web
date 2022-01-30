import React from 'react';
import { storiesOf } from '@storybook/react';
import RateVenueLayout from './rateVenue.layout';

storiesOf('Rate Venue', module).add('rate venue', () => (
  <RateVenueLayout
    tabs={{ rate: <div>rate</div>, post: <div>post</div>, team: <div>team</div> }}
  />
));
