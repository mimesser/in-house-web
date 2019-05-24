import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';

import { setAuthorization } from '../api';
import { Page } from '../components/templates';
import { loadAggregateData } from '../store/actions';
import { aggregateUserIdSelector } from '../store/selectors';
import { Button, Container, Heading, Flex, Column } from '../components/atoms';

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
         <Page title="Landing Page">
            <Container>
               <Flex alignStretch>
                  <Column>
                     <Heading>change everything?</Heading>

                     <Heading h2>90 00 00 00</Heading>

                     <p>when everyone has a safe, equal & anonymous voice at the table, the entirety of your organization will change forever</p>

                     <Heading h4>how will your world change?</Heading>
                  </Column>
               </Flex>

               <Flex justifyAround>
                  <Link href="/intro">
                     <Button>see how it works</Button>
                  </Link>
               </Flex>
            </Container>
         </Page>
      );
   }
}

export default Index;
