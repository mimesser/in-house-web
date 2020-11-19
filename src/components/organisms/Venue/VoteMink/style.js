import styled from 'styled-components';

import { spacing, palette, calcRem, breakpoints } from '../../../../style';
import { IconInput } from '../../../molecules';

export const Status = styled.span`
  position: absolute;
  margin-top: ${spacing.sm};
  color: ${palette.darkGray};
`;

export const InputGroup = styled.div`
  ${IconInput} {
    flex: 1;

    // status icon and loader
    + * {
      margin: auto;
    }

    @media screen and (min-width: ${breakpoints.md}) {
      max-width: calc(100% - ${calcRem('60px')});
    }
  }

  > div:first-child {
    display: flex;
  }
`;
