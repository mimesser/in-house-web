import React from 'react';
import Link from 'next/link';
import { Hint } from '../components/organisms/QuickListForm/Hint';
import { QuickListForm, Page } from '../components/organisms';
import { BackButton, NextButton } from '../components/molecules';

import { Main, Commands } from '../components/molecules/Wizard';
import { Break, H1 } from '../components/atoms';
import { TabTitle } from '../components/organisms/Venue/tabStyle';

function BetaList() {
  const onContact = () => {
    console.log('contact us');
  };

  const onCancel = () => {
    console.log('cancel us');
  };

  return (
    <>
      <Main>
        <H1>your workspace?</H1>
        <Break />
        <Hint>
          we will only be offering this platform to essential workforces during our beta trial. please contact us if you
          like to include yours
        </Hint>
      </Main>
      <Commands>
        <Link href="/houses" passHref>
          <BackButton secondary onClick={onCancel}>
            cancel
          </BackButton>
        </Link>
        <Link href="/feedback?subjectIndex=1">
          <NextButton onClick={onContact}> contact us</NextButton>
        </Link>
      </Commands>
    </>
  );
}

export default BetaList;
