import styled from 'styled-components';
import { spacing } from '../../../style';
import { Button } from '../../atoms';

export const FormGroup = styled.div`
  strong {
    font-weight: 600;
  }
  text-align: justify;
  margin: ${spacing.xLarge} 0;
`;

export const ButtonContainer = styled.div`
  padding-top: ${spacing.xLarge};
  text-align: center;
`;

export const Container = styled.div`
  padding: 0 ${spacing.large};
`;

export const SubmitButton = styled(Button).attrs({
  type: 'submit',
})`
  transition: opacity 0.5s;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  margin: ${spacing.large} auto 0 auto;
`;
