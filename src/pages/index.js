import React, { Component } from 'react';
import Link from 'next/link';

import { Page } from '../components/templates';
import { Button, Container, Heading, Strong, Flex } from '../components/atoms';
import { SplashLayout } from '../components/organisms';

// import { setAuthorization } from '../api';
// import { loadAggregateData } from '../store/actions';
// import { aggregateUserIdSelector } from '../store/selectors';

class Index extends Component {
   // static async getInitialProps(props) {
   //    const { store, isServer } = props.ctx;
   //
   //    if (!store.getState().aggregate) {
   //       store.dispatch(loadAggregateData());
   //    } else {
   //       setAuthorization(aggregateUserIdSelector(store.getState()));
   //    }
   //
   //    return { isServer };
   // }

   render() {
      return (
         <Page>
            <Container>
               <SplashLayout>
                  <Heading>change everything?</Heading>

                  <p>when everyone has a safe, equal & anonymous voice at the table, the entirety of your organization will change forever</p>

                  <Strong>how will your world change?</Strong>
                  <Link href="/intro">
                     <Button>see how it works</Button>
                  </Link>
               </SplashLayout>
            </Container>
         </Page>
      );
   }
}

export default Index;
