import React, { useState, Component } from 'react';
import styled from 'styled-components';

import { Page } from '../components/templates';
import FeedbackForm from '../components/organisms/FeedbackForm';
import { Container } from '../components/atoms';

function Feedback() {
   return (
      <Page title="Feedback">
         <Container>
            <FeedbackForm />
         </Container>
      </Page>
   );
}

export default Feedback;
