import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

import { withNoSSR } from '../../atoms';
import { Background, CloseButton, Content, Layout, ModalHeader } from './style';

const stopPropagation = event => event.stopPropagation();

const Portal = withNoSSR(({ children, node = document.body }) => ReactDOM.createPortal(children, node));

export const Modal = ({ open, closeModal, title, canDismiss = true, canClose = true, inverse, children }) => {
   useEffect(() => {
      document.body.style.overflow = open ? 'hidden' : 'initial';
   }, [open]);

   return (
      <Portal>
         <Background open={open} onClick={canDismiss ? closeModal : undefined}>
            <Layout>
               <Content inverse={inverse} onClick={stopPropagation}>
                  <ModalHeader>
                     {title}
                     {canClose && <CloseButton onClick={closeModal} />}
                  </ModalHeader>
                  {children}
               </Content>
            </Layout>
         </Background>
      </Portal>
   );
};
