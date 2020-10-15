import React, { useState, useEffect, useCallback, useRef } from 'react';
import { connect } from 'react-redux';

import Router, { withRouter } from 'next/router';
import Link from 'next/link';
import styled, { keyframes, css } from 'styled-components';

import { createStructuredSelector } from 'reselect';
import { Page, HowItWorks, Container } from '../components/organisms';
import { Button, H1, H2, H3, Break, Icon, ClearButton, TransparentLinkStyle, Loader } from '../components/atoms';
import {
  spacing,
  palette,
  breakpoints,
  appColors,
  font,
  fontSize,
  device,
  onDesktop,
  appBackground,
  mobileHeight,
  mobileWidth,
} from '../style';
import { version } from '../../package.json';
import { BetaLink, BetaDesc } from '../components/organisms/BetaChallange';

import { Footer } from '../components/organisms/Footer';

import {
  selectInsiderChallengeForm,
  selectVenues,
  selectPolls,
  selectSelectedPoll,
  initVenuesPage,
  selectLoadingVenues,
} from '../store/venues';
import { selectEsgCategories, loadAggregateData } from '../store/aggregate';

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
  0%, 17%, 100% {
    opacity: 0.4;
  }

  10%, 12% {
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

      animation: ${Bounce} 13.2s infinite ease-in-out both;

      &:first-child {
        animation-delay: 1.2s;
      }
      &:nth-child(2) {
        animation-delay: 2.4s;
      }
      &:nth-child(3) {
        animation-delay: 3.6s;
      }
      &:nth-child(4) {
        animation-delay: 4.8s;
      }
      &:nth-child(5) {
        animation-delay: 6s;
      }
      &:nth-child(6) {
        animation-delay: 7.2s;
      }
      &:nth-child(7) {
        animation-delay: 8.4s;
      }
      &:nth-child(8) {
        animation: ${LongBounce} 13.2s infinite ease-in-out both;
        animation-delay: 9.6s;
      }
      &:nth-child(9) {
        animation-delay: 12s;
      }
      &:nth-child(10) {
        animation-delay: 13.2s;
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

const VersionFooter = styled.footer`
  position: absolute;
  right: 20px;
  top: 70vh;
  ${onDesktop(`top: 85vh`)};

  text-align: right;
  color: ${palette.lightGray};
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
  margin-top: -110px;
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

const VenueLine = styled.div.attrs(({ venue }) => {
  const { votesCount, industry, name, rating, venueInfo: { imageUrl, address, city, state, zipCode } = {} } = venue;
  return {
    children: (
      <>
        <H3>{name}</H3>
        <address>{address}</address>

        <Icon icon="winky-circle" color="darkGrey" size={1.2} />
      </>
    ),
  };
})`
  display: flex;
  justify-content: space-between
  background-color: ${palette.text};
  background: ${palette.text};
  width: 100%;
  height: 35px;
  margin:0;
  padding: ${spacing.sm};x
  align-items: baseline;

  align-items: flex-start;
  ${H3} {
    ${font.bold};
    font-size: ${fontSize.sm};
    color: ${palette.lightGray};

    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    height: 100%;
    line-height: ${fontSize.md};
    margin-right: ${spacing.sm};
  }
  address {
    color: ${palette.mediumGray};
    font-size: ${fontSize.xs};
    flex-grow: 1;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    text-align: left;
    vertical-align: middle
    height: 100%;
    line-height: ${fontSize.md};
  }
  ${Icon} {

    min-width: 30px;
    right: 0;
    float: right;
    margin-left: auto;
    align-items: flex-end;
  }
`;

const ListOrg = styled(Button)`
  ${font.primary};
  background: ${palette.gray4};

  margin-top: ${spacing.xs};
  min-height: ${spacing.md};
  border: none;
`;

const FocusHandle = styled.div`
  margin-top: -100px;
`;
const Placeholder = styled.span`
  color: ${palette.lightGray};
  margin-left: ${spacing.sm};
  margin-right: -95%;
`;
const NoResults = styled.span.attrs(() => ({
  children: 'no results',
}))`
  color: ${appColors.gray4};
  margin: ${spacing.sm};
  padding-top: ${spacing.md};
`;
const Landing = ({ venues, loading, categories, initVenuesPage, loadAggregateData }) => {
  const [videoReady, setVideoReady] = useState(false);
  const [filter, setFilter] = useState(false);
  const onVideoReady = () => {
    setVideoReady(true);
  };

  const [searchOpened, setSearchOpened] = useState(false);
  const showVenue = useCallback(
    (venue) => {
      console.log('show:', { venue, filter });
      const filterValue = filter || '';
      const query = venue && venue.name ? venue.name : filterValue;
      Router.push(`/houses?q=${query}`, `/houses?q=${query}`, { shallow: true });
    },
    [filter],
  );

  const scrollMenu = (id = 'howitworks') => {
    console.log('# scroll menu');
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  useEffect(() => {
    loadAggregateData();
    initVenuesPage();
  }, [loading]);

  const getVenues = () => {
    if (loading) {
      return [{ label: <Loader big />, value: 'loading' }];
    }

    return venues.map((v, i) => {
      return { label: <VenueLine venue={v} />, value: v };
    });
  };
  // const filterVenues = useCallback(
  // (option, inputValue) => {
  // const { label, value } = option;

  // if (inputValue && inputValue.length > 0)
  // return value.name && value.name.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase());
  // },
  // [filter, setFilter],
  // );

  const select2Styles = {
    option: (provided, state) => ({
      ...provided,
      bockground: palette.mediumGray,
      margin: '2px',
      padding: '0px',
    }),
    control: (styles) => ({
      ...styles,
      ...{
        margin: '0px',
        padding: '0px',
      },
    }),
    container: (styles) => ({
      ...styles,

      margin: '0px',
      padding: '0px',
    }),
    menuList: (styles) => ({
      ...styles,
      margin: '0px',
      padding: '0px',
    }),
    valueContainer: (styles) => ({
      ...styles,
      margin: '0px',
      padding: '0px',
      paddingLeft: '10px',
    }),
  };

  const focusRef = useRef(null);
  const mainTitleRef = useRef(null);
  const onToggleMenu = useCallback(
    (value) => {
      setSearchOpened(value);

      setTimeout(() => {
        const ref = value ? focusRef : mainTitleRef;
        if (ref && ref.current) {
          ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        if (!value && filter && filter.length > 0) {
          // on menu close open houses
          showVenue(false);
        }
      }, 100);
    },
    [focusRef, mainTitleRef, filter],
  );
  return (
    <ScrollPage whiteHead videoBack noPadd>
      <Main>
        {/* <CurrentSize /> */}
        <MainSection id="mainSection">
          <ul>
            <li delay={0.1 * 1}>
              <H1>it’s time for the team</H1>
            </li>
            <li delay={0.1 * 2}>
              <H1>to be able to speak</H1>
            </li>
            <li delay={0.1 * 3}>
              <H1>and use the power of numbers</H1>
            </li>
            <li delay={0.1 * 4}>
              <H1>to hold leadership accountable</H1>
            </li>
            <li delay={0.1 * 5}>
              <H1>100% anonymously</H1>
            </li>
            <li delay={0.1 * 6}>
              <H1>on the environment</H1>
            </li>
            <li delay={0.1 * 7}>
              <H1>on public policy</H1>
            </li>
            <li delay={0.1 * 8}>
              <H1>and on the dignity of workers</H1>
            </li>
            <li delay={0.1 * 9}>
              <H1>whose world?</H1>
            </li>
            <li delay={0.1 * 10}>
              <H1>our world.</H1>
            </li>
          </ul>
          <ScrollButton id="scrollButton" onClick={() => scrollMenu('getNotification')}>
            <CloseIcon />
          </ScrollButton>
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
            <H1 ref={mainTitleRef}>30 00 00 00</H1>
            <Link href="/feedback">
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
  categories: selectEsgCategories,
  loading: selectLoadingVenues,
});

const mapDispatch = {
  initVenuesPage,
  loadAggregateData,
};
export default connect(mapStateToProps, mapDispatch)(Landing);
