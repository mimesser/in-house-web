import React, { Component } from 'react';
import { withRouter } from 'next/router';

import { Page } from '../components/templates';
import { SplashLayout, MultiStep, Step1, Step2, Step3, Step4, Step5 } from '../components/organisms';
import { Container } from '../components/atoms';

class Intro extends Component {
   steps = [Step1, Step2, Step3, Step4, Step5];

   get step() {
      return parseInt(this.props.router.query, 10) || null;
   }

   render() {
      return (
         <Page title="How It Works">
            <Container>
               <SplashLayout>
                  <MultiStep steps={this.steps} startStep={this.step} />
               </SplashLayout>
            </Container>
         </Page>
      );
   }
}

export default withRouter(Intro);
