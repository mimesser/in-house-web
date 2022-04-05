import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import styled from 'styled-components';

import { createStructuredSelector } from 'reselect';
import { Page, Container } from '../components/organisms';
import { H1, H3 } from '../components/atoms';
import { palette, breakpoints, appColors } from '../style';

import SectionOne from '../components/organisms/Pages/Landing/SectionOne';
import SectionTwo from '../components/organisms/Pages/Landing/SectionTwo';
import SectionThree from '../components/organisms/Pages/Landing/SectionThree';

import { Footer } from '../components/organisms/Footer';
import { initVenuesPage, selectVenues } from '../store/venues';
import { BottomSectionWrapper } from '../components/organisms/Pages/components';

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

  .player-wrapper {
    position: relative;
    padding-top: 56.25%; /* Player ratio: 100 / (1280 / 720) */
  }

  .react-player {
    position: relative;
    top: 0;
    left: 0;
  }

  @media screen and (min-width: ${breakpoints.xs}) {
    ${H1} {
      line-height: 24px;
      font-size: 40px;
    }
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

  useEffect(() => {
    if (selectedValue)
      Router.push(`/houses?q=${selectedValue}`, `/houses?q=${selectedValue}`, { shallow: true });
  }, [selectedValue]);

  return (
    <>
			<ScrollPage whiteHead videoBack noPadd>
				<Main>
					<SectionOne />
          <SectionTwo />
					<SectionThree />

					<Footer showScrollIndicator variant="darkest" />
				</Main>
			</ScrollPage>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  venues: selectVenues,
});

const mapDispatchToProps = {
  initVenuesPage,
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
