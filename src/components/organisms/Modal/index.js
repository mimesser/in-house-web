import React from 'react';

import { Background, Close, Content, Layout } from './style';

const stopPropagation = event => event.stopPropagation();

export const Modal = ({ open, closeModal, canDismiss = true, children }) => (
   <Background open={open} onClick={canDismiss ? closeModal : undefined}>
      <Layout>
         <Content onClick={stopPropagation}>
            <Close onClick={closeModal} />
            {children}
         </Content>
      </Layout>
   </Background>
);
