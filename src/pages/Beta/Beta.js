// 0A
import React from 'react';
import styled from 'styled-components';
import Section1 from './Section1';
import Section2 from './Section2';
import Section3 from './Section3';
import Section4 from './Section4';
import Section5 from './Section5';
import Section6 from './Section6';

const Video = styled.div`
   height: 400px;
   background-image: url(${require('assets/images/main.jpg')});
   background-position: center;
   background-repeat: no-repeat;
   background-size: cover;
`;

export default function Beta() {
   return (
      <div>
         <Section1 />

         <Video />

         <Section2 />

         <Section3 />

         <Section4 />

         <Section5 />

         <Section6 />
      </div>
   );
}
