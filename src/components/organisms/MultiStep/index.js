import React, { useState } from 'react';
import styled from 'styled-components';

import { Container } from '../../atoms';
import { calcRem, spacing } from '../../../theme';

const navSize = calcRem('10px');
const NavButton = styled.button`
   background: ${({ selected, theme: { palette } }) => (selected ? palette.grayscale[0] : palette.grayscale[1])};
   border-radius: 50%;
   width: ${navSize};
   height: ${navSize};
   padding: 0;
   border: none;
   outline: none;
   cursor: pointer;

   :not(:last-child) {
      margin-right: ${navSize};
   }
`;
const Nav = styled.nav`
   margin: auto auto ${spacing.medium} auto;
`;

export function MultiStep({ steps }) {
   const [selectedStep, setSelectedStep] = useState(0);

   const nextStep = () => {
      const nextIndex = selectedStep + 1;
      if (nextIndex < steps.length) {
         setSelectedStep(nextIndex);
      }
   };

   const Step = steps[selectedStep];

   return (
      <Container full fullVertical onClick={nextStep}>
         <Step />
         <Nav selectedValue={selectedStep} onChange={nextStep}>
            {steps.map((_, index) => (
               <NavButton key={index} selected={selectedStep === index} onClick={() => setSelectedStep(index)} />
            ))}
         </Nav>
      </Container>
   );
}
