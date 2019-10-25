import React, { useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import ReactDOM from 'react-dom';

import { withNoSSR } from '../../atoms';
import { Background, CloseButton, Content, Layout, ModalHeader } from './style';
import { selectShowHelp } from '../../../store/help';

const stopPropagation = event => event.stopPropagation();

const Portal = withNoSSR(({ children, node = document.body }) => ReactDOM.createPortal(children, node));

export const Modal = ({ open, closeModal, title, canDismiss = true, canClose = true, inverse, children }) => {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'initial';
  }, [open]);
  const handleClose = useCallback(() => closeModal(), [closeModal]);
  const showHelp = useSelector(selectShowHelp);
  return (
    <Portal>
      <Background open={open} onClick={canDismiss ? handleClose : undefined} showHelp={showHelp}>
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
