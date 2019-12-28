import React from 'react';
import styled, { css } from 'styled-components';
import { rgba } from 'polished';

import { spacing, palette, appBackground, cover, calcRem, breakpoints, panelBoxShadow } from '../../../style';
import { H1, H2, ClearButton, Icon } from '../../atoms';

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

export const Content = styled.div`
  position: relative;
  overflow: auto;
  display: flex;
  flex-direction: column;
  padding: ${spacing.xl};
  width: 100%;
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

export const MODAL_Z_INDEX = 999;

// TODO
const BG_HIDE = `background-color: ${rgba('#4F4F4F', 0)}`;
const BG_SHOW = `background-color: ${rgba('#4F4F4F', 0.9)}`;

const CONTAINER_HIDE = 'transform: translate3d(0, -100%, 0)';
const CONTAINER_SHOW = 'transform: translate3d(0, 0, 0)';

export const Overlay = styled.div`
  ${cover()};
  transform-style: preserve-3d;
  z-index: ${MODAL_Z_INDEX - 10};
`;

const containerEnter = ({ transition }) => `
  transition: 0.3s transform cubic-bezier(0.29,-1.11, 0.91, 1.46);
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
  display: flex;
  flex-direction: column;
  background: ${appBackground};
  background-clip: padding-box;
  // ${panelBoxShadow};
  box-shadow: 0 1px 4px 0 ${rgba(palette.black, 0.6)};

  width: 100%;
  max-width: ${breakpoints.sm};
  height: 100%;
  max-height: ${calcRem('700px')};

  ${colors};
  padding: ${spacing.xl};
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
  ${cover()};
  transform-style: preserve-3d;
  z-index: ${MODAL_Z_INDEX};

  ${handleChildren};
`;
