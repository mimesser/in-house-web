import React, { useState, useCallback } from 'react';
import styled, { css } from 'styled-components';
import Head from 'next/head';

import { Header, Menu } from '../organisms';
import { appBackground, panelBoxShadow, palette } from '../../style';

const mobileFrame = ({ theme: { desktop } }) =>
  desktop &&
  css`
    background-color: #eee;
    height: 100vh;

    > div {
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

  > div {
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

export const Page = ({ children, title = 'inHouse', defaultHeader = true }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const openMenu = useCallback(() => setMenuOpen(true), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <PageLayout>
        <div id="rootContainer">
          <Menu isOpen={menuOpen} closeMenu={closeMenu} />
          {defaultHeader && <Header openMenu={openMenu} />}
          {children}
        </div>
      </PageLayout>
    </>
  );
};
