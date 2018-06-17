import React from 'react';
import PropTypes from 'prop-types';
import { Section, Heading, Text, Input } from 'components';
import { connect } from 'react-redux';
import styled from 'styled-components';

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


function Venues(props) {
   const { venues } = props;

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
               <Input F_1 placeholder="standard" />
               <Text J_1>LIST MY JOB</Text>
            </Header>
         </Section>
         {venues && (
            <select>
               {venues.map(venue => (
                  <option value={venue.id} key={venue.id}>
                     {venue.name}
                  </option>
               ))}
            </select>
         )}
         <h3>Temp changes</h3>
      </div>
   );
}

Venues.propTypes = {
   venues: PropTypes.arrayOf(PropTypes.shape({})),
};

function mapStateToProps({ venues }) {
   return {
      venues,
   };
}

export default connect(mapStateToProps)(Venues);
