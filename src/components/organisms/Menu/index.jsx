import React, { useEffect } from 'react';
import { withRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
import { Transition } from 'react-transition-group';

import { Icon, ClearButton } from '../../atoms';

import { spacing, fontSize, font, palette, breakpoints, themeColors } from '../../../style';

const CloseButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
  padding: 16px;
`;
const CloseButton = styled(ClearButton)``;

const CloseIcon = styled(Icon).attrs(() => ({
  icon: 'close',
  color: '#BCBCBC',
}))`
  width: 24px;
  height: 24px;
  :hover {
    color: ${palette.white};
  }
`;

export const menuOptions = [
  { href: '/list-workplace', label: 'list workplace' },
  { href: '/about', label: 'about us' },
  { href: '/join-us', label: 'join us' },
  { href: '/faqs', label: 'faq' },
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
const BlurFilter = styled.div`
${({ isOpen }) => (isOpen ? '' : 'display : none')};
position: fixed;
top: 0;
right: 0;
z-index: 995;
height: 100%;
width: 100%;
overflow: hidden;
-webkit-backdrop-filter: blur(1px);
backdrop-filter: blur(1px);

}
`;

const Panel = styled.div`
  position: fixed;
  right: 0;
  z-index: 999;
  height: 100%;
  transition: width ${duration}ms;
  background-color: ${themeColors.primary};
  white-space: nowrap;
  overflow: hidden;
  ${({ state }) => sidebarTransitionStyles[state]};
	color: ${palette.offWhite};
`;

const MenuItems = styled.ul`
  padding: 0;
  margin: 0;
	list-style: none;
	z-index: 2;
`;

const A = styled.a`
  outline: none;
  text-decoration: none;
  cursor: pointer;
  ${font.bold};
  font-size: ${fontSize.sm};
  padding: ${spacing.xl} 0 0 ${spacing.xl};
  display: block;
  &:hover {
    color: ${palette.white};
  }
`;

export const Menu = withRouter(({ isOpen, router, closeMenu, variant }) => {
  useEffect(() => {
    if (isOpen) {
      closeMenu();
    }
  }, [router.asPath]);

  return (
    <>
      <Transition in={isOpen} timeout={duration}>
        {(state) => (
          <Panel state={state}>
            <CloseButtonWrapper>
              <CloseButton onClick={closeMenu}>
                <CloseIcon />
              </CloseButton>
            </CloseButtonWrapper>

            <MenuItems>
              {menuOptions.map((route) => (
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
      <BlurFilter isOpen={isOpen} onClick={closeMenu} />
    </>
  );
});
