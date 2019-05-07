import React, { Component } from 'react';
import { connect } from 'react-redux';

import Link from 'next/link';
import { setAuthorization } from '../api';
import { Page } from '../components/templates';
import { loadVenuesData } from '../store/actions';
import { MultiStep } from '../components/organisms';
import { Button, Container, Flex, Heading } from '../components/atoms';
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

   step1 = () => {
      return (
         <Container>
            <Heading>#1: list your house</Heading>
            <p>you can add your organization</p>
            <p>easily & untraceably</p>
            <br />
            <p>next - empower your team</p>
         </Container>
      );
   };

   step2 = () => {
      return (
         <Container>
            <Heading>#2: add a starter Mink©</Heading>
            <p>U.S. patent no. 8,904,502</p>
            <br />
            <p>create a team-based security question</p>
            <p>to verify insiders anonymously</p>
            <br />
            <p>what's the name of satoshi's new dog?</p>
            <br />
            <p>(secret answer) satoshi</p>
         </Container>
      );
   };

   step3 = () => {
      return (
         <Container>
            <Heading>#3: secret poke your team</Heading>
            <p>there is power in numbers</p>
            <br />
            <p>use the private share feature to alert your team</p>
            <Heading h5>anonymously ✈️</Heading>
         </Container>
      );
   };

   step4 = () => {
      return (
         <Container>
            <Heading>#4: vote Mink©</Heading>
            <p>
               <strong>MINK</strong> a team security question that identifies insiders
            </p>
            <br />
            <p>add new ones any time you feel a need to</p>
            <p>better identify "insiders"</p>
            <br />
            <p>your team votes and ...</p>
            <br />
            <p>... the most popular MINK at any time</p>
            <p>verifies insiders</p>
         </Container>
      );
   };

   step5 = () => {
      return (
         <Container>
            <Heading>#5: change everything</Heading>
            <p>address problems without fear</p>
            <p>bypass favoritism & politics</p>
            <p>promote the best people & ideas</p>
            <p>rate every issue democratically</p>
            <p>
               <strong>drive consensus</strong>
            </p>
            <br />
            <Flex justifyAround>
               <Link href="/notify">
                  <Button secondary>get notified when live</Button>
               </Link>
            </Flex>
         </Container>
      );
   };

   render() {
      const steps = [this.step1(), this.step2(), this.step3(), this.step4(), this.step5()];

      return (
         <Page title="How It Works">
            <MultiStep steps={steps} />
         </Page>
      );
   }
}

export default connect()(Intro);
