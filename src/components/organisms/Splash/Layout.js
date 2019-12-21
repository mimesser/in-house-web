import styled from 'styled-components';

import { Button, H1 } from '../../atoms';
import { spacing, lineHeight, palette, fontWeight } from '../../../style';

export const LandingLayout = styled.div`
  display: flex;
  flex-direction: column;
  flex: auto;
  line-height: ${lineHeight.md};
  padding: 0 ${spacing.xl};

  > ${H1} {
    line-height: 36px;
    font-size: 28px;
    font-weight: ${fontWeight.normal};
  }

  > ${H1}:first-of-type {
    color: ${palette.lightGray};
    margin-top: 2.5rem;

    margin-bottom: 0;
  }

  > ${H1}:last-of-type {
    color: ${palette.lightGray};
    margin-bottom: 2.5rem;
  }

  b {
    display: block;
  }

  b:first-of-type {
    color: ${palette.lightGray};
    margin-bottom: ${spacing.xl};
  }

  b:last-of-type {
    color: ${palette.lightGray};
    margin-top: ${spacing.xl};
  }

  > p {
    color: ${palette.lightGray};
    margin: 0 0 ${spacing.md} 0;
  }

  div:last-of-type {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-grow: 1;

    > ${Button} {
      margin: ${spacing.lg} auto;
      min-width: 12.5rem;
    }
  }
`;
