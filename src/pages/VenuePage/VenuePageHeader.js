import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Icon, Typography } from 'components';

const ButtonLink = styled(Link)`
   color: ${props => props.theme.A_1};
`;
const ButtonContainer = styled.div`
   margin-top: 30px;
   button + button {
      margin-left: 30px;
   }
`;
const BackgroundImage = styled.div`
   background-image: ${props => `url('https://minklistphoto.azureedge.net/photo/${props.src}')`};
   width: 100%;
   background-size: cover;
   background-repeat: no-repeat;
   position: absolute;
   opacity: 0.4;
   height: 100%;
   z-index: -1;
`;
const Content = styled.div`
   ${props => props.theme.P1};
   z-index: 1;
   width: 100%;
   display: flex;
   height: 100%;
   max-width: 800px;
   margin: 0 auto;
   padding: 50px 0;
`;
const Container = styled.div`
   margin-top: 40px;
   position: relative;
`;
const Title = styled.h3`
   ${props => props.theme.S2};
   text-align: center;
   padding: 16px;
   background-color: ${props => props.theme.A_8};
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
   &:hover {
      color: ${props => props.theme.A_2};
   }
   font-size: 13px;
   display: flex;
   align-items: flex-end;
   margin-top: 10px;
`;

const StarContainer = styled.div`
   display: flex;
   color: ${props => props.theme.A_3};
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

export default function VenuePageHeader({
   _id, imageThumbnailBig, itemsSummary, address, crossStreets, phone, rating, votes,
}) {
   const filled = Math.round(rating);

   return (
      <Container>
         <BackgroundImage src={imageThumbnailBig} />
         <Content>
            <Left>
               <Typography V1>the standard grill</Typography>
               <Typography T1>{itemsSummary}</Typography>
               <Typography P1 style={{ marginTop: '10px' }}>
                  {address}
                  <br />
                  {crossStreets}
                  <br />
                  {phone}
               </Typography>
               <ButtonContainer>
                  <ButtonLink to={`/venues/${_id}/suggest-edit`}>Edit House</ButtonLink>
               </ButtonContainer>
            </Left>
            <Center>
               <Title>INSIDER</Title>
            </Center>
            <Right>
               <Rating>
                  {parseNumber(rating)}
                  <StarContainer>
                     {(new Array(10)).fill().map((_, i) => (
                        <Icon size={16} key={i}>{i < filled ? 'star' : 'star_border'}</Icon>
                     ))}
                  </StarContainer>
                  <Person>(<Icon size={16}>person</Icon> {votes})</Person>
               </Rating>
            </Right>
         </Content>
      </Container>
   );
}

VenuePageHeader.propTypes = {
   _id: PropTypes.string.isRequired,
   imageThumbnailBig: PropTypes.string,
   itemsSummary: PropTypes.string.isRequired,
   address: PropTypes.string.isRequired,
   crossStreets: PropTypes.string,
   phone: PropTypes.string,
   rating: PropTypes.number,
   votes: PropTypes.number,
};
