import React from 'react';
import styled, { css } from 'styled-components';
import { rgba } from 'polished';

import {
  spacing,
  palette,
  appBackground,
  cover,
  calcRem,
  breakpoints,
  panelBoxShadow,
  onDesktop,
  deskPadRem,
} from '../../../style';
import { ClearButton, Icon } from '../../atoms';

const colors = ({ inverse }) =>
  inverse
    ? css`
        background-color: ${palette.primary};
        color: ${palette.white};
      `
    : `background-color: ${appBackground};`;

export const CloseButton = styled(ClearButton).attrs({
  children: <Icon icon="close" />,
})`
  margin-left: auto;
`;

export const ModalHeader = styled.header`
  display: flex;
  align-items: center;
  text-transform: uppercase;
  ${onDesktop(`margin-left: ${deskPadRem}`)};
`;

export const MODAL_Z_INDEX = 999;

// TODO
const BG_HIDE = `background-color: ${rgba('#4F4F4F', 0)}`;
const BG_SHOW = `background-color: ${rgba('#4F4F4F', 0.9)}`;

const CONTAINER_HIDE = 'opacity: 0';
const CONTAINER_SHOW = 'opacity: 1';

export const Overlay = styled.div`
  ${cover()};
  transform-style: preserve-3d;
  z-index: ${MODAL_Z_INDEX - 10};
`;

const containerEnter = ({ transition }) => `
  transition: opacity 200ms;
  ${CONTAINER_HIDE};
  ${transition === 'entered' ? CONTAINER_SHOW : ''};
`;

const overlayEnter = ({ transition }) => `
  transition: background-color 0.4s;
  ${BG_HIDE};
  ${transition === 'entered' ? BG_SHOW : ''};
`;

export const Container = styled.div.attrs(() => ({
  role: 'dialog',
  tabIndex: -1,
}))`
  ${cover()};
  transform-style: preserve-3d;
  z-index: ${MODAL_Z_INDEX};
  outline: 0;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Dialog = styled.div`
  overflow: auto;
  display: flex;
  flex-direction: column;
  background: ${appBackground};
  background-clip: padding-box;
  // ${panelBoxShadow};
  box-shadow: 0 1px 4px 0 ${rgba(palette.black, 0.6)};

  width: 100%;
  // max-width: ${calcRem('500px')};
  height: 100%;
  // max-height: ${calcRem('700px')};

  ${colors};
  padding: ${spacing.xxl};
`;

export const handleChildren = css`
  &:last-child ${Overlay} {
    ${BG_SHOW};
  }

  &:first-child ${Overlay} {
    ${overlayEnter};
  }

  ${Container} {
    ${containerEnter}
  }
`;

export const ModalWrap = styled.div`
  ${cover('fixed')};
  transform-style: preserve-3d;
  z-index: ${MODAL_Z_INDEX};

  ${handleChildren};
`;
