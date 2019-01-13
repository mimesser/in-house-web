import styled from 'styled-components';

export const Container = styled.div`
   width: 100%;
   display: flex;
   flex-wrap: wrap;
   @media (min-width: 481px) {
      padding: 0 10px;
   };
`;

export const Venue = styled.div`
   border-radius: 4px;
   background-color: #fff;
   height: 60px;
`;

export const VenueWrapper = styled.div`
   padding: 10px;
   width: 100%;
   @media (min-width: 481px) {
      width: 50%;
   };
   @media (min-width: 769px) {
      width: 33.33333%;
   };
   @media (min-width: 1025px) {
      width: 25%;
   };
`;
