import React from 'react';
import Head from 'next/head';

import { Container } from '../atoms';
import { Header } from '../organisms';

export const Page = ({ children, title = 'inHouse', defaultHeader = true }) => (
   <>
      <Head>
         <title>{title}</title>
      </Head>
      <Container full fullVertical fullHeight>
         {defaultHeader && <Header />}
         {children}
      </Container>
   </>
);
