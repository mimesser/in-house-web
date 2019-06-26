import React from 'react';
import { withRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';

import { Icon } from '../../atoms';

import { spacing, fontSize, palette } from '../../../style';

const MenuContainer = styled.ul`
   padding-left: ${spacing.large};
   list-style: none;
`;

const CloseButton = styled.button`
   padding: ${spacing.small};
   outline: none;
   border: none;
   background: none;
`;

// TODO colors

const CloseIcon = styled(Icon)`
   svg {
      stroke: #eeeeee;
      &:hover {
         stroke: ${palette.white};
      }
      cursor: pointer;
   }
`;
const A = styled.a`
   outline: none;
   text-decoration: none;
   cursor: pointer;
   color: #eeeeee;
   font-family: Poppins;
   font-size: ${fontSize.large};
   padding: ${spacing.small} ${spacing.large};
   display: block;
   &:hover {
      color: ${palette.white};
   }
`;

const routes = [{ href: '/how-it-works', label: 'how-it-works' }, { href: '/feedback', label: 'feedback' }];

export const Menu = withRouter(({ closeMenu, router }) => (
   <>
      <CloseButton onClick={closeMenu}>
         <CloseIcon icon="close" height={100} />
      </CloseButton>
      <MenuContainer>
         {routes.map(route => (
            <li key={route.href}>
               {route.href === router.route ? (
                  /**
                   * If the target route is the same as the current one, simply close
                   * the menu. (Otherwize nothing will happen)
                   */
                  <A onClick={closeMenu}>{route.label}</A>
               ) : (
                  <Link href={route.href} passHref>
                     <A>{route.label}</A>
                  </Link>
               )}
            </li>
         ))}
      </MenuContainer>
   </>
));
