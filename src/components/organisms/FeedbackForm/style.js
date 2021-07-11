import styled from 'styled-components';

import { spacing, breakpoints } from '../../../style';
import { Button, H2 } from '../../atoms';
import { Icon } from '../../atoms/Icon';

export const FormGroup = styled.div`
  margin: ${spacing.md} 0;
`;

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: ${spacing.xxl};
  max-width: ${breakpoints.sm};

  ${H2} {
    margin: ${spacing.xl} 0;
  }
`;

export const Commands = styled.div`
  display: flex;
  margin-top: auto;
`;

export const SubmitButton = styled(Button).attrs({
  type: 'submit',
})`
  margin: auto 0 ${spacing.md} auto;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const BackButton = styled(Button).attrs({
  type: 'submit',
})`
  margin: auto 0 ${spacing.md} 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const LeftArrowIcon = styled(Icon).attrs({})`
  margin-right: 2rem;
  margin-left: auto !important;
`;
