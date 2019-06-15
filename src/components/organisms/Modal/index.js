import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

import { Background, Close, Content, Layout } from './style';

const stopPropagation = event => event.stopPropagation();

const Portal = ({ children, node = document.body }) => ReactDOM.createPortal(children, node);

export const Modal = ({ open, closeModal, canDismiss = true, canClose = true, children }) => {
   useEffect(() => {
      document.body.style.overflow = open ? 'hidden' : 'initial';
   }, [open]);

   return (
      <Portal>
         <Background open={open} onClick={canDismiss ? closeModal : undefined}>
            <Layout>
               <Content onClick={stopPropagation}>
                  {canClose && <Close onClick={closeModal} />}
                  {children}
               </Content>
            </Layout>
         </Background>
      </Portal>
   );
};
