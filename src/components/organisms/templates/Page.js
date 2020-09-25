import React, { useState, useCallback, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Head from 'next/head';

import { HelpToggle, withNoSSR } from '../../atoms';
import { Header } from '../Header';
import { Menu } from '../Menu';
import {
  appBackground,
  breakpoints,
  onDesktop,
  deskPad,
  cover,
  palette,
  onDesktopOverflowAuto,
  device,
} from '../../../style';

const PageLayout = styled.div`
  height: 100%;
  position: relative;
  background-color: ${appBackground};
  display: flex;
  flex-direction: column;
`;

const paddings = deskPad - 32;

const Container = styled.div`
  flex: 1;
  ${({ noPadd }) => !noPadd && onDesktop(`margin-left: ${paddings}px`)};
  display: flex;
  flex-direction: column;
  ${onDesktopOverflowAuto};
`;

// noinspection CssInvalidPseudoSelector
const Video = styled.video`
  position: fixed;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  /* For some reason we have a 1px white line on mobile. */
  width: calc(100% + 1px);
  height: auto;
  transform: translate(-50%, -50%);
  object-fit: cover;

  ${onDesktop(`width: auto`)};
`;

const Overlay = styled.div`
  ${cover('fixed')};
  content: '';
  background-image: linear-gradient(150.98deg, rgba(0, 178, 255, 0.2) 0%, rgba(255, 230, 0, 0.17) 99.68%),
    linear-gradient(150.46deg, #000000 0%, rgba(0, 0, 0, 0.35) 99.41%, rgba(0, 0, 0, 0.37) 99.42%);
  opacity: 0.7;
`;

const BackgroundImage = styled.div`
  ${cover('fixed')};
  background-repeat: no-repeat;
  background-size: cover;
  content: '';
  background-position-x: left;
  background-position-y: top;
  background-image: url(static/mobile_xs_750x1334.jpg);

  @media ${device.iPhoneX} {
    background-image: url(static/mobile_sm_iphonex1125x2436.jpg);
  }
  @media ${device.iPhone8Plus} {
    background-image: url('static/mobile_med_iphone6,7,8plus_1242x2208.jpg');
  }
  @media ${device.iPad} {
    background-image: url(static/mobile_md_ipad_1536x2408.jpg);
  }
  @media ${device.web} {
    background-image: url(static/web_min_1024x768.jpg);
  }
  @media ${device.laptop} {
    background-image: url(static/web_md_1440x900.jpg);
  }
  @media ${device.desktop} {
    background-image: url(static/web_lg_1920x1080.jpg);
  }
  @media ${device.macbook} {
    background-image: url(static/web_xl_max_retina_2880x1800.jpg);
  }
`;

const useMatchesQuery = (query) => {
  const mediaQueryList = window.matchMedia(query);
  const [result, setResult] = useState(mediaQueryList.matches);
  useEffect(() => {
    const handleChange = (ev) => setResult(ev.matches);
    mediaQueryList.addListener(handleChange);

    return () => mediaQueryList.removeListener(handleChange);
  }, []);

  return result;
};

const BackVideo = withNoSSR(() => {
  const mobile = useMatchesQuery(`(max-width: ${breakpoints.md})`);
  const resource = `https://in-house.azureedge.net/webstatic/${mobile ? 'bg-mobile-2' : 'bg-desktop-2'}`;

  return (
    <Video poster={`${resource}.png`} playsInline autoPlay muted loop>
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
  imageBack,
  overlayBack,
  whiteHead,
  noPadd,
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
        <>
          {videoBack && <BackVideo />}
          {imageBack && <BackgroundImage />}
          {overlayBack && <Overlay />}
        </>

        <Menu isOpen={menuOpen} closeMenu={closeMenu} />
        {defaultHeader && <Header openMenu={openMenu} white={whiteHead} noPadd={noPadd} />}
        <Container noPadd={noPadd}>{children}</Container>
        {/* <HelpToggle containerRef={ref} /> */}
      </PageLayout>
    </>
  );
};
