import React from 'react';
import styled from 'styled-components';


const PageNumber = styled.div`
   position: fixed;
   top: 0;
   left: 0;
   background: rgba(255, 0, 0);
   padding: 10px;
   color: #fff;
`;

export default function (number) {
   return function (Component) {
      return function (props) {
         return [
            <PageNumber key={0}>{number}</PageNumber>,
            <Component key={1} {...props} />,
         ];
      };
   };
}
