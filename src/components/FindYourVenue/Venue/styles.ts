import styled from 'styled-components';

export const Content = styled.div`
   flex: 1;
   margin: 0 10px;
   overflow: hidden;
   h3 {
      font-weight: normal;
      margin: 10px 0;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
   }
   span {
      font-weight: 100;
      font-size: 14px;
   }
`;

export const Venue = styled.div`
   border-radius: 4px;
   background-color: #fff;
   height: 110px;
   overflow: hidden;
   display: flex;
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

export const Image = styled.div`
   /* background-image: ${(props) => `url('https://minklistphoto.azureedge.net/photo/${props.src}')`}; */
   background-image: ${(props) => `url('${props.src}')`};
   background-size: cover;
   background-position: center;
   width: 110px;
   background-repeat: no-repeat;
   height: 100%;
`;
