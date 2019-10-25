import styled from 'styled-components';

export const Container = styled.div`
  box-sizing: border-box;
  position: relative;
  display: inline-block;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  ${({ showHelp }) => showHelp && 'z-index: 1000;'};

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
