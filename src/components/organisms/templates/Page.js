import React, { useState, useCallback, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Head from 'next/head';

import { HelpToggle, withNoSSR } from '../../atoms';
import { Header } from '../Header';
import { Menu } from '../Menu';
import { appBackground, breakpoints, onDesktop, deskPad, cover, palette } from '../../../style';

const PageLayout = styled.div`
  height: 100%;
  background-color: ${appBackground};
  display: flex;
  flex-direction: column;
`;

const paddings = deskPad - 32;

const Container = styled.div`
  width: 100%;
  height: 100%;
  max-width: ${breakpoints.sm};
  margin: 0 auto;
  // TODO: ? + move to landing
  ${onDesktop(`margin-left: ${paddings}px`)};
  display: flex;
  flex-direction: column;
`;

// noinspection CssInvalidPseudoSelector
const Video = styled.video`
  position: fixed;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  transform: translate(-50%, -50%);
  object-fit: cover;

  //::-webkit-media-controls-start-playback-button {
  //  display: none;
  //}
`;

const Overlay = styled.div`
  ${cover('fixed')};
  content: '';
  background-color: ${palette.black};
  opacity: 0.7;
`;

const useMatchesQuery = query => {
  const mediaQueryList = window.matchMedia(query);
  const [result, setResult] = useState(mediaQueryList.matches);
  useEffect(() => {
    const handleChange = ev => setResult(ev.matches);
    mediaQueryList.addListener(handleChange);

    return () => mediaQueryList.removeListener(handleChange);
  }, []);

  return result;
};

const BackVideo = withNoSSR(() => {
  const mobile = useMatchesQuery(`(max-width: ${breakpoints.md})`);
  const resource = `https://in-house.azureedge.net/webstatic/${mobile ? 'bg-mobile' : 'bg-desktop'}`;

  return (
    <Video poster={`${resource}.jpg`} playsInline autoPlay muted loop>
      <source src={`${resource}.mp4`} type="video/mp4" />
    </Video>
  );
});

export const Page = ({
  children,
  title = 'In-House | Speak as a Team | Remain Untraceable',
  defaultHeader = true,
  className,
  videoBack,
  whiteHead,
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
        {videoBack && (
          <>
            <BackVideo />
            <Overlay />
          </>
        )}
        <Menu isOpen={menuOpen} closeMenu={closeMenu} />
        {defaultHeader && <Header openMenu={openMenu} white={whiteHead} />}
        <Container>{children}</Container>
        <HelpToggle containerRef={ref} />
      </PageLayout>
    </>
  );
};
