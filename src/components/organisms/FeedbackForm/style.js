import styled from 'styled-components';

import { spacing } from '../../../style';
import { Button, H2 } from '../../atoms';

export const FormGroup = styled.div`
  margin: ${spacing.md} 0;
`;

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: ${spacing.xxl};

  ${H2} {
    margin: ${spacing.xl} 0;
  }
`;

export const SubmitButton = styled(Button).attrs({
  type: 'submit',
})`
  margin: auto 0 ${spacing.md} auto;
`;
