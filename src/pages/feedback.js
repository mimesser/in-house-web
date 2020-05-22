import React from 'react';
import { withRouter } from 'next/router';
import { Page, FeedbackForm } from '../components/organisms';

function Feedback(props) {
  const {
    query: { subjectIndex },
  } = props.router;
  console.log(subjectIndex);
  return (
    <Page>
      <FeedbackForm subjectIndex={subjectIndex} />
    </Page>
  );
}

export default withRouter(Feedback);
