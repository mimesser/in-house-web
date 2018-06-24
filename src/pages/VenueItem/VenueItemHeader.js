import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon, Button } from 'components';

const Link = styled(Button)`
   color: ${props => props.theme.A_1};
`;
const ButtonContainer = styled.div`
   margin-left: -34px;
`;
const Header = styled.div`
   background-image: ${props => `url('https://minklistphoto.azureedge.net/photo/${props.src}')`};
   width: 100%;
   background-size: cover;
   height: 300px;
   background-repeat: no-repeat;
   position: relative;
   margin-top: 40px;
`;
const HeaderOverlay = styled.div`
   position: absolute;
   top: 0;
   right: 0;
   left: 0;
   bottom: 0;
   background-color: rgba(0,0,0,0.5);
`;
const Content = styled.div`
   ${props => props.theme.P1};
   z-index: 1;
   width: 100%;
   display: flex;
`;
const Container = styled.div`
   height: 100%;
   display: flex;
   align-items: center;
   max-width: 800px;
   margin: 0 auto;
`;
const Name = styled.h3`
   ${props => props.theme.P1};
   color: #ccc;
   font-size: 16pt;
   margin-bottom: 10px;
`;
const Type = styled.div`
   ${props => props.theme.T1};
   font-size: 13pt;
   margin-bottom: 10px;
`;
const Title = styled.h3`
   ${props => props.theme.S1};
   text-align: center;
   font-size: 12pt;
   padding: 10px;
   background-color: ${props => props.theme.A_7};
   display: inline-block;
`;
const Left = styled.div`
   flex: 1;
`;
const Rating = styled.div`
   display: inline-flex;
   background-color: ${props => props.theme.A_7};
   color: ${props => props.theme.A_2};
   height: 100%;
   width: 200px;
   align-items: center;
   justify-content: center;
   flex-direction: column;
`;
const Center = styled.div`
   flex: 1;
   text-align: center;
`;
const Right = styled.div`
   flex: 1;
   text-align: right;
`;
const Number = styled.div`
   font-size: 72px;
`;
const Decimal = styled.div`
   font-size: 42px;
   padding-top: 10px;
`;
const NumberContainer = styled.div`
   display: flex;
`;
const Person = styled.div`
   color: ${props => props.theme.A_4};
   font-size: 13px;
   display: flex;
   align-items: flex-end;
   margin-top: 4px;
`;

function parseNumber(rating) {
   let number;
   let decimal;
   if (rating) {
      [number, decimal] = rating.toFixed(1).toString().split('.');
   } else {
      number = 0;
      decimal = 0;
   }
   return (
      <NumberContainer>
         <Number>{number}</Number>
         <Decimal>.{decimal}</Decimal>
      </NumberContainer>
   );
}

export default function VenueItemHeader({ image, typesSummary, address, crossStreets, phone, insiderRating }) {
   return (
      <Header src={image}>
         <HeaderOverlay />
         <Container>
            <Content>
               <Left>
                  <Name>the standard grill</Name>
                  <Type>{typesSummary}</Type>
                  {address}
                  <br />
                  {crossStreets}
                  <br />
                  {phone}
                  <ButtonContainer>
                     <Link J_2>Edit</Link>
                     <Link J_2>House</Link>
                  </ButtonContainer>
               </Left>
               <Center>
                  <Title>INSIDER</Title>
               </Center>
               <Right>
                  <Rating>
                     {parseNumber(insiderRating)}
                     <Person><Icon size={16}>person</Icon> 32</Person>
                  </Rating>
               </Right>
            </Content>
         </Container>
      </Header>
   );
}

VenueItemHeader.propTypes = {
   image: PropTypes.string.isRequired,
};
