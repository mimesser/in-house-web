import React from 'react';
import { withRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
import { Transition } from 'react-transition-group';

import { Icon, IconButton } from '../../atoms';

import { spacing, fontSize, palette } from '../../../style';

const CloseButton = styled(IconButton)`
  padding: ${spacing.sm};
`;

const CloseIcon = styled(Icon).attrs(() => ({
  icon: 'close',
  height: 100,
}))`
  :hover {
    color: ${palette.white};
  }
`;

const routes = [
  { href: '/feedback', label: 'feedback' },
  { href: '/houses', label: 'see beta houses' },
  { href: '/quick-list', label: 'list your house' },
];

const duration = 300;

const MENU_WIDTH = '16rem';
const sidebarTransitionStyles = {
  entering: { width: 0 },
  entered: { width: MENU_WIDTH },
  exiting: { width: MENU_WIDTH },
  exited: { width: 0 },
};

const Panel = styled.div`
  position: absolute;
  right: 0;
  z-index: 2;
  height: 100%;
  transition: width ${duration}ms;
  box-shadow: rgba(0, 0, 0, 0.15) -2px 2px 4px;
  background-color: ${palette.black};
  white-space: nowrap;
  overflow: hidden;
  ${({ state }) => sidebarTransitionStyles[state]};
  color: ${palette.lightGray};
`;

const MenuItems = styled.ul`
  padding: ${spacing.lg} 0;
  margin: 0;
  list-style: none;
`;

const A = styled.a`
  outline: none;
  text-decoration: none;
  cursor: pointer;
  font-size: ${fontSize.lg};
  padding: ${spacing.sm} ${spacing.xl};
  display: block;
  &:hover {
    color: ${palette.white};
  }
`;

export const Menu = withRouter(({ isOpen, router, closeMenu }) => (
  <Transition in={isOpen} timeout={duration}>
    {state => (
      <Panel state={state}>
        <CloseButton onClick={closeMenu}>
          <CloseIcon />
        </CloseButton>
        <MenuItems state={state}>
          {routes.map(route => (
            <li key={route.href}>
              {route.href === router.asPath ? (
                <A onClick={closeMenu}>{route.label}</A>
              ) : (
                <Link href={route.href} passHref>
                  <A onClick={closeMenu}>{route.label}</A>
                </Link>
              )}
            </li>
          ))}
        </MenuItems>
      </Panel>
    )}
  </Transition>
));
