import React, { useState } from 'react';
import { withRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Sidebar from 'react-sidebar';
import styled from 'styled-components';

import { Icon } from '../atoms/Icon';
import { Container } from '../atoms';
import { Header, Menu } from '../organisms';

export const Page = ({ children, title = 'inHouse', defaultHeader = true }) => {
   const [menuOpen, setMenuOpen] = useState(false);

   return (
      <>
         <Head>
            <title>{title}</title>
         </Head>
         <Sidebar
            sidebar={<Menu closeMenu={() => setMenuOpen(false)} />}
            open={menuOpen}
            onSetOpen={setMenuOpen}
            styles={{ sidebar: { background: '#000', width: '260px' } }}
            defaultSidebarWidth={260}
            pullRight
         >
            <Container full fullVertical fullHeight>
               {defaultHeader && <Header openMenu={() => setMenuOpen(true)} />}
               {children}
            </Container>
         </Sidebar>
      </>
   );
};
