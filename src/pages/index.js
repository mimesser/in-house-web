import React, { useState, useEffect, useCallback, useRef } from 'react';
import { connect } from 'react-redux';

import Router, { withRouter } from 'next/router';
import Link from 'next/link';
import styled, { keyframes } from 'styled-components';

import { createStructuredSelector } from 'reselect';
import { Page, HowItWorks, Container, BackgroundImage } from '../components/organisms';
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

const Main = styled.div`
  position: relative;
  color: ${palette.offWhite};

  padding: 0;
  display: block;

  // max-width: ${breakpoints.sm};

  ${Break} {
    margin: ${spacing.lg} 0;
  }
  ${H3} {
    margin-bottom: ${spacing.lg};
    font-family: inherit;
  }
  ${H1} {
    line-height: 1em;
    margin-top: ${spacing.md};
    font-size: 24px;
  }

  @media screen and (min-width: ${breakpoints.xs}) {
    ${H1} {
      line-height: inherit;
      font-size: 40px;
    }
    ${Break} {
      margin: ${spacing.lg} 0;
    }
    ${H3} {
      margin-bottom: ${spacing.xl};
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  bottom: -10%;
  div {
    width: 100%;
    max-width: 254px;
    text-align: center;
    margin 0 auto;
    // line-height: 2em;

    ${H3} {
      font-size: 28px;
      margin: 4px 21px;
    }
  }
  width: 100%;
  height: 250px;
  margin: auto 0;
  ${H1}, ${H3} {
    color: ${palette.primary};
    margin-top: ${spacing.sm};
    margin: 0;
    padding: 0;
  }
`;

const Links = styled.div`
  margin-top: auto;
  bottom: ${spacing.md};
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  > a {
    ${TransparentLinkStyle};

    :last-of-type {
      margin-top: ${spacing.sm};
    }
    /*
      anything that's not really small
      TODO: page should be designed properly, and no hard-coded '400px'
    */
    @media screen and (min-width: 400px) {
      :last-of-type {
        margin-top: ${spacing.lg};
      }
    }
  }
  > section {
    margin-top: ${spacing.xxxl};
    width: 100%;
  }

  > div {
    margin-top: ${spacing.xl};
    /*
      anything that's not really small
      TODO: page should be designed properly, and no hard-coded '400px'
    */
    @media screen and (min-width: 400px) {
      margin-top: ${spacing.xxxl};
      :last-of-type {
        margin-top: 80px;
      }
    }
    > a {
      margin-right: ${spacing.lg};
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
  color: ${palette.mediumGray};
  padding: ${spacing.xl} ${spacing.xxxl};

  ${Wrapper} {
    display: flex;
    width: 100%;
  }
  @media (max-width: ${breakpoints.sm}) {
    ${Wrapper} {
      display: block;
      width: 100%;
    }
  }

  ${H1} {
    ${font.bold};
    font-size: 52px;
    text-align: center;
  }
  ${H2} {
    ${font.bold};
    font-size: 33px;
    text-align: center;
  }
  ${H3} {
    ${font.bold};
    font-size: 46px;
    text-align: center;
    padding: ${spacing.xxxl} 0;
  }
`;

const CenteredLayout = styled.div`
  max-width: ${breakpoints.md};
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  top: -100%;

  padding: ${spacing.xxl};
  padding-top: ${spacing.xxxl};
  color: ${palette.lightGray};

  ${Break} {
    background: none;
  }
`;

const Bounce = keyframes`
  0%, 40%, 100% {
    opacity: 0.4;
  } 20% {
    opacity: 1;
  }
`;

const MainSection = styled.section`
  display: flex;
  align-items: center;
  margin: 0;
  height: calc(100vh - (${spacing.xl} + ${spacing.xl}));

  @media screen and ${device.iPhone8} {
    height: 100vh;
  }

  ul {
    // padding-top: ${spacing.xxxl};
    list-style-type: none;
    color: ${palette.lightGray};
    li {
      animation: ${Bounce} 5s infinite ease-in-out both;

      &:first-child {
        animation-delay: 0.5s;
      }
      &:nth-child(2) {
        animation-delay: 1s;
      }
      &:nth-child(3) {
        animation-delay: 1.5s;
      }
      &:nth-child(4) {
        animation-delay: 2s;
      }
      &:nth-child(5) {
        animation-delay: 2.5s;
      }
      &:nth-child(6) {
        animation-delay: 3s;
      }
      &:nth-child(7) {
        animation-delay: 4s;
      }
      &:nth-child(8) {
        animation-delay: 4.5s;
      }
      &:nth-child(9) {
        animation-delay: 5s;
      }
      &:nth-child(10) {
        animation-delay: 6s;
      }
    }
  }
  @media (max-width: ${breakpoints.sm}) {
    ${H1} {
      ${font.bold};
      font-size: 26px;
    }
    ${H2} {
      ${font.bold};
      font-size: 16px;
    }
    ${H3} {
      ${font.bold};
      font-size: 24px;
    }
    ul {
      padding-top: 25 px;
    }
  }
  scroll-snap-align: start;
`;

const NotificationSection = styled(MainSection)`
  ${H1} {
    ${font.bold};
    font-size: 56px;
    margin-top: 64px;
    color: ${palette.mediumGray};
  }
  ${H3} {
    font-size: 24px;
    margin-top: 64px;
    color: ${palette.gray4};
  }
  ${BetaDesc} {
    margin-top: ${spacing.xl};
    font-size: 18px;
    color: ${palette.gray4};
  }
  ${BackgroundImage} {
    position: relative;
    height: 100vh;
  }
`;

const HowToSection = styled.section`
  background: ${appColors.midnight};
  display: flex;
  align-items: center;
  height: 100vh;
  scroll-snap-align: start;
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
  ${Container} {
    overflow: initial;
    margin: 0;
  }
`;

const ScrollButton = styled(ClearButton)`
  position: absolute;
  width: auto;
  top: 70vh;
  ${onDesktop(`top: 85vh`)};

  margin-left: 40%;
  width: 10%;
  margin-right: 40%;
  padding: 0;
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
    }, 0);
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
        <MainSection>
          <div>
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
                <H1>our world</H1>
              </li>
            </ul>
          </div>
          <ScrollButton onClick={() => scrollMenu('getNotification')}>
            <CloseIcon />
          </ScrollButton>
        </MainSection>

        <HowToSection id="howitworks">
          <HowItWorks />
        </HowToSection>

        <WhiteSection>
          <H3>stop the madness</H3>

          <Wrapper>
            <div>
              <H1>93%</H1>
              <H2>leadership</H2>
              <H3>want the honest truth</H3>
            </div>
            <div>
              <H1>98%</H1>
              <H2>workers</H2>
              <H3>are too afraid to be honest</H3>
            </div>
          </Wrapper>
        </WhiteSection>

        {/* <NotificationSection id="getNotification">
          <BackgroundImage />

          <CenteredLayout>
            <H1 ref={mainTitleRef}>90 00 00 00 </H1>
            <Break />
            <H3 as="p">hear when we’re live or request to be part of our beta trial for distressed workers</H3>

            <Link href="/feedback">
              <BetaLink icon="arrow-right" wide outline>
                get notified
              </BetaLink>
            </Link>
            <BetaDesc>100% confidential</BetaDesc>

            <Links>
              <div>
                {socialLinks.map((link) => (
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  <SocialLink {...link} key={link.icon} />
                ))}
              </div>
            </Links>
          </CenteredLayout>
        </NotificationSection> */}

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
