import React, { Component } from 'react';

import { Page } from '../components/templates';
import { SplashLayout, MultiStep, Step1, Step2, Step3, Step4, Step5 } from '../components/organisms';
import { Container } from '../components/atoms';

class Intro extends Component {
   steps = [Step1, Step2, Step3, Step4, Step5];

   render() {
      return (
         <Page title="How It Works">
            <Container>
               <SplashLayout>
                  <MultiStep steps={this.steps} />
               </SplashLayout>
            </Container>
         </Page>
      );
   }
}

export default Intro;
