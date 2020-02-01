import styled from 'styled-components';

import { Page } from './Page';
import { breakpoints, cover, palette } from '../../../style';

export const LandingPage = styled(Page).attrs(() => ({
  whiteHead: true,
}))`
  @media screen and (max-width: ${breakpoints.sm}) {
    background-image: url(https://in-house.azureedge.net/webstatic/unsplash.png);
  }
  @media screen and (min-width: ${breakpoints.sm}) {
    background-image: url(https://in-house.azureedge.net/webstatic/unsplash-big.png);
  }
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  position: relative;
  :before {
    ${cover()};
    content: '';
    background-color: ${palette.black};
    opacity: 0.7;
  }

  > *:not(:first-child) {
    position: relative;
  }
`;
