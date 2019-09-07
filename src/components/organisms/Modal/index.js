import React, { useEffect, useCallback, useRef } from 'react';
import ReactDOM from 'react-dom';

import { withNoSSR } from '../../atoms';
import { Background, CloseButton, Content, Layout, ModalHeader } from './style';

const stopPropagation = event => event.stopPropagation();

const Portal = withNoSSR(({ children, node = document.body }) => ReactDOM.createPortal(children, node));

export const Modal = ({ open, closeModal, title, canDismiss = true, canClose = true, inverse, children }) => {
  const containerRef = useRef(undefined);
  useEffect(() => {
    const element = containerRef.current || document.body;
    if (open) {
      element.style.overflow = 'hidden';
    } else {
      element.style.removeProperty('overflow');
    }
  }, [open]);
  useEffect(() => {
    containerRef.current = document.getElementById('rootContainer');
  }, []);
  const handleClose = useCallback(() => closeModal(), [closeModal]);

  return (
    <Portal node={containerRef.current}>
      <Background open={open} onClick={canDismiss ? handleClose : undefined}>
        <Layout>
          <Content inverse={inverse} onClick={stopPropagation}>
            <ModalHeader>
              {title}
              {canClose && <CloseButton onClick={handleClose} />}
            </ModalHeader>
            {children}
          </Content>
        </Layout>
      </Background>
    </Portal>
  );
};
