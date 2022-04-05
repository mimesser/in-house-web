import React from 'react';
import styled, { css } from 'styled-components';
import Link from 'next/link';

import { HorizontallyCenteredContainer } from '../components';
import { CTAButton } from '../../../atoms/Button/_index';
import Text from '../../../atoms/text/_index';
import { device } from '../../../../style';

const stats = [
  {
    header: '85%',
    subHeader: 'of consumers',
    description: 'want to support sustainable companies but don’t know which is which',
    source: '*(business wire, 2021)',
  },
  {
    header: '86%',
    subHeader: 'of investors',
    description:
      '(& 95% of millennial investors) beleive sustainable companies yield greater profits',
    source: '*(morgan stanley, 2020)',
  },
  {
    header: '93%',
    subHeader: 'of leadership',
    description: 'want to hear the honest truth but can’t get their teams to talk',
    source: '*(internal surveys, 2019)',
  },
  {
    header: '98%',
    subHeader: 'of workers',
    description: 'want to address problems and know what their co-workers think',
    source: '*(internal surveys, 2019)',
  },
];
 
// Take media query here
const PortraitImageBgCss = css`
  background-repeat: no-repeat;
  background-size: cover;
  background-position-y: center;
  background-position-x: center; 
  background-image: url(static/dude_glasses.webp);
	@media ${device.mobile} {
    background-image: url(https://in-house.azureedge.net/webstatic/landing_main/dude_glasses-375.jpg);
	}
	@media ${device.tab} {
    background-image: url(static/dude_glasses.webp);
	}
	@media ${device.web} {
    background-image: url(static/dude_glasses.webp);
	}
	@media ${device.laptop} {
    background-image: url(static/dude_glasses.webp);
	}
	@media ${device.desktop} {
    background-image: url(https://in-house.azureedge.net/webstatic/landing_main/dude_glasses-1920.jpg);
    padding: 0 277px;
  }
`;

const PortraitImage = styled.div`
  ${PortraitImageBgCss};
  position: relative;
  min-height: 1280px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-top: 120px;
`;

const StatSectionContainer = styled.div`
  width: 320px;
  margin-bottom: 60px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
`;

const FlexContainer = styled.div`
	display: flex;
	justify-content: space-evenly;
	align-items: start;
	flex-wrap: wrap;
`;

const ResponsiveText = styled(Text)`
	font-size: 36px;

	@media ${device.mobile} {
		font-size: 36px;
	}
	@media ${device.tab} {
		font-size: 45px;
	}
	@media ${device.web} {
		font-size: 54px;
	}
	@media ${device.laptop} {
		font-size: 54px;
	}
	@media ${device.desktop} {
		font-size: 54px;
	}
`
export const StatSection = ({
	header,
	subHeader,
	description,
	source,
	descriptionMaxWidth
}) => (
  <StatSectionContainer>
    <HorizontallyCenteredContainer>
      <Text
        text={header}
        variant="light"
        color="gray300"
        weight="reg"
        family="helvetica"
        size={72}
      />
    </HorizontallyCenteredContainer>

    <HorizontallyCenteredContainer style={{ marginBottom: '6px' }}>
      <Text
        text={subHeader}
        variant="light"
        color="gray300"
        weight="bold"
        family="helvetica"
        size={32}
      />
    </HorizontallyCenteredContainer>

    <HorizontallyCenteredContainer
			style={{
				marginBottom: '12px',
				maxWidth: descriptionMaxWidth
			}}>
      <Text
        text={description}
        variant="dark"
        color="gray400"
        weight="reg"
        family="helvetica"
        size={16}
      />
    </HorizontallyCenteredContainer>

    <HorizontallyCenteredContainer>
      <Text
        text={source}
        variant="dark"
        color="gray400"
        weight="reg"
        family="helvetica"
        size={14}
      />
    </HorizontallyCenteredContainer>
  </StatSectionContainer>
);

const SectionTwo = () => (
  <>
    <PortraitImage>
    <div
        style={{
          bottom: '26px',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          textAlign: 'center',
          minHeight: '1000px',
        }}
      ></div>
      <div
        style={{
          bottom: '26px',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <ResponsiveText
					family="helvetica"
					color="gray300"
					weight="bold"
					size={36}
					variant="light"
				>
          the world literally wants to know
        </ResponsiveText>
      </div>
      
      <div style={{ paddingTop: '34px' }}>
        <FlexContainer>
          {stats.map((section, index) => (
            <StatSection
              header={section.header}
              subHeader={section.subHeader}
              description={section.description}
              source={section.source}
              key={index}
              descriptionMaxWidth="286px"
            />
          ))}
        </FlexContainer>
        <div style={{ textAlign: 'center' , marginBottom: '60px'}}>
          <Link href={`/join-us`}>
            <CTAButton text="join us" />
          </Link>
        </div>
      </div>
    </PortraitImage>
  </>
);

export default SectionTwo;
