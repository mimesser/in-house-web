import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import Link from 'next/link';
import styled, { keyframes, css } from 'styled-components';

import { createStructuredSelector } from 'reselect';
import { Page, HowItWorks, Container } from '../components/organisms';
import { H1, H2, H3, Icon, ClearButton, TransparentLinkStyle } from '../components/atoms';
import { Dropdown } from '../components/atoms/Dropdown';
import { spacing, palette, breakpoints, appColors, font, device, appBackground } from '../style';
import { BetaLink, BetaDesc } from '../components/organisms/BetaChallange';

import { Footer } from '../components/organisms/Footer';

import { initVenuesPage, selectVenues } from '../store/venues';

const CurrentSize = styled.div`
  position: fixed;
  // color: #000;

  &::after {
    @media (min-width: ${breakpoints.xs}) {
      content: 'xs';
    }

    @media (min-width: ${breakpoints.sm}) {
      content: 'sm';
    }

    @media (min-width: ${breakpoints.md}) {
      content: 'md';
    }

    @media (min-width: ${breakpoints.lg}) {
      content: 'lg';
    }

    @media (min-width: ${breakpoints.xl}) {
      content: 'xl';
    }
  }
`;

const verticalHeight = css`
  min-height: calc(100vh - 72px);

  @media (min-width: ${breakpoints.md}) {
    height: calc(100vh - 66px);
  }
`;

