import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import { Page } from '../components/organisms';
import { ClearButton, Icon } from '../components/atoms';
import Button from '../components/atoms/Button/_index';
import { fontSize, spacing, appColors, mobileWidth, desktopWidth } from '../style';
import { Footer } from '../components/organisms/Footer';
import {
  HorizontalBar,
  ResponsiveText,
  ResponsiveTextHeading,
} from '../components/organisms/Pages/components';

const Main = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  max-width: 100%;
  row-gap: 30px;
  padding: 80px 0 120px;
  color: ${appColors.gray100};

  @media (min-width: ${desktopWidth.sm}) {
    max-width: 732px;
  }
`;

export default function About() {
  const router = useRouter();

  return (
    <Page
      noPadd
      title="in-house | Speak as a Team | Remain Untraceable"
      // variant="dark"
      whiteHead
      noOverflow={true}
      style={{ background: appColors.secondaryBlack }}
    >
      <Main>
        <ResponsiveTextHeading
          level={1}
          text="org 2.0"
          size={32}
          lineHeight={39}
          smSize={54}
          smLineHeight={66}
          color={appColors.gray100}
        />
        <HorizontalBar />
        <ResponsiveText
          color={appColors.gray300}
          size={16}
          lineHeight={24}
          mdSize={20}
          mdLineHeight={28}
        >
          we are employees, employers, management and advisors. we have seen the wars, the
          conspiracy theories, the elephants in the room, and the skeletons in the closet, and we
          know that they all lead nowhere. we have seen reputations, personal opportunities, and
          cascades of profits — all lost for nothing. we believe the family that can hear each other
          will stop finding reasons to fear each other so we have no agenda beyond offering you this
          tool. we use it ourselves, we have learned to listen, and it works. we believe it is time
          for a new day … for everyone.
        </ResponsiveText>
        <Button
          onClick={() => router.push('/houses')}
          text={'find your org'}
          style={{
            backgroundColor: appColors.gray500,
            justifyContent: 'center',
            maxWidth: '351px',
          }}
          noSuffix
        />
      </Main>
      <Footer showScrollIndicator variant="darkest" />
    </Page>
  );
}
