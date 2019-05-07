import React, { Component } from 'react';
import { connect } from 'react-redux';

import Link from 'next/link';
import { setAuthorization } from '../api';
import { Page } from '../components/templates';
import { loadVenuesData } from '../store/actions';

import { Button, Container, Flex, Heading, Input } from '../components/atoms';
import { aggregateUserIdSelector } from '../store/selectors';

class Notify extends Component {
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

   thankYou = () => {
      return (
         <Container>
            <Heading>thank you</Heading>
         </Container>
      );
   };

   render() {
      return (
         <Page title="Notify Me">
            <Container>
               <Heading>notify me</Heading>
               <p>we'll let you know when we go live!</p>
               <br />
               <Input placeholder="Email or mobile" />
               <br />
               <br />
               <Flex justifyAround>
                  <Link href="/home">
                     <Button>send</Button>
                  </Link>
               </Flex>
            </Container>
         </Page>
      );
   }
}

export default connect()(Notify);