const notificationBgCSS = css`
  background-repeat: no-repeat;
  background-size: cover;
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

const Main = styled.div`
  position: relative;
  color: ${palette.offWhite};

  padding: 0;
  display: block;

  ${H3} {
    font-family: inherit;
  }
  ${H1} {
    line-height: 24px;
    font-size: 24px;
  }
  li {
    margin: 0 0 0px 0;
  }

  @media screen and (min-width: ${breakpoints.xs}) {
    ${H1} {
      line-height: 24px;
      font-size: 40px;
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  min-height: 70vh;

  ${H1}:nth-child(1) {
    line-height: 1;
  }

  ${H1}:nth-child(2) {
    line-height: 1.2;
  }

  @media (min-width: ${breakpoints.lg}) {
    min-height: 40vh;
    flex-direction: row;
    align-items: center;
  }
`;

const Links = styled.div`
  a {
    ${TransparentLinkStyle};

    &:not(:last-child) {
      padding-right: ${spacing.lg};
    }
  }
`;

const SocialLink = ({ href, icon }) => (
  <a href={href} rel="noopener noreferrer" target="_blank">
    <Icon icon={icon} size={35 / 16} />
  </a>
);

const socialLinks = [
  {
    icon: 'facebook',
    href: 'https://www.facebook.com/iH.movement/',
  },
  {
    icon: 'twitter',
    href: 'https://twitter.com/iH_movement',
  },
  {
    icon: 'linkedin',
    href: 'https://www.linkedin.com/company/in-house6',
  },
  {
    icon: 'instagram',
    href: 'https://www.instagram.com/iH.movement/',
  },
];

const WhiteSection = styled.section`
  background: ${appBackground};
  display: flex;
  flex-direction: column;
  color: ${palette.primary};
  padding: ${spacing.xxxl} 0;

  ${H1} {
    ${font.bold};
    font-size: 38px;
    text-align: center;
  }
  ${H2} {
    ${font.bold};
    font-size: 30px;
    text-align: center;
  }
  ${H3} {
    ${font.bold};
    font-size: 24px;
    text-align: center;
    width: 160px;
    margin: 0 auto;
  }

  ${H1}:nth-child(2),
  > ${H2} {
    color: ${palette.gray};
  }

  ${H2}:nth-child(1) {
    padding: ${spacing.xxxl} 0;
  }
`;

const Bounce = keyframes`
  0%, 7%, 21%, 100% {
    opacity: 0.4;
  }

  10%, 18% {
    opacity: 1;
  }
`;
const LongBounce = keyframes`
  0%, 25%, 100% {
    opacity: 0.4;
  }

  10%, 20% {
    opacity: 1;
  }
`;

const MainSection = styled.section`
  ${verticalHeight}
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  ul {
    margin: 0;
    list-style-type: none;
    color: ${palette.lightGray};

    li {
      ${H1} {
        ${font.bold};
      }

      animation: ${Bounce} 26s infinite ease-in-out both;
      ${({ orgFocus }) => orgFocus && 'animation: none;'}
      transition: transform 1s;

      &:first-child {
        animation-delay: 0s;
      }
      &:nth-child(2) {
        animation-delay: 2s;
      }
      &:nth-child(3) {
        animation-delay: 4s;
      }
      &:nth-child(4) {
        animation-delay: 6s;
      }
      &:nth-child(5) {
        animation-delay: 8s;
      }
      &:nth-child(6) {
        animation-delay: 10s;
      }
      &:nth-child(7) {
        animation-delay: 12s;
      }
      &:nth-child(8) {
        animation-delay: 14s;
      }
      &:nth-child(9) {
        animation-delay: 16s;
      }
      &:nth-child(10) {
        animation-delay: 18s;
      }
      &:nth-child(11) {
        animation-delay: 20s;
      }
      &:last-child {
        animation-delay: 22s;
        ${({ orgFocus }) => orgFocus && 'transform: translateY(-60vh);'}
      }
      &:last-child:focus {
        font-size: 50px;
      }
      &:not(:last-child) {
        ${({ orgFocus }) => orgFocus && 'transform: translateY(-60vh) scaleY(0);'}
      }
    }
  }

  @media (min-width: ${breakpoints.xs}) {
    ${H1} {
      font-size: 24px;
    }

    ul {
      padding: 0 ${spacing.xl};

      li:not(:last-child) {
        padding-bottom: ${spacing.sm};
      }
    }
  }

  @media (min-width: ${breakpoints.sm}) {
    ${H1} {
      font-size: 28px;
    }

    ul {
      padding: 0 ${spacing.xxl};

      li:not(:last-child) {
        padding-bottom: ${spacing.md};
      }
    }
  }

  @media (min-width: ${breakpoints.md}) {
    ${H1} {
      font-size: 32px;
    }

    ul {
      padding: 0 ${spacing.xxl};

      li:not(:last-child) {
        padding-bottom: ${spacing.lg};
      }
    }
  }

  @media (min-width: ${breakpoints.lg}) {
    ul {
      padding: 0 ${spacing.xxl};
    }
  }

  @media (min-width: ${breakpoints.xl}) {
    ${H1} {
      font-size: 36px;
    }

    ul {
      padding: 0 ${spacing.xxxl};
    }
  }

  scroll-snap-align: start;
`;

const NotificationSection = styled.div`
  ${notificationBgCSS}
  min-height: 100vh;
  padding: ${spacing.xxxl} ${spacing.lg};

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${H1} {
    ${font.bold};
    font-size: 40px;
    line-height: 1;
    color: ${palette.mediumGray};
  }
  ${BetaDesc} {
    font-size: 16px;
    color: ${palette.gray};
    width: 85%;
  }
  ${BetaLink} {
    margin: ${spacing.xl} 0;
  }

  @media (min-width: ${breakpoints.md}) {
    padding: ${spacing.xxxl} ${spacing.xxl};

    ${BetaDesc} {
      width: 50%;
    }
  }

  @media (min-width: ${breakpoints.lg}) {
    div:nth-child(1) {
      width: ${breakpoints.sm};
      margin: 0 auto;
    }

    ${BetaDesc} {
      width: 70%;
    }
  }
`;

const HowToSection = styled.section`
  min-height: 100vh;
  background: ${appColors.midnight};
  display: flex;
  scroll-snap-align: start;
  padding: 0 ${spacing.xl};

  @media (min-width: ${breakpoints.md}) {
    height: auto;
    padding: ${spacing.xxxl} ${spacing.xxl};
  }
`;

const ScrollPage = styled(Page)`
  scroll-snap-type: y proximity;
  scroll-padding: 50%;
  background-color: ${appColors.midnight};
  ${Container} {
    overflow: initial;
    margin: 0;
  }
`;

const ScrollButton = styled(ClearButton)`
  padding: 40px;
  align-self: center;
`;

const CloseIcon = styled(Icon).attrs(() => ({
  icon: 'angle-down',
}))`
  width: 24px;
  height: 24px;
  :hover {
    color: ${palette.white};
  }
`;

const Landing = ({ venues, initVenuesPage }) => {
  const scrollMenu = (id = 'howitworks') => {
    setTimeout(() => {
      const duration = 1600;
      const target = document.getElementById(id);

      if (target) {
        const { top: diff } = target.getBoundingClientRect();
        const startPos = window.pageYOffset;

        let startTime = null;
        let requestId;

        const loop = (currentTime) => {
          if (!startTime) {
            startTime = currentTime;
          }

          const time = currentTime - startTime;

          const percent = Math.min(time / duration, 1);
          window.scrollTo(0, startPos + diff * percent);

          if (time < duration) {
            requestId = window.requestAnimationFrame(loop);
          } else {
            window.cancelAnimationFrame(requestId);
          }
        };
        requestId = window.requestAnimationFrame(loop);
      }
    }, 300);
  };

  useEffect(() => {
    initVenuesPage();
  }, []);

  const [orgFocus, setOrgFocus] = useState(false);

  useEffect(() => {
    if (orgFocus) scrollMenu('header');
  }, [orgFocus]);

  const [selectedValue, setSelectedValue] = useState('');
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    if (selectedValue) Router.push(`/houses?q=${selectedValue}`, `/houses?q=${selectedValue}`, { shallow: true });
  }, [selectedValue]);

  return (
    <ScrollPage whiteHead videoBack noPadd>
      <Main>
        {/* <CurrentSize /> */}
        <MainSection orgFocus={orgFocus}>
          <ul>
            <li>
              <H1>it's time for the team</H1>
            </li>
            <li>
              <H1>to be able to speak</H1>
            </li>
            <li>
              <H1>honestly with leadership</H1>
            </li>
            <li>
              <H1>without fear of reprisal</H1>
            </li>
            <li>
              <H1>about the impact of decisions</H1>
            </li>
            <li>
              <H1>on people</H1>
            </li>
            <li>
              <H1>the planet</H1>
            </li>
            <li>
              <H1>and profits</H1>
            </li>
            <li>
              <H1>through a 100%</H1>
            </li>
            <li>
              <H1>anonymous consensus</H1>
            </li>
            <li>
              <H1>of insiders only.</H1>
            </li>
            <li>
              <Dropdown
                value={venues && venues.find((v) => v.label === selectedValue)}
                options={venues || []}
                onInputChange={(e) => setSearchValue(e)}
                onChange={(e) => e && setSelectedValue(e.name)}
                onFocus={() => setOrgFocus(true)}
                onBlur={() => setOrgFocus(false)}
                searchValue={searchValue}
              />
            </li>
          </ul>
          {!orgFocus && (
            <ScrollButton id="scrollButton" onClick={() => scrollMenu('getNotification')}>
              <CloseIcon />
            </ScrollButton>
          )}
        </MainSection>

        <HowToSection id="howitworks">
          <HowItWorks />
        </HowToSection>

        <WhiteSection>
          <H2>stop the madness</H2>

          <Wrapper>
            <div>
              <H1>93%</H1>
              <H1>leadership</H1>
              <H3>want the honest truth</H3>
            </div>
            <div>
              <H1>98%</H1>
              <H1>workers</H1>
              <H3>are too afraid to be honest</H3>
            </div>
          </Wrapper>
        </WhiteSection>

        <NotificationSection id="getNotification">
          <div>
            <Link href="/feedback?subjectIndex=1">
              <BetaLink icon="arrow-right" wide outline>
                get notified
              </BetaLink>
            </Link>
            <BetaDesc>request to be part of our beta trial for distressed workers or get notified when live</BetaDesc>
          </div>

          <Links>
            {socialLinks.map((link) => (
              // eslint-disable-next-line react/jsx-props-no-spreading
              <SocialLink {...link} key={link.icon} />
            ))}
          </Links>
        </NotificationSection>

        <Footer />
      </Main>
    </ScrollPage>
  );
};

const mapStateToProps = createStructuredSelector({
  venues: selectVenues,
});

const mapDispatchToProps = {
  initVenuesPage,
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
