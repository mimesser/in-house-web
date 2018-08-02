import React, { Component } from 'react';
import { Typography, Button, Section } from 'components';
import styled from 'styled-components';
import Notify from '../Notify';

const Content = styled.div`
   margin: 40px 0;
`;

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
            {notifyOpen && <Notify onClose={this.closeNotify} />}
            <Button I_2 onClick={this.openNotify}>
               Notify me when live
            </Button>
            <Content>
               <Typography L5>
                  a yelp from the inside
               </Typography>
               <Typography L3>
                  using common team knowledge to decide who can speak
                  <br />
                  (anonymously)
               </Typography>
            </Content>
         </Section>
      );
   }
}
