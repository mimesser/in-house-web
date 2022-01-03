import styled from "styled-components"
import Router from 'next/router';

import { Button } from "../../atoms/Button"
import { H1 } from "../../atoms"
import { fontSize, lineHeight, breakpoints } from '../../../style';

const Wrapper = styled.div`
  background: #333333;
  width:100%;
  height:100%;
  position:absolute;
  box-sizing: border-box;
  padding:12px 12px 36px 12px;
  display:flex;
  flex-direction:column;
  justify-content: space-between;  
`
const CloseButton = styled(Button)`
  padding: 0;
  display:flex;
  justify-content:flex-end;
  > span : { 
    margin:0 !important;
  }  
`
const GotItButton = styled(Button)`
  background: #434343;
  justify-content: space-between;
  @media (min-width: ${breakpoints.md}) {
    width:250px;
  }
`
const TextBox = styled.div`
  margin-top:-180px;
`
const StyledH1 = styled(H1)`
  color:white;
`
const P = styled.p`
  font-size: ${fontSize.sm};
  line-height: ${lineHeight.sm};
  text-align: left;
  color: #BCBCBC;
`
export const Lmw3 = () => {
  return(
    <Wrapper>
      <CloseButton onClick={() => Router.push('/')} icon="close" />
      <TextBox>
        <StyledH1>thank you</StyledH1>
        <P>
          we will reach out to you as soon as we can to confirm whether 
          we will be able to list your workplace during our beta trial
        </P>
      </TextBox>
      <GotItButton onClick={() => Router.push('/')} wide icon="arrow-right">got it</GotItButton>
    </Wrapper>
  )
}