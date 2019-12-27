import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import { Icon } from '../../atoms';
import { spacing, palette } from '../../../style';

const Layout = styled.div`
  display: flex;
  align-items: center;
  padding: ${spacing.xl};
  flex: none; // safari
  color: ${palette.darkGray};
  border-bottom: ${palette.primary} solid 1px;
  opacity: 0.25;

  a {
    text-decoration: none;

    &:first-of-type {
      margin-right: auto;
    }
  }
`;

const MenuIconButton = styled.button`
  outline: none;
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
  color: currentColor;
  margin-left: ${spacing.xl};
`;

const IconLink = ({ icon, href }) => (
  <Link href={href}>
    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
    <a>
      <Icon icon={icon} size={1.5} />
    </a>
  </Link>
);

export const Header = ({ openMenu }) => (
  <Layout>
    <Link href="/">IN-HOUSE</Link>
    <IconLink icon="search" href="/houses" />
    <MenuIconButton>
      <Icon icon="menu" size={1.5} onClick={openMenu} color="secondaryDark" />
    </MenuIconButton>
  </Layout>
);
