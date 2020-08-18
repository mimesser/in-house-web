import styled from 'styled-components';

import { spacing, palette, calcRem } from '../../../../style';
import { IconInput } from '../../../molecules';

export const Status = styled.span`
  position: absolute;
  margin-top: ${spacing.sm};
  color: ${palette.darkGray};
`;

export const InputGroup = styled.div`
  position: relative;
  ${IconInput} {
    flex: 1;
    max-width: calc(100% - ${calcRem('60px')});

    // status icon and loader
    + * {
      margin: auto;
    }
  }
  > div:first-child {
    display: flex;
  }
`;
