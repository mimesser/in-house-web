import styled from 'styled-components';

import { fontSize, font, lineHeight, appColors, spacing, palette } from '../../../style';

export const GlobalInfoTab = styled.div`
  display: inline;
  position: fixed;
  z-index: 1000;
  bottom: 0;
  left: ${spacing.lg};
  padding: ${spacing.md};
  border: 2px solid ${appColors.midnight};
  border-top-left-radius: 25%;
  border-top-right-radius: 25%;
  background-color: ${appColors.offWhite};
  color: ${appColors.red};
  ${font.bold}
  line-height: ${lineHeight.md};
  font-size: ${fontSize.lg};
`;

export const VersionFlag = () => <GlobalInfoTab>{`${process.env.NEXT_PUBLIC_NPM_PACKAGE_VERSION}`}</GlobalInfoTab>;
export default VersionFlag;
