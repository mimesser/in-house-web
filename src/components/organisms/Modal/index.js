import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

import { Background, CloseButton, Content, Layout } from './style';

const stopPropagation = event => event.stopPropagation();

const Portal = ({ children, node = document.body }) => ReactDOM.createPortal(children, node);

export const Modal = ({ open, closeModal, canDismiss = true, canClose = true, inverse, children }) => {
   useEffect(() => {
      document.body.style.overflow = open ? 'hidden' : 'initial';
   }, [open]);

   return (
      <Portal>
         <Background open={open} onClick={canDismiss ? closeModal : undefined}>
            <Layout>
               <Content inverse={inverse} onClick={stopPropagation}>
                  {canClose && <CloseButton onClick={closeModal} />}
                  {children}
               </Content>
            </Layout>
         </Background>
      </Portal>
   );
};
