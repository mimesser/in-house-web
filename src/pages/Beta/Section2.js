import React, { Component } from 'react';
import { Heading, Overlay, Input, Button, Section } from 'components';

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
            {notifyOpen && (
               <Overlay onClose={this.closeNotify}>
                  <Heading T2>notify me when live</Heading>
                  <br />
                  <Input E_1 type="email" placeholder="email" width="260px" />
                  <br />
                  <Button I_3>submit</Button>
               </Overlay>
            )}
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
