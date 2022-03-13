import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import { HorizontallyCenteredContainer } from '../components';
import { CTAButton } from '../../../atoms/Button/_index';
import Text from '../../../atoms/text/_index';
import { appColors } from '../../../../style';

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

const FeatureBlock = ({ header, description, image }) => (
  <div
    style={{
      padding: '0 12px',
      height: '638px',
      backgroundImage: image,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    }}
  >
    <div
      style={{
        paddingTop: '18px',
        borderTop: `1px solid ${appColors.gray400}`,
      }}
    >
      <Text
				color="gray300"
				family="helvetica"
				weight="bold"
				size={24}
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
					size={18}
					variant="dark"
				>
          {description}
        </Text>
      </div>
    </div>
  </div>
);

const SectionThree = () => (
  <>
    <div style={{ background: '#111' }}>
      <HorizontallyCenteredContainer>
        <GrayCircle />
      </HorizontallyCenteredContainer>

      <HorizontallyCenteredContainer
				align="center"
				style={{ marginBottom: '62px' }}
			>
        <Text
          text="your team runs the show"
          color="gray400"
          variant="dark"
          weight="bold"
          family="helvetica"
          size={36}
        />
      </HorizontallyCenteredContainer>

      {features.map(({ header, description, image }, index) => (
				<FeatureBlock
					header={header}
					description={description}
					key={index}
					image={image}
				/>
      ))}
    </div>
    <div style={{ background: '#111', margin: '0', padding: '12px' }}> 
			<Link href={`/join-us`}>
				<CTAButton text="join us" />
			</Link>
    </div>
  </>
);

export default SectionThree;
