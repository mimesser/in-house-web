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

export const Header = ({ openMenu }) => (
  <Layout>
    <Link href="/">
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a>
        <Icon size={1.5} color="secondaryDark" icon="logo" />
      </a>
    </Link>
    <MenuIconButton>
      <Icon size={2} icon="menu" onClick={openMenu} />
    </MenuIconButton>
  </Layout>
);
