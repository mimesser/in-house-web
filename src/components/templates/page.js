import React, { useState, useCallback, useRef } from 'react';
import styled from 'styled-components';
import Head from 'next/head';

import { HelpToggle } from '../atoms';
import { Header, Menu } from '../organisms';
import { appBackground, breakpoints } from '../../style';

const PageLayout = styled.div`
  height: 100%;
  background-color: ${appBackground};
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  max-width: ${breakpoints.sm};
  margin: 0 auto;
`;

export const Page = ({
  children,
  title = 'In-House | Speak as a Team | Remain Untraceable',
  defaultHeader = true,
  className,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const openMenu = useCallback(() => setMenuOpen(true), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const ref = useRef(null);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta property="og:title" content={title} />
        <meta property="twitter:title" content={title} />
      </Head>
      <PageLayout ref={ref} className={className}>
        <Menu isOpen={menuOpen} closeMenu={closeMenu} />
        {defaultHeader && <Header openMenu={openMenu} />}
        <Container>{children}</Container>
        <HelpToggle containerRef={ref} />
      </PageLayout>
    </>
  );
};
