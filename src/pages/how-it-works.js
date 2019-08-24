import React, { Component } from 'react';
import Router, { withRouter } from 'next/router';
import inRange from 'lodash/inRange';

import { Page } from '../components/templates';
import { SplashLayout, MultiStep, Step1, Step2, Step3, Step4, Step5 } from '../components/organisms';
import { Container } from '../components/atoms';

class Intro extends Component {
  steps = [Step1, Step2, Step3, Step4, Step5];

  get step() {
    const step = parseInt(this.props.router.query.step, 10);
    if (inRange(step, 1, this.steps.length + 1)) {
      return step - 1;
    }

    return null;
  }

  nextStepUrl = step => {
    const nextStep = step + 1;
    Router.replace(`/how-it-works?step=${nextStep}`, `/how-it-works?step=${nextStep}`, { shallow: true });
  };

  render() {
    return (
      <Page title="How It Works">
        <Container>
          <SplashLayout>
            <MultiStep steps={this.steps} startStep={this.step} onStepChange={this.nextStepUrl} />
          </SplashLayout>
        </Container>
      </Page>
    );
  }
}

export default withRouter(Intro);
