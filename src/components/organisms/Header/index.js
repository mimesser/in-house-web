import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import { Icon } from '../../atoms';
import { spacing } from '../../../style';

const Layout = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${spacing.medium} ${spacing.large};
  flex: none; // safari
`;

const MenuIconButton = styled.button`
  outline: none;
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
`;

const IconLink = ({ icon, href }) => (
  <Link href={href}>
    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
    <a>
      <Icon icon={icon} size={1.5} color="secondaryDark" />
    </a>
  </Link>
);

export const Header = ({ openMenu }) => (
  <Layout>
    <IconLink icon="search" href="/houses" />
    <IconLink icon="logo" href="/" />
    <MenuIconButton>
      <Icon icon="menu" size={1.5} onClick={openMenu} color="secondaryDark" />
    </MenuIconButton>
  </Layout>
);
