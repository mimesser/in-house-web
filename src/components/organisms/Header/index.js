import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import { calcRem, spacing } from '../../../theme';

const imgSize = calcRem('20px');
const Layout = styled.div`
   display: flex;
   padding: ${imgSize} ${spacing.large};

   img {
      height: ${imgSize};
   }
`;

export const Header = () => (
   <Layout>
      <Link href="/">
         {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
         <a>
            <img src="/static/logo.png" alt="logo" />
         </a>
      </Link>

      {/* TODO: wrap logo with anchor? */}
      {/* TODO: menu */}
   </Layout>
);
