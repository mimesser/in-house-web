import React, { Component } from 'react';
import { Heading, Button, Section } from 'components';
import NotifyMe from './NotifyMe';

export default class Section2 extends Component {
   state = {
      notifyOpen: false,
   };

   openNotify = () => this.setState({ notifyOpen: true });

   closeNotify = () => this.setState({ notifyOpen: false });

   render() {
      const { notifyOpen } = this.state;

      return (
         <Section centerAlign container>
            {notifyOpen && <NotifyMe onClose={this.closeNotify} />}
            <Button I_2 onClick={this.openNotify}>
               Notify me when live
            </Button>
            <Heading L5>
               a yelp from the inside
            </Heading>
            <Heading L3>
               using common team knowledge to decide who can speak
               <br />
               (anonymously)
            </Heading>
         </Section>
      );
   }
}
