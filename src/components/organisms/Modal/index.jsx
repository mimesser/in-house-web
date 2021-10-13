import React, { useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Transition } from 'react-transition-group';

import { Portal } from '../../atoms';
import { CloseButton, Container, Dialog, ModalHeader, ModalWrap, Overlay } from './style';
import { selectShowHelp } from '../../../store/help';

const stopPropagation = (event) => event.stopPropagation();

export const Modal = ({
  closeModal,
  title,
  canDismiss = true,
  canClose = true,
  inverse,
  children,
  style,
  className,
  noPadd,
  ...transitionProps
}) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.removeProperty('overflow');
    };
  }, []);
  const handleClose = useCallback(() => closeModal(), [closeModal]);
  const showHelp = useSelector(selectShowHelp);
  return (
    <Portal>
      <Transition {...transitionProps} timeout={100} appear in unmountOnExit>
        {(transition) => (
          <ModalWrap {...{ className, style, transition }}>
            <Overlay />
            <Container onClick={canDismiss ? handleClose : undefined}>
              <Dialog onClick={stopPropagation} inverse={inverse} noPadd={noPadd}>
                <ModalHeader noPadd={noPadd}>
                  {title}
                  {canClose && <CloseButton onClick={handleClose} />}
                </ModalHeader>
                {children}
              </Dialog>
            </Container>
          </ModalWrap>
        )}
      </Transition>
    </Portal>
  );
};
