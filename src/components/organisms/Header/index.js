import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import { Icon } from '../../atoms/Icon';
import { calcRem, spacing } from '../../../theme';

const imgSize = calcRem('20px');

const Layout = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
   padding: ${spacing.medium} ${spacing.large};

   img {
      height: ${imgSize};
   }
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
            <img src="/static/logo.png" alt="logo" />
         </a>
      </Link>
      {/* TODO: menu */}
      <MenuIconButton>
         <Icon icon="menu" onClick={openMenu} />
      </MenuIconButton>
   </Layout>
);
