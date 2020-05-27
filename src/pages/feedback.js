import React from 'react';
import { withRouter } from 'next/router';
import { Page, FeedbackForm } from '../components/organisms';

function Feedback(props) {
  const {
    query: { subjectIndex, redirect },
  } = props.router;
  console.log(subjectIndex, redirect);
  return (
    <Page>
      <FeedbackForm subjectIndex={subjectIndex} redirectLink={redirect} />
    </Page>
  );
}

export default withRouter(Feedback);
