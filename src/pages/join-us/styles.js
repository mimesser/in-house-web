import styled from "styled-components";
import {appColors} from "../../style";

export const JoinUSBaseStyling = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  min-height: 100%;
  background-color: ${appColors.gray600};

  > section {
    padding: 50px 12px 80px;
  }
`;
