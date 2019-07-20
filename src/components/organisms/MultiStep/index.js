import React, { useState, useRef, useMemo } from 'react';
import styled from 'styled-components';
import ReactSwipe from 'react-swipe';

import { Container } from '../../atoms';
import { calcRem, spacing, palette } from '../../../style';

const navSize = calcRem('10px');
const NavButton = styled.button`
   background: ${({ selected }) => (selected ? palette.secondaryDark : palette.secondary)};
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
   margin: auto auto ${spacing.xxLarge} auto;
`;

const Swipeable = styled.div`
   display: flex;
   flex-direction: column;
   flex: 1;
`;

const style = {
   container: {
      overflow: 'hidden',
      visibility: 'hidden',
      position: 'relative',
      display: 'flex',
      flex: 1,
   },
   wrapper: {
      overflow: 'hidden',
      position: 'relative',
      display: 'flex',
      flex: '0 0 auto',
   },
   child: {
      float: 'left',
      width: '100%',
      position: 'relative',
      transitionProperty: 'transform',
   },
};

export function MultiStep({ steps }) {
   const [selectedStep, setSelectedStep] = useState(0);
   const swipeRef = useRef(null);
   const swipeOptions = useMemo(
      () => ({
         continuous: false,
         callback: index => setSelectedStep(index),
      }),
      [],
   );

   const nextStep = () => {
      const nextIndex = selectedStep + 1;
      if (swipeRef.current && nextIndex < steps.length) {
         swipeRef.current.next();
      }
   };

   return (
      <Container full fullVertical onClick={nextStep}>
         <ReactSwipe className="carousel" style={style} swipeOptions={swipeOptions} ref={swipeRef}>
            {steps.map((Step, key) => (
               <Swipeable key={key}>
                  <Step />
               </Swipeable>
            ))}
         </ReactSwipe>
         <Nav selectedValue={selectedStep} onChange={nextStep}>
            {steps.map((_, index) => (
               <NavButton key={index} selected={selectedStep === index} onClick={() => setSelectedStep(index)} />
            ))}
         </Nav>
      </Container>
   );
}
