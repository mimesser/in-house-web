import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Section, Icon, Button } from 'components';
import { getType } from 'utils';

const List = styled.ul`
   ${props => props.theme.B_7};
   li {
      padding: 10px 100px;
      cursor: pointer;
   }
   a {
      display: flex;
   }
   li:hover {
      background-color: ${props => props.theme.A_8}
   }
   ${props => props.theme.C_1};
   padding-bottom: 20px;
   border-width: 0;
   border-bottom-width: 1px;
`;
const Name = styled.h4`
   color: ${props => props.theme.A_2};
   font-size: 12pt;
   padding-bottom: 6px;
`;
const Content = styled.div`
   ${props => props.theme.S1};
   flex: 1;
`;
const Right = styled.div`
   color: ${props => props.theme.A_2};
   width: 100px;
`;
const Number = styled.div`
   font-size: 32px;
`;
const Decimal = styled.div`
   font-size: 20px;
   padding-top: 3px;
`;
const NumberContainer = styled.div`
   display: flex;
`;
const Person = styled.div`
   color: ${props => props.theme.A_4};
   font-size: 13px;
   display: flex;
   align-items: flex-end;
   margin-top: 4px;
`;

const Footer = styled.div`
   text-align: right;
`;
const NoJobs = styled.div`
   ${props => props.theme.P2};
   text-align: center;
`;
const Image = styled.div`
   background-image: ${props => `url('https://minklistphoto.azureedge.net/photo/${props.src}')`};
   background-size: auto;
   background-position: center;
   width: 100px;
   background-repeat: no-repeat;
`;


function parseNumber(rating) {
   let number;
   let decimal;
   if (rating) {
      [number, decimal] = rating.toFixed(1).toString().split('.');
   } else {
      number = 0;
      decimal = 0;
   }
   return (
      <NumberContainer>
         <Number>{number}</Number>
         <Decimal>.{decimal}</Decimal>
      </NumberContainer>
   );
}

function getFilteredResults(allVenues, search) {
   if (!search) return null;

   return allVenues.filter(venue => Object.keys(venue).some((key) => {
      const data = venue[key];
      if (!data) return false;
      const type = getType();
      if (type === 'string' || type === 'number') return false;
      const value = data.toString().toLowerCase();
      return value.indexOf(search) > -1;
   }));
}

export default function SearchResultsList({ venues, filter }) {
   const filteredVenues = getFilteredResults(venues, filter);

   return (
      <Section container>
         {filteredVenues && filteredVenues.length > 0 &&
            <List>
               {filteredVenues.map(f => (
                  <li key={f._id}>
                     <Link to={`/venues/${f._id}`}>
                        <Image src={f.imageThumbnail} />
                        <Content>
                           <Name>{f.name}</Name>
                           {f.itemsSummary}
                           <br />
                           {f.crossStreets}
                           <br />
                           {f.address}
                        </Content>
                        <Right>
                           {parseNumber(f.rating)}
                           <Person><Icon size={16}>person</Icon> {f.votes}</Person>
                        </Right>
                     </Link>
                  </li>
               ))}
            </List>
         }
         {filteredVenues && filteredVenues.length === 0 &&
            <NoJobs>sorry, no businesses match that search</NoJobs>
         }
         {filteredVenues && (
            <Footer>
               <Button J_1>Add my job</Button>
            </Footer>
         )}
      </Section>
   );
}

SearchResultsList.propTypes = {
   venues: PropTypes.arrayOf(PropTypes.shape()).isRequired,
   filter: PropTypes.string,
};
