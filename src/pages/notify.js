import React, { Component } from 'react';
import { connect } from 'react-redux';

import Link from 'next/link';
import { Page } from '../components/templates';

import { Button, Container, Flex, Heading, Input } from '../components/atoms';

class Notify extends Component {
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
