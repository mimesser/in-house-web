import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Icon, Section, Button } from 'components';
import Rating from './Rating';
import CategoryForm from './CategoryForm';

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

class VenuePageCategories extends Component {
   static propTypes = {
      categories: PropTypes.arrayOf(PropTypes.shape()).isRequired,
      venue: PropTypes.shape().isRequired,
      industryId: PropTypes.number.isRequired,
      openMink: PropTypes.func.isRequired,
   };

   state = {
      rating: null,
   }

   openRating = (rating) => {
      const { venue, openMink } = this.props;
      if (!venue.insider) {
         openMink();
      }
      this.setState({ rating });
   }

   openCategoryForm = () => {
      const { venue, openMink } = this.props;
      if (!venue.insider) {
         openMink();
      }
      this.setState({ categoryForm: true });
   }

   renderRating = () => {
      const { rating } = this.state;
      const { venue } = this.props;

      if (venue.insider && rating) {
         return (
            <Rating
               name={rating.name}
               venue={venue}
               categoryId={rating.id}
               onClose={() => this.setState({ rating: null })}
            />
         );
      }
      return null;
   }

   renderCategoryForm = () => {
      const { categoryForm } = this.state;
      const { venue, industryId } = this.props;

      if (venue.insider && categoryForm) {
         return (
            <CategoryForm
               industryId={industryId}
               onClose={() => this.setState({ categoryForm: false })}
            />
         );
      }
      return null;
   }

   render() {
      const { categories } = this.props;

      return (
         <Section container maxWidth={600}>
            {this.renderCategoryForm()}
            {this.renderRating()}
            <Table>
               <thead>
                  <tr>
                     <th colSpan={2}>industry top 10</th>
                     <th>insiders</th>
                     <th>avg</th>
                     <th>me</th>
                  </tr>
               </thead>
               <tbody>
                  {categories.slice(0, 10).map((category, i) => (
                     <tr key={category.id}>
                        <td>{i + 1}.</td>
                        <td>{category.order} {category.name}</td>
                        <td>
                           {category.votes &&
                              <Votes>
                                 (<Icon size={12}>person</Icon>{category.votes})
                              </Votes>
                           }
                        </td>
                        <td>{parseNumber(category.rating)}</td>
                        <td>
                           <Button
                              I_1
                              previouslyRated={category.myRating !== null}
                              onClick={() => this.openRating(category)}
                           >
                              {category.myRating === null ? 'Rate' : category.myRating}
                           </Button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </Table>
            {(categories.length > 10) &&
               <Table style={{ marginTop: '30px' }}>
                  <thead>
                     <tr>
                        <th colSpan={2}>trending here</th>
                        <th>insiders</th>
                        <th>avg</th>
                        <th>me</th>
                     </tr>
                  </thead>
                  <tbody>
                     {categories.slice(10).map(category => (
                        <tr key={category.id}>
                           <td>&nbsp;</td>
                           <td>{category.name}</td>
                           <td>
                              {category.votes &&
                                 <Votes>
                                    (<Icon size={12}>person</Icon>{category.votes})
                                 </Votes>
                              }
                           </td>
                           <td>{parseNumber(category.rating)}</td>
                           <td>
                              <Button
                                 I_1
                                 previouslyRated={category.myRating !== null}
                                 onClick={() => this.openRating(category)}
                              >
                                 {category.myRating === null ? 'Rate' : category.myRating}
                              </Button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </Table>
            }
            <Button
               I_1
               onClick={() => this.openCategoryForm()}
            >
               Suggest new category
            </Button>
         </Section>
      );
   }
}


function mapStateToProps({ categories: allCategories }, { venue }) {
   const { industryId } = venue;

   const categories = allCategories.filter(i => i.industryId === industryId);

   const { categoryRatings } = venue;

   return {
      industryId,
      categories: categories
         .map((c) => {
            const categoryRating = categoryRatings
               ? categoryRatings.find(cr => cr.categoryId === c.id)
               : null;

            return {
               myRating: (categoryRating && categoryRating.myRating) || null,
               rating: categoryRating ? categoryRating.rating : null,
               votes: categoryRating ? categoryRating.votes : null,
               ...c,
            };
         })
         .sort((a, b) => {
            const diff = b.order - a.order;
            if (diff === 0) return 0;
            if (a.order === 0) return 1;
            if (b.order === 0) return -1;
            if (diff > 0) return -1;
            if (diff < 0) return 1;
            return 0;
         }),
   };
}

export default connect(mapStateToProps)(VenuePageCategories);
