import React, { Component } from 'react';

import { setAuthorization } from '../api';
import { Page } from '../components/templates';
import { loadVenuesData } from '../store/actions';
import { SplashLayout, MultiStep, Step1, Step2, Step3, Step4, Step5 } from '../components/organisms';
import { Button, Container } from '../components/atoms';
import { aggregateUserIdSelector } from '../store/selectors';

class Intro extends Component {
   static async getInitialProps(props) {
      const { store, isServer } = props.ctx;

      if (!store.getState().aggregate) {
         return 1;
      }
      setAuthorization(aggregateUserIdSelector(store.getState()));

      if (!store.getState().venues) {
         store.dispatch(loadVenuesData());
      }

      return { isServer };
   }

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
