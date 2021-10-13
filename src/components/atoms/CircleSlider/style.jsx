import styled, { css } from 'styled-components';

/**
 * TODO: rather use onDesktop like so, instead of like it was done in breakpoints.
 * It works better with code highlighting.
 */
const onMobile = '@media (max-width: 576px)';

export const Container = styled.div`
  box-sizing: border-box;
  position: relative;
  display: inline-block;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  ${({ showHelp }) => showHelp && 'z-index: 1000;'};
  ${(props) =>
    props.mobileFullscreen &&
    css`
      ${onMobile} {
        width: 100%;
        height: auto;
      }
    `};
  svg {
    padding: ${({ padd }) => padd}px;
  }
`;

export const SliderLabel = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
