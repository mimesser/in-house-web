import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { useDebouncedValue, useWindowSize } from 'rooks';
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
  mobileWidth,
  desktopWidth
} from '../../../style';

const PageLayout = styled.div`
  height: 100%;
  position: relative;
  background-color: ${appBackground};
  display: flex;
  flex-direction: column;

  @media (min-width: ${mobileWidth.sm}) {
    padding-left: 12px;
    padding-right: 12px;
  }

  @media (min-width: ${mobileWidth.md}) {
    padding-left: 32px;
    padding-right: 32px;
  }

  @media (min-width: ${mobileWidth.lg}) {
    padding-left: 40px;
    padding-right: 40px;
  }

  @media (min-width: ${mobileWidth.xl}) {
    padding-left: 56px;
    padding-right: 56px;
  }

  @media (min-width: ${desktopWidth.sm}) {
    padding-left: 80px;
    padding-right: 80px;
  }

  @media (min-width: ${desktopWidth.md}) {
    padding-left: 123px;
    padding-right: 123px;
  }

  @media (min-width: ${desktopWidth.lg}) {
    padding-left: 277px;
    padding-right: 277px;
  }
`;

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  ${({ noOverflow }) => !noOverflow && onDesktop(`overflow: auto`)};
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
  background-image: linear-gradient(
      150.98deg,
      rgba(0, 178, 255, 0.2) 0%,
      rgba(255, 230, 0, 0.17) 99.68%
    ),
    linear-gradient(150.46deg, #000000 0%, rgba(0, 0, 0, 0.35) 99.41%, rgba(0, 0, 0, 0.37) 99.42%);
  opacity: 0.7;
`;

export const BackgroundImage = styled.div`
  ${cover('fixed')};
  background-repeat: no-repeat;
  background-size: cover;
  content: '';
  background-position-x: left;
  background-position-y: top;
  background-image: url(static/mobile_xs_750x1334.webp);

  @media ${device.iPhoneX} {
    background-image: url(static/mobile_sm_iphonex1125x2436.webp);
  }
  @media ${device.iPhone8Plus} {
    background-image: url('static/mobile_med_iphone6,7,8plus_1242x2208.webp');
  }
  @media ${device.iPad} {
    background-image: url(static/mobile_md_ipad_1536x2408.webp);
  }
  @media ${device.web} {
    background-image: url(static/web_min_1024x768.webp);
  }
  @media ${device.laptop} {
    background-image: url(static/web_md_1440x900.webp);
  }
  @media ${device.desktop} {
    background-image: url(static/web_lg_1920x1080.webp);
  }
  @media ${device.macbook} {
    background-image: url(static/web_xl_max_retina_2880x1800.webp);
  }

  ${({headerImageBgCss}) => headerImageBgCss || ''}
`;

const WINDOW_RESIZE_UPDATE_DELAY = 1000;

const BackVideo = withNoSSR(() => {
  // TODO: for some reason CDN is struggling with videos.
  const videoWidths = [375, 768, 1280, 1920];
  const resourcePrefix = 'https://in-house.azureedge.net/webstatic/bg-';
  const [resource, setResource] = useState(null);

  const { innerWidth } = useWindowSize();
  const [windowWidth, _] = useDebouncedValue(innerWidth, WINDOW_RESIZE_UPDATE_DELAY);

  const getResourceSuffix = useCallback(
    () => videoWidths.find((w) => innerWidth <= w) || videoWidths[videoWidths.length - 1],
    [innerWidth],
  );
  useEffect(() => {
    const videoWidth = getResourceSuffix();
    setResource(`${resourcePrefix}${videoWidth}`);
  }, [windowWidth]);

  useEffect(() => {
    if (resource) return;

    const videoWidth = getResourceSuffix();
    setResource(`${resourcePrefix}${videoWidth}`);
  }, [innerWidth]);

  return (
    resource && (
      <Video poster={`${resource}.webp`} playsInline autoPlay muted loop>
        <source src={`${resource}.mp4`} type="video/mp4" />
      </Video>
    )
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
	variant,
  headerImageBgCss,
  noOverflow,
  style
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
      <PageLayout ref={ref} className={className} style={style}>
        <>
          {videoBack && <BackVideo />}
          {imageBack && <BackgroundImage headerImageBgCss={headerImageBgCss}/>}
          {overlayBack && <Overlay />}
        </>

        <Menu isOpen={menuOpen} closeMenu={closeMenu} variant={variant} />
				{defaultHeader && <Header
					openMenu={openMenu}
					white={whiteHead}
					noPadd={noPadd}
					variant={variant}
				/>}
        <Container noPadd={noPadd} noOverflow={noOverflow}>{children}</Container>
        {/* <HelpToggle containerRef={ref} /> */}
      </PageLayout>
    </>
  );
};
