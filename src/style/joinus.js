import styled from "styled-components";
import {appColors} from ".";

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
    margin: auto;
    padding: 50px 12px 80px;
  }
  @media screen and (min-width: 500px) {
    .section__content {
      padding: 78px 87px;
      border: 1px solid ${appColors.gray400};
    }
  }
`;
