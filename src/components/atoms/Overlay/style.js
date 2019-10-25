import styled, { css } from 'styled-components';
import { opacify } from 'polished';

import { cover, theme } from '../../../style';

const MODAL_Z_INDEX = 999;
const BG_HIDE = `background-color: ${opacify(-1, theme.colors.primaryLight)}`;
const BG_SHOW = `background-color: ${theme.colors.primaryLight}`;

export const Overlay = styled.div`
  ${cover()};
  z-index: ${MODAL_Z_INDEX - 10};
`;

const overlayEnter = ({ transition }) => `
  transition: background-color 0.3s;
  ${transition === 'entering' ? BG_HIDE : ''};
  ${transition === 'entered' ? BG_SHOW : ''};
`;

export const OverlayWrap = styled.div`
  // ${cover('fixed')};
  ${cover()};
  z-index: ${MODAL_Z_INDEX};
  ${overlayEnter};
`;

export const overlayStyle = css`
  > div {
    height: 100vh;
  }
`;
