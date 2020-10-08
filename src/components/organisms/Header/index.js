/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { withRouter } from 'next/router';
import styled from 'styled-components';
import Link from 'next/link';

import { Icon, ClearButton, Brand } from '../../atoms';
import { spacing, palette, onDesktop, deskPadRem, breakpoints, font, fontSize } from '../../../style';
import { menuOptions } from '../Menu';

const borderColor = ({ white }) => {
  // TODO: add alpha support to palette functions
  const c = white ? 249 : 51;
  return `rgba(${c}, ${c}, ${c}, 0.2)`;
};

const Layout = styled.div`
  position: relative;
  flex: none; // safari
  color: ${({ white }) => (white ? palette.white : palette.primary)};
  background-color: rgba(0, 0, 0, 0.2);

  > div {
    display: flex;
    align-items: center;
    padding: ${spacing.xl};

    @media screen and (min-width: ${breakpoints.sm}) {
      padding: ${spacing.xl} ${spacing.xxl};
    }

    @media screen and (min-width: ${breakpoints.xl}) {
      padding: ${spacing.xl} ${spacing.xxxl};
    }

    ${({ noPadd }) => !noPadd && onDesktop(`padding: ${spacing.xl} ${deskPadRem}`)};

    > span {
      margin-right: auto;

      & > a {
        text-decoration: none;
      }
    }
  }
`;

const A = styled.a`
  outline: none;
  text-decoration: none;
  cursor: pointer;
  ${font.bold};
  font-size: ${fontSize.sm};
  padding: 0;
  margin: 0;
  display: block;
  &:hover {
    color: ${palette.white};
  }
`;

const MenuToggle = styled(ClearButton)`
  margin-left: ${spacing.xl};
  float: right;
`;
const MenuItems = styled.ul`
  width: 100%;
  float: right;
  padding: 0;
  margin: 0;
  list-style: none;
`;
const Menu = styled.span`
  width: 100%;
  float: right;
  position: relative;
  margin-right: 0px;
  margin-left: auto;
  display: block;
  ${MenuItems} {
    display: none;
  }
  @media (min-width: ${breakpoints.md}) {
    ${MenuItems} {
      display: flex;
      width: 100%;
      justify-content: flex-end;
      li {
        paddig: 0;
        padding-left: ${spacing.md};
      }
    }
    ${MenuToggle} {
      float: right;
      margin-right: 0;
      margin-left: auto;
      display: none;
    }
  }
  ${MenuToggle} {
    float: right;
    // margin-right: 0;
    // margin-left: auto;
    // display: none;
  }
`;
const IconLink = ({ icon, href }) => (
  <Link href={href}>
    <a>
      <Icon icon={icon} size={1.5} />
    </a>
  </Link>
);

export const Header = withRouter(({ openMenu, white, noPadd, router }) => (
  <Layout white={white} noPadd={noPadd}>
    <div>
      <Brand />
      <Menu>
        <MenuItems>
          {menuOptions.map((route) => (
            <li key={route.href}>
              {route.href === router.asPath ? (
                <A>{route.label}</A>
              ) : (
                <Link href={route.href} passHref>
                  <A>{route.label}</A>
                </Link>
              )}
            </li>
          ))}
        </MenuItems>
        <MenuToggle onClick={openMenu}>
          <Icon icon="menu" size={1} />
        </MenuToggle>
      </Menu>
    </div>
  </Layout>
));
