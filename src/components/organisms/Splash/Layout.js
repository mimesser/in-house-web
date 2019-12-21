import styled from 'styled-components';

import { Button, Heading, Strong } from '../../atoms';
import { spacing, lineHeight, palette, fontWeight } from '../../../style';

export const LandingLayout = styled.div`
  display: flex;
  flex-direction: column;
  flex: auto;
  line-height: ${lineHeight.medium};
  padding: 0 ${spacing.xLarge};

  > ${Heading} {
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
    margin: 0 0 ${spacing.medium} 0;
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
