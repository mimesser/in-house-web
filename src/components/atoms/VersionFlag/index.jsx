import styled from 'styled-components';

import { fontSize, font, lineHeight, appColors, spacing, palette } from '../../../style';

export const GlobalInfoTab = styled.div`
  display: inline;
  position: fixed;
  vertical-align: middle;
  z-index: 1000;
  bottom: 0;
  left: ${spacing.lg};
  padding: ${spacing.sm} ${spacing.md};
  border: 3px solid ${appColors.midnight};
  border-bottom: none;
  border-top-left-radius: 10%;
  border-top-right-radius: 10%;
  transform: translateY(${spacing.sm});
  background-color: ${appColors.offWhite};
  color: ${appColors.red};
  ${font.bold}
  line-height: ${lineHeight.sm};
  font-size: ${fontSize.md};
`;

export const VersionFlag = () => (
  <GlobalInfoTab>{`${process.env.NEXT_PUBLIC_NPM_PACKAGE_VERSION}`}</GlobalInfoTab>
);
export default VersionFlag;
