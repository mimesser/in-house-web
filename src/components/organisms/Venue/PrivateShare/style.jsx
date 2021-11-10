import styled from 'styled-components';

import { Button, FormGroup, Overlay } from '../../../atoms';
import { palette, spacing } from '../../../../style';

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  ${FormGroup}:last-of-type {
    margin-bottom: ${spacing.xxxl};
  }
`;

export const SubmitButton = styled(Button).attrs({
  type: 'submit',
  wide: true,
  icon: 'arrow-right',
})`
  background-color: ${palette.primary};
  color: ${({ disabled }) => (disabled ? palette.darkGray : palette.offWhite)};
  border: 1px solid ${({ disabled }) => (disabled ? palette.darkGray : palette.offWhite)};
`;

export const FormLayout = styled.div`
  z-index: 1000;
  background-color: ${palette.primary};
  height: 100%;
  padding: ${spacing.xl};
  color: ${palette.offWhite};
`;

export const CustomOverlay = styled(Overlay)`
  position: fixed;
  overflow: hidden;
  width: 100%;
  height: 100%;
  bottom: 0;
  white-space: nowrap;
  background-color: ${palette.white};
  opacity: 0.3;
  backdrop-filter: blur(8px);
`;

export const ShareContent = styled.div`
  margin: 0 ${spacing.xl} ${spacing.xl} ${spacing.xl};
`;
