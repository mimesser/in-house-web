import React from 'react';
import { withRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
import { Transition } from 'react-transition-group';

import { Icon, ClearButton } from '../../atoms';

import { spacing, fontSize, font, palette } from '../../../style';

const CloseButton = styled(ClearButton)`
  margin: ${spacing.xl};
`;

const CloseIcon = styled(Icon).attrs(() => ({
  icon: 'close',
}))`
  :hover {
    color: ${palette.white};
  }
`;

const routes = [
  { href: '/houses', label: 'see beta houses' },
  { href: '/beta-list', label: 'beta-list workplace' },
  { href: '/about', label: 'about' },
  { href: '/feedback', label: 'contact us' },
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
  z-index: 1;
  height: 100%;
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

export const Menu = withRouter(({ isOpen, router, closeMenu }) => (
  <Transition in={isOpen} timeout={duration}>
    {(state) => (
      <Panel state={state}>
        <CloseButton onClick={closeMenu}>
          <CloseIcon />
        </CloseButton>
        <MenuItems>
          {routes.map((route) => (
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
