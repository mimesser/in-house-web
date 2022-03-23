import React from 'react';
import { withRouter } from 'next/router';
import styled from 'styled-components';
import { Footer } from '../components/organisms/Footer';

import { Page, FeedbackForm } from '../components/organisms';

function ContactUs(props) {
  const {
    query: { subjectIndex = 0, redirect = '/' },
  } = props.router;
  return (
    <Page>
      <FeedbackForm subjectIndex={subjectIndex} redirectLink={redirect} />
      <Footer variant="light" />
    </Page>
  );
}

export default withRouter(ContactUs);
