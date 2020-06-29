import React from 'react';
import { withRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
import { Transition } from 'react-transition-group';
import { useSwipeable } from 'react-swipeable';
import { Icon, ClearButton, Overlay } from '../../atoms';

import { spacing, fontSize, font, palette } from '../../../style';

const CloseButton = styled(ClearButton)`
  float: right;
  margin: ${spacing.xl};
  margin-left: auto;
  min-width: 40px;
  width: 40px;
`;

const CloseIcon = styled(Icon).attrs(() => ({
  icon: 'angle-down',
}))`
  width: 32px;
  height: 32px;
  :hover {
    color: ${palette.white};
  }
`;

const duration = 300;

const MENU_HEIGHT = '20rem';
const sidebarTransitionStyles = {
  entering: { height: 0 },
  entered: { height: MENU_HEIGHT },
  exiting: { height: MENU_HEIGHT },
  exited: { height: 0 },
};

const CustomOverlay = styled(Overlay)`
  position: fixed;
  overflow: hidden;
  widht: 100%;
  height: 100%;
  bottom: 0;
  white-space: nowrap;
  ${({ state }) => sidebarTransitionStyles[state]};
`;

const Panel = styled.div`
  position: fixed;
  bottom: 0;
  z-index: 1000;
  width: 100%;
  transition: width ${duration}ms;
  box-shadow: rgba(0, 0, 0, 0.15) -2px 2px 4px;
  background-color: ${palette.black};
  white-space: nowrap;
  overflow: hidden;
  ${({ state }) => sidebarTransitionStyles[state]};
  color: ${palette.offWhite};
`;

const MenuItems = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`;

const A = styled.a`
  outline: none;
  text-decoration: none;
  cursor: pointer;
  ${font.bold};
  font-size: ${fontSize.md};
  padding: ${spacing.sm} 0 ${spacing.sm} ${spacing.xxxl};
  margin-top: ${spacing.xxl};
  display: block;
  &:hover {
    color: ${palette.white};
  }
`;

export const DrawerMenu = withRouter(({ isOpen, router, closeMenu, ...props }) => {
  const handlers = useSwipeable({
    onSwipedDown: () => closeMenu(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });
  return (
    <Transition in={isOpen} timeout={duration}>
      {(state) => (
        <>
          {
            // eslint-disable-next-line react/jsx-props-no-spreading
            isOpen ? (
              <CustomOverlay>
                <div {...handlers} />{' '}
              </CustomOverlay>
            ) : null
          }
          <Panel state={state}>
            <CloseButton onClick={closeMenu}>
              <CloseIcon />
            </CloseButton>
            {props.children}
          </Panel>{' '}
        </>
      )}
    </Transition>
  );
});
