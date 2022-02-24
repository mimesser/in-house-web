import React from 'react';
import styled, { css } from 'styled-components';

import { HorizontallyCenteredContainer } from '../components';
import { CTAButton } from '../../../atoms/Button/_index';
import Text from '../../../atoms/text/_index';
import Link from "next/link";

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

const PortraitImageBgCss = css`
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(static/dude_glasses.webp);
`;

const PortraitImage = styled.div`
  ${PortraitImageBgCss};
  height: 658px;
  position: relative;
`;

const StatSectionContainer = styled.div`
  width: 100%;
  margin-bottom: 60px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
`;

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
      <Link href="/join-us" style={{ margin: '0 12px' }}>
        <CTAButton text="join us" />
      </Link>
      <div
        style={{
          position: 'absolute',
          bottom: '26px',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <Text
					family="helvetica"
					color="gray300"
					weight="bold"
					size={36}
					variant="light"
				>
          the world literally wants to know
        </Text>
      </div>
    </PortraitImage>

    <div style={{ background: '#111', paddingTop: '34px' }}>
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
      <Link href="/join-us" style={{ margin: '0 12px' }}>
        <CTAButton text="join us" />
      </Link>
    </div>
  </>
);

export default SectionTwo;
