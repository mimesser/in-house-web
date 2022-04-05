import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import { Page } from '../components/organisms';
import { H1, H2, Break, ClearButton, Icon } from '../components/atoms';
import Button from '../components/atoms/Button/_index';
import { fontSize, palette, spacing, breakpoints, appColors } from '../style';
import { Footer } from '../components/organisms/Footer';

const Main = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  max-width: ${breakpoints.sm};
  color: ${palette.offWhite};
  padding: ${spacing.xxl};

  ${H2} {
    flex-grow: 1;
    margin-bottom: ${spacing.xxl};
    font-family: inherit;
  }
`;

const BackButton = styled(ClearButton).attrs({
  type: 'button',
})`
  justify-self: flex-end;
  margin-right: auto;
  padding-right: ${spacing.xl};
  font-size: ${fontSize.md};

  ${Icon} {
    margin-right: ${spacing.xxl};
    margin-left: ${spacing.xl} !important;
  }
`;

export default function About() {
  const router = useRouter();

  return (
    <Page noPadd
		title="in-house | Speak as a Team | Remain Untraceable"
		// variant="dark"
		whiteHead
		noOverflow={true}
    style={{background: appColors.secondaryBlack}}
    >
      <Main>
        <H1>org 2.0</H1>
        <Break />
        <H2 as="p">
          we are employees, employers, management and advisors. we have seen the wars, the
          conspiracy theories, the elephants in the room, and the skeletons in the closet, and we
          know that they all lead nowhere. we have seen reputations, personal opportunities, and
          cascades of profits — all lost for nothing. we believe the family that can hear each other
          will stop finding reasons to fear each other so we have no agenda beyond offering you this
          tool. we use it ourselves, we have learned to listen, and it works. we believe it is time
          for a new day … for everyone.
        </H2>
        <br />
        <br />
        <Button
            onClick={() => router.push('/houses')}
            text={'find your org'}
            style={{ backgroundColor: appColors.gray500, justifyContent: 'center', margin: 'auto' }}
            noSuffix
          />
      </Main>
      <Footer showScrollIndicator variant="darkest" />
    </Page>
  );
}
