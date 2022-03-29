import React, { useState, useEffect, useCallback, useRef } from 'react';
import { connect } from 'react-redux';

import Router, { withRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';

import { createStructuredSelector } from 'reselect';
import { Page, HowItWorks, Container } from '../components/organisms';
import { Button, H1, H2, H3, Break, Icon, ClearButton, Loader } from '../components/atoms';
import { Dropdown } from '../components/atoms/Dropdown';
import {
  spacing,
  palette,
  breakpoints,
  appColors,
  font,
  fontSize,
  device,
  onDesktop,
} from '../style';
import { version } from '../../package.json';
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

  max-width: ${breakpoints.sm};

  ${Break} {
    margin: ${spacing.lg} 0;
  }
  ${H3} {
    margin-bottom: ${spacing.lg};
    font-family: inherit;
  }
  ${H1} {
    line-height: 1em;
    margin-top: ${spacing.sm};
  }

  @media screen and (min-width: ${breakpoints.xs}) {
    ${H1} {
      line-height: inherit;
    }
    ${Break} {
      margin: ${spacing.lg} 0;
    }
    ${H3} {
      margin-bottom: ${spacing.xl};
    }
  }
`;

const MainSection = styled.section`
  padding: ${spacing.xxl};
  height: 100vh;
  min-height: 740px;
  @media screen and ${device.iPhone8} {
    widht: 100vw;
    height: 100vh;
  }

  ${Break} {
    background: none;
  }

  scroll-snap-align: start;
`;

const HowToSection = styled.section`
  widht: 100vw;
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
  width: 100vw;
  ${Container} {
    overflow: initial;
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
  const {
    votesCount,
    industry,
    name,
    rating,
    venueInfo: { imageUrl, address, city, state, zipCode } = {},
  } = venue;
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
  const filterVenues = useCallback(
    (option, inputValue) => {
      const { label, value } = option;

      if (inputValue && inputValue.length > 0)
        return (
          value.name && value.name.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase())
        );

      return undefined;
    },
    [filter, setFilter],
  );

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
    <ScrollPage whiteHead imageBack>
      <Main>
        <MainSection>
          <H1 ref={mainTitleRef}>make your voice heard</H1>
          <Break />
          <H3 as="p">let management know how they're doing, without compromise</H3>

          <form onSubmit={showVenue}>
            <Dropdown
              type="search"
              aria-label="search"
              // eslint-disable-next-line jsx-a11y/aria-props
              aria-type="search"
              isSearchable
              options={getVenues()}
              filterOption={filterVenues}
              onInputChange={(inputValue) => {
                if (inputValue && inputValue.length > 0) setFilter(inputValue);
              }}
              styles={select2Styles}
              menuColor={palette.mediumGray}
              onMenuOpen={() => onToggleMenu(true)}
              onMenuClose={() => onToggleMenu(false)}
              onChange={(option, x) => {
                console.log(option, x);
                showVenue(option.value);
              }}
              components={{
                DropdownIndicator: () => null,
                IndicatorSeparator: () =>
                  searchOpened && <Icon icon="close" color="darkGrey" size={1.2} />,
                Placeholder: () => (
                  <>
                    {!searchOpened && <Icon icon="search" color="darkGrey" size={1.2} />}{' '}
                    <Placeholder>find your org</Placeholder>
                  </>
                ),
                NoOptionsMessage: () =>
                  filter && (
                    <>
                      <NoResults />
                      <Link href="/list-workplace" prefetch={false}>
                        <ListOrg icon="arrow-right" wide>
                          list your org
                        </ListOrg>
                      </Link>
                    </>
                  ),
              }}
            />
          </form>
          <FocusHandle ref={focusRef} />
          <VersionFooter>
            <p>
              v{version}
              {process.env.REACT_APP_GIT_SHA}
            </p>
          </VersionFooter>
          <ScrollButton onClick={() => scrollMenu()}>
            <CloseIcon />
          </ScrollButton>
        </MainSection>

        <HowToSection id="howitworks">
          <HowItWorks />
        </HowToSection>

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
