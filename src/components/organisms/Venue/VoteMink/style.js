import styled from 'styled-components';

import { fontSize, spacing, calcRem } from '../../../../style';
import { IconInput } from '../../../molecules';

export const Status = styled.span`
  font-size: ${fontSize.tiny};
  position: absolute;
  margin-left: ${spacing.small};
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
