import styled from "styled-components";
import {appColors, device} from ".";

export const JoinUSBaseStyling = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  min-height: 100%;
  background-color: ${appColors.gray600};

  > section {
    padding: 50px 12px 80px;
  }
  .section__content {
    width: 100%;
    padding: 55px 12px 88px;
  }
  @media ${device.tab} {
    .section__content {
      padding: 65px 40px 88px;
    }
  }

  @media ${device.web} {
    .section__content {
      padding: 65px 80px 88px;
    }
  }

  @media ${device.desktop} {
    .section__content {
      padding: 65px 277px 88px;
    }
  }
`;
