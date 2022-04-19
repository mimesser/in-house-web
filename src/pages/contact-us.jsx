import React from 'react';
import { withRouter } from 'next/router';
import { Footer } from '../components/organisms/Footer';

import { Page, FeedbackForm } from '../components/organisms';

function ContactUs(props) {
  const {
    query: { subjectIndex = 0, redirect = '/' },
  } = props.router;

  return (
    <Page
      noPadd
      title="in-house |  Speak as a Team | Remain Untraceable"
      whiteHead
      noOverflow={true}
      style={{ backgroundColor: '#111' }}
    >
      <FeedbackForm subjectIndex={subjectIndex} redirectLink={redirect} />
      <Footer showScrollIndicator variant="darkest" />
    </Page>
  );
}

export default withRouter(ContactUs);
