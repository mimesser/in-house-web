import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Icon, Section } from 'components';

const Table = styled.table`
   width: 100%;
   th, td {
      padding: 10px;
   }
   th {
      padding-bottom: 20px;
      ${props => props.theme.S1}
   }
   th:first-child {
      ${props => props.theme.S2}
   }
   thead {
      ${props => props.theme.C_1};
      border-width: 0;
      border-bottom-width: 1px;
   }
   tbody tr:first-child td {
      padding-top: 20px;
   }
   td:first-child {
      ${props => props.theme.P1};
      width: 30px;
   }
   td {
      ${props => props.theme.C2};
   }
   tr:hover {
      td:first-child {
         ${props => props.theme.P2};
      }
      td {
         ${props => props.theme.C4};
      }
   }
`;
const NumberContainer = styled.div`
   display: flex;
`;
const Decimal = styled.div`
   font-size: 12px;
   padding-top: 2px;
`;
const Number = styled.div`
   font-size: 18px;
`;
const Votes = styled.div`
   display: flex;
   align-content: center;
`;

function parseNumber(rating) {
   if (!rating) {
      return <Number>?</Number>;
   }
   const [number, decimal] = rating.toFixed(1).toString().split('.');

   return (
      <NumberContainer>
         <Number>{number}</Number>
         <Decimal>.{decimal}</Decimal>
      </NumberContainer>
   );
}

function VenuePageCategories({
   categories,
}) {
   return (
      <Section container maxWidth={600}>
         <Table>
            <thead>
               <tr>
                  <th colSpan={2}>industry top 10</th>
                  <th>insiders</th>
                  <th>avg</th>
               </tr>
            </thead>
            <tbody>
               {categories.map((category, i) => (
                  <tr key={category.id}>
                     <td>{i + 1}.</td>
                     <td>{category.name}</td>
                     <td>
                        {category.votes &&
                           <Votes>
                              (<Icon size={12}>person</Icon>{category.votes})
                           </Votes>
                        }
                     </td>
                     <td>{parseNumber(category.rating)}</td>
                  </tr>
               ))}
            </tbody>
         </Table>
      </Section>
   );
}

VenuePageCategories.propTypes = {
   categories: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

function mapStateToProps({ categories }, { venue }) {
   return {
      categories: categories
         .filter(category => category.industryId === venue.industryId)
         .sort((a, b) => {
            const diff = b.orderIndex - a.orderIndex;
            if (diff > 0) return -1;
            if (diff < 0) return 1;
            return 0;
         })
         .slice(0, 10)
         .map((category) => {
            const data = venue.categories.find(v => v.id === category.id);
            return {
               ...data,
               ...category,
            };
         }),
   };
}

export default connect(mapStateToProps)(VenuePageCategories);
