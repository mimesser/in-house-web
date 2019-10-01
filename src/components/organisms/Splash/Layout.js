import styled from 'styled-components';

import { Button, Heading, HeadingThree, Strong } from '../../atoms';
import { spacing, lineHeight, letterSpacing, palette, fontWeight, fontSize } from '../../../style';

export const SplashLayout = styled.div`
  display: flex;
  flex-direction: column;
  flex: auto;
  padding: 0 ${spacing.large};
  line-height: ${lineHeight.medium};

  p {
    margin: 0 0 ${spacing.small} 0;
  }

  ${Heading} {
    margin-bottom: 3rem;
  }
`;

export const LandingLayout = styled(SplashLayout)`
  padding: 0 ${spacing.xLarge};

  > ${Heading} {
    letter-spacing: ${letterSpacing.medium};
    line-height: 36px;
    font-size: 28px;
    font-weight: ${fontWeight.primary};
  }

  > ${Heading}:first-of-type {
    color: ${palette.primaryLight};
    margin-top: 2.5rem;

    margin-bottom: 0;
  }

  > ${Heading}:last-of-type {
    color: ${palette.textUltraLight};
    margin-bottom: 2.5rem;
  }

  ${Strong}:first-of-type {
    color: ${palette.primaryLight};
    margin-bottom: ${spacing.xLarge};
  }

  ${Strong}:last-of-type {
    color: ${palette.primaryLight};
    margin-top: ${spacing.xLarge};
  }

  > p {
    color: ${palette.primaryUltraLight};
    margin-bottom: ${spacing.medium};
  }

  div:last-of-type {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-grow: 1;

    > ${Button} {
      margin: ${spacing.large} auto;
      min-width: 12.5rem;
    }
  }
`;
