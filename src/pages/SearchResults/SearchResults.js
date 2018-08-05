import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Section, Typography, SearchInput } from 'components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import pageWrapper from 'utils/page-wrapper';
import VenueList from './SearchResultsList';

const Nav = styled.button`
   ${props => props.theme.J_1};
   margin: 0 40px;
`;

const Request = styled(Link)`
   color: ${props => props.theme.A_3};
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

const NavLink = styled(Link)`
   color: ${props => props.theme.A_3};
`;

class SearchResults extends Component {
   static propTypes = {
      venues: PropTypes.arrayOf(PropTypes.shape({})),
      industries: PropTypes.arrayOf(PropTypes.shape({})),
   };

   state = {
      filter: '',
   }

   onFilterChange = filter => this.setState({ filter });

   render() {
      const {
         props: { venues, industries },
         state: { filter },
      } = this;

      return (
         <div>
            <Section container centerAlign>
               {industries.map(i => (
                  <Nav key={i._id}>{i.name}</Nav>
               ))}
            </Section>
            <Section centerAlign style={{ paddingTop: 0 }}>
               <Request to="/request-new-industry">REQUEST YOUR INDUSTRY FOR BETA TRAIL</Request>
            </Section>
            <Section container centerAlign maxWidth={800}>
               <Header>
                  <Typography P1>> standard</Typography>
                  <SearchInput F_1 placeholder="search" value={filter} onChange={this.onFilterChange} />
                  <NavLink to="/list-venue">LIST MY JOB</NavLink>
               </Header>
            </Section>
            <VenueList filter={filter} venues={venues} />
         </div>
      );
   }
}


function mapStateToProps({ venues, industries }) {
   return {
      venues: venues.filter(venue => venue.minks.length > 0),
      industries,
   };
}

export default pageWrapper('12A')(connect(mapStateToProps)(SearchResults));
