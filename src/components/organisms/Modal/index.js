import React from 'react';
import styled from 'styled-components';
import { Close as CloseIcon } from 'styled-icons/material/Close';

import { Container } from '../../atoms';

export const ModalBackground = styled(Container)`
   position: fixed;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   background-color: rgba(0, 0, 0, 0.5);
   display: grid;
   visibility: ${props => (props.open ? `visible` : `hidden`)};
   opacity: ${props => (props.open ? `1` : `0`)};
   transition: 0.5s;
   z-index: 1;
`;

export const ModalContainer = styled(Container)`
   align-self: center;
   justify-self: center;
   background: ${props => props.theme.white};
   max-width: ${props => props.theme.maxWidth};
   max-height: 100vh;
   position: relative;
   overflow: hidden;
   padding: 0;
   border-radius: ${props => props.theme.mediumBorderRadius};
   box-shadow: 0 0 3em ${props => props.theme.black};
`;

export const Close = styled(CloseIcon).attrs({ size: `2em` })`
   position: absolute;
   top: 0.5em;
   right: 0.4em;
   cursor: pointer;
   color: white;
`;

export const Modal = ({ open, closeModal, children }) => {
   return (
      <ModalBackground open={open} onClick={closeModal}>
         <ModalContainer onClick={event => event.stopPropagation()}>
            <Close onClick={closeModal} />
            {children}
         </ModalContainer>
      </ModalBackground>
   );
};
