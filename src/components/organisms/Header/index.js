import React from 'react';
import styled from 'styled-components';

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
      <img src="/static/logo.png" alt="logo" />

      {/* TODO: wrap logo with anchor? */}
      {/* TODO: menu */}
   </Layout>
);
