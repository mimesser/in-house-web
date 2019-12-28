import React from 'react';
import styled, { css } from 'styled-components';

import { spacing, palette, appBackground } from '../../../style';
import { H1, H2, ClearButton, Icon } from '../../atoms';

export const Background = styled.div`
  // todo
  position: ${({ showHelp }) => (showHelp ? 'absolute' : 'fixed')};
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  visibility: ${props => (props.open ? `visible` : `hidden`)};
  opacity: ${props => (props.open ? `1` : `0`)};
  transition: 0.5s;
  // TODO
  ${({ showHelp }) => !showHelp && 'z-index: 1'};
  // z-index: 1;
`;

export const Layout = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
`;

const colors = ({ inverse }) =>
  inverse
    ? css`
        background-color: ${palette.primary};
        color: ${palette.lightGray};
        ${H1}, ${H2} {
          color: ${palette.lightGray};
        }
      `
    : `background-color: ${appBackground};`;

const mobileFrame = ({ theme: { desktop } }) =>
  desktop &&
  css`
    width: 400px;
    height: 730px;
    margin: auto;
  `;

export const Content = styled.div`
  position: relative;
  overflow: auto;
  display: flex;
  flex-direction: column;
  padding: ${spacing.xl};
  width: 100%;
  ${mobileFrame};
  ${colors};
`;

export const CloseButton = styled(ClearButton).attrs({
  children: <Icon icon="close" />,
})`
  margin-left: auto;
`;

export const ModalHeader = styled.header`
  display: flex;
  align-items: center;
  text-transform: uppercase;
`;
