import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Section, Heading, Text, Input } from 'components';
import { connect } from 'react-redux';
import styled from 'styled-components';
import VenueList from './VenueList';

const Nav = styled.button`
   ${props => props.theme.J_1};
   margin: 0 40px;
`;

const Request = styled(Heading)`
   padding: 20px 8px;
   line-height: 1em;
   display: inline-block;
   cursor: pointer;
`;

const Header = styled.nav`
   display: flex;
   justify-content: space-around;
   align-items: center;
`;

class Venues extends Component {
   static propTypes = {
      venues: PropTypes.arrayOf(PropTypes.shape({})),
   };

   state = {
      filter: '',
   }

   onFilterChange = filter => this.setState({ filter });

   render() {
      const {
         props: { venues },
         state: { filter },
      } = this;

      return (
         <div>
            <Section container centerAlign>
               <Nav>Restaurants</Nav>
               <Nav>START UPS</Nav>
               <Nav>SCHOOLS</Nav>
            </Section>
            <Section centerAlign style={{ paddingTop: 0 }}>
               <Request K_1>REQUEST YOUR INDUSTRY FOR BETA TRAIL</Request>
            </Section>
            <Section container centerAlign maxWidth={800}>
               <Header>
                  <Text P1>> standard</Text>
                  <Input F_1 search placeholder="search" filter={filter} onChange={this.onFilterChange} />
                  <Text J_1>LIST MY JOB</Text>
               </Header>
            </Section>
            <VenueList filter={filter} venues={venues} />
         </div>
      );
   }
}


function mapStateToProps({ venues }) {
   return {
      venues,
   };
}

export default connect(mapStateToProps)(Venues);
