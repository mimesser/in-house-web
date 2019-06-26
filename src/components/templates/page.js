import React, { useState, useCallback } from 'react';
import Head from 'next/head';
import Sidebar from 'react-sidebar';

import { Container } from '../atoms';
import { Header, Menu } from '../organisms';

export const Page = ({ children, title = 'inHouse', defaultHeader = true }) => {
   const [menuOpen, setMenuOpen] = useState(false);
   const openMenu = useCallback(() => setMenuOpen(true), []);
   const closeMenu = useCallback(() => setMenuOpen(false), []);

   return (
      <>
         <Head>
            <title>{title}</title>
         </Head>
         <Sidebar
            sidebar={<Menu closeMenu={closeMenu} />}
            open={menuOpen}
            onSetOpen={setMenuOpen}
            styles={{ sidebar: { background: '#000', width: '260px' } }}
            defaultSidebarWidth={260}
            pullRight
         >
            <Container full fullVertical fullHeight>
               {defaultHeader && <Header openMenu={openMenu} />}
               {children}
            </Container>
         </Sidebar>
      </>
   );
};
