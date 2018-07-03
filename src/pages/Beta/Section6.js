import React, { Component } from 'react';
import styled from 'styled-components';
import { Typography, Section, Button } from 'components';
import NotifyMe from './NotifyMe';

const Heading = styled(Typography)`
   padding-top: 30px;
`;

const B = styled(Button)`
   margin-top: 280px;
`;

export default class Sectio6 extends Component {
   state = {
      notifyOpen: false,
   };

   openNotify = () => this.setState({ notifyOpen: true });

   closeNotify = () => this.setState({ notifyOpen: false });

   render() {
      const { notifyOpen } = this.state;
      return (
         <Section container centerAlign backgroundImage={require('assets/images/workplace.jpg')}>
            {notifyOpen && <NotifyMe onClose={this.closeNotify} />}
            <Heading L5>workplace democracy</Heading>
            <B I_2 onClick={this.openNotify}>Notify me when live</B>
         </Section>
      );
   }
}
