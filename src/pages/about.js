import React from 'react';
import styled from 'styled-components';

import { Page, HowItWorks } from '../components/organisms';
import { H1, H2, Break } from '../components/atoms';
import { palette, spacing } from '../style';

const Main = styled.div`
  position: relative;
  color: ${palette.offWhite};

  padding: ${spacing.xxl};
  display: flex;
  flex-direction: column;
  flex: 1;

  // ${H1} {
  //   margin-top: ${spacing.xl};
  // }
  // ${Break} {
  //   margin: ${spacing.xxl} 0;
  // }
  ${H2} {
    margin-bottom: ${spacing.xxl};
  }
`;

const Links = styled.div`
  margin: auto 0;
`;

const About = () => (
  <Page whiteHead videoBack>
    <Main>
      <H1>about</H1>
      <Break />
      <H2 as="p">
        we are employees, employers, management and advisors. we have seen the wars, the conspiracy theories, the
        elephants in the room, and the skeletons in the closet, and we know that they all lead nowhere. we have seen
        reputations, personal opportunities, and cascades of profits — all lost for nothing. we believe the family that
        can hear each other will stop finding reasons to fear each other so we have no agenda beyond offering you this
        tool. we use it ourselves, we have learned to listen, and it works. we believe it is time for a new day … for
        everyone.
      </H2>
      <Links>
        <HowItWorks />
      </Links>
    </Main>
  </Page>
);

export default About;