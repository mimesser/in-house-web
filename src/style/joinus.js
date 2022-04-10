import styled from 'styled-components';
import { appColors } from '.';
import { mobileWidth } from './breakpoints';

export const JoinUSBaseStyling = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  min-height: 100%;
  background-color: ${appColors.gray600};

  > section {
    padding-top: 50px;
    padding-bottom: 80px;
  }
  .section__content {
    width: 100%;
    padding-top: 55px;
    padding-bottom: 88px;
  }
  @media ${mobileWidth.lg} {
    .section__content {
      padding-top: 65px;
    }
  }
`;
