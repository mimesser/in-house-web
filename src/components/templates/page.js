import React, { useState, useCallback, useRef } from 'react';
import styled, { css } from 'styled-components';
import Head from 'next/head';

import { HelpToggle } from '../atoms';
import { Header, Menu } from '../organisms';
import { appBackground, panelBoxShadow } from '../../style';

const RootContainer = styled.div``;

const mobileFrame = ({ theme: { desktop } }) =>
  desktop &&
  css`
    background-color: #eee;
    height: 100vh;

    > ${RootContainer} {
      width: 400px;
      height: 730px;
      margin: auto;
      min-height: initial;
      overflow: auto;
      flex: none;
      ${panelBoxShadow};
      background-color: ${appBackground};
    }
  `;

const PageLayout = styled.div`
  display: flex;
  flex-direction: column;

  > ${RootContainer} {
    position: relative;
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 100vh;
    // noinspection CssInvalidPropertyValue
    min-height: -webkit-fill-available;
  }
  ${mobileFrame};
`;

export const Page = ({ children, title = 'In-House | Speak as a Team | Remain Untraceable', defaultHeader = true }) => {
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
      <PageLayout>
        <RootContainer id="rootContainer" ref={ref}>
          <Menu isOpen={menuOpen} closeMenu={closeMenu} />
          {defaultHeader && <Header openMenu={openMenu} />}
          {children}
          <HelpToggle containerRef={ref} />
        </RootContainer>
      </PageLayout>
    </>
  );
};
