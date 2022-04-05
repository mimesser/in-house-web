import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import { BottomSectionWrapper, HorizontallyCenteredContainer } from '../components';
import { CTAButton } from '../../../atoms/Button/_index';
import Text from '../../../atoms/text/_index';
import { appColors, device } from '../../../../style';

const GrayCircle = styled.div`
  width: 26px;
  height: 26px;
  background: ${appColors.gray400};
  margin-top: 90px;
  margin-bottom: 50px;
  border-radius: 50%;
  align-self: center;
`;

const features = [
  {
    header: 'control the top ‘mink’',
    description:
      'a motivated team can out-vote everyone else to select the question that everyone else must be able to answer to be verified as an insider. just create and vote-up questions that only your teammates will know',
    image: "url('static/image1.webp')",
  },
  {
    header: 'address everything safely',
    description:
      'speak and vote in consensus on every issue so everyone in your team can see what matters and by how much. the result is a comprehensive digital nervous system connecting everyone in real time around the real issues that matter.',
    image: "url('static/image2.webp')",
  },
  {
    header: 'promote accountability',
    description:
      'rate individual subjects with one tap to generate universal E.S.G. scores and show the world how your company treats people, the planet, and its profits.',
    image: "url('static/image3.webp')",
  },
];

const FeatureText = styled.div`
  padding: 40px;
  flex: 1;
  min-width: 240px;
  @media ${device.tab} {    
    order: ${({ order }) => `${order}`};
  }
`;
const FeatureBlock = ({ header, description, image, order }) => (
  <div 
    style={{
      display: 'flex',
      alignItems: 'center',
      flexWrap:'wrap',
      padding: '60px 0',
    }}>
    
    <FeatureText
      order={order}
    >
      <Text
				color="gray300"
				family="helvetica"
				weight="bold"
				size={36}
				variant="light"
			>
        {header}
      </Text>
      <div
        style={{
          marginTop: '12px',
        }}
      >
        <Text
					color="gray400"
					family="helvetica"
					weight="reg"
					size={20}
					variant="dark"
				>
          {description}
        </Text>
      </div>
    </FeatureText>

    <div
      style={{
        padding: '0 12px',
        height: '638px',
        backgroundImage: image,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPositionY: 'center',
        flex: 2,
        minWidth: '375px',
      }}
    >
    </div>
  </div>
);

const ResponsiveText = styled(Text)`
	font-size: 36px;

	@media ${device.mobile} {
		font-size: 36px;
    max-width: 295px;
	}
	@media ${device.tab} {
		font-size: 45px;
    max-width: 640px;
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
const SectionThree = () => (
  <>
    <div style={{ background: '#111' }}>
      <HorizontallyCenteredContainer
				align="center"
				style={{ paddingTop: '60px', maxWidth:'1200px', alignItems: 'center'}}
			>
        <ResponsiveText
          text="your team runs the show"
          color="gray100"
          variant="light"
          weight="bold"
          family="helvetica"
          maxWidth="1000px"
          size={36}
        />
      </HorizontallyCenteredContainer>
      <BottomSectionWrapper>
        {features.map(({ header, description, image }, index) => (
          <FeatureBlock
            header={header}
            description={description}
            key={index}
            order={index % 2}
            image={image}
          />
        ))}      
      </BottomSectionWrapper>
      <div style={{ textAlign: 'center', paddingBottom: '60px'}}> 
        <Link href={`/join-us`}>
          <CTAButton text="join us" />
        </Link>
      </div>
    </div>
  </>
);

export default SectionThree;
