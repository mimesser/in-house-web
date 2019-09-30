import styled from 'styled-components';

import { Button, Heading, HeadingTwo, Strong } from '../../atoms';
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

  > ${HeadingTwo} {
    margin-top: 3rem;

    color: ${palette.primaryLight};
    letter-spacing: ${letterSpacing.medium};
    line-height: 36px;
    font-weight: ${fontWeight.primary};
  }

  div:first-of-type {
    margin-bottom: 4.5rem;

    color: ${palette.primaryLight};
    letter-spacing: ${letterSpacing.primary};
    font-weight: ${fontWeight.primary};
    font-size: ${fontSize.large};
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

  ${Button} {
    margin: auto;
  }
`;
