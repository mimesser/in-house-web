import styled from 'styled-components';

import { calcRem } from '../../../style/calcRem';
import { Button } from '../../atoms';
import { palette } from '../../../style';
import { WinkConfirmation } from '../../molecules';

const shareConfirmationButtonHorizontalPadding = calcRem('75px');

export const DemoWinkConfirmationLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex: 1;

  color: ${palette.secondaryDark};
  text-align: center;

  ::before {
    content: '';
  }

  ${WinkConfirmation} {
    flex: 0;
    color: ${palette.secondaryDark};
  }

  ${Button} {
    background-color: ${palette.transparent};
    border-color: ${palette.white};
    padding-left: ${shareConfirmationButtonHorizontalPadding};
    padding-right: ${shareConfirmationButtonHorizontalPadding};
  }
`;
