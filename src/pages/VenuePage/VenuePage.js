import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Button, Section, Overlay, Input } from 'components';
import pageWrapper from 'utils/page-wrapper';
import { Link } from 'react-router-dom';
import { submitAnswer } from 'services/mink';
import { getVenue } from 'services/venue';
import history from '../../history';
import Categories from './VenuePageCategories';
import Minks from './VenuePageMinks';
import Feedbacks from './VenuePageFeedbacks';
import Header from './VenuePageHeader';

const ButtonContainer = styled(Section)`
   button + button {
      margin-left: 40px;
   }
`;
const ButtonLink = styled(Link)`
   color: ${props => props.theme.A_1};
`;

const categories = [
   { id: 'categories', name: 'Categories', Component: Categories },
   { id: 'feedback', name: 'Feedback', Component: Feedbacks },
   { id: 'minks', name: 'Minks', Component: Minks },
];

const renderLoading = () => (
   <Overlay>
      <div style={{ padding: '20px', color: '#fff' }}>
         Loading...
      </div>
   </Overlay>
);

class VenuePage extends Component {
   static propTypes = {
      venue: PropTypes.shape().isRequired,
   }

   state = {
      selectedCategory: categories[0],
      answer: '',
      loading: true,
      showMink: false,
   }

   componentDidMount = async () => {
      const { venue } = this.props;
      if (!venue) history.push('/venues');
      else {
         await this.getVenue();
         this.setState({ loading: false });
      }
   }

   getVenue = async () => {
      const { venue } = this.props;
      try {
         await getVenue(venue);
      } catch (error) {
         this.setState({ showMink: true });
      }
   }

   changeAnswer = (answer) => {
      this.setState({ answer });
   }

   submit = async (e) => {
      e.preventDefault();
      this.setState({ error: null });
      const error = await submitAnswer(this.props.venue.minks[0].id, this.state.answer);
      if (error) {
         this.setState({ error });
      } else {
         await this.getVenue();
         this.setState({ showMink: false });
      }
   }

   renderMink = () => {
      const { venue: { minks, id } } = this.props;
      const { question } = minks[0];
      const { answer, error } = this.state;
      return (
         <Overlay>
            {
               error && (
                  <div style={{ padding: '20px', color: '#fbb' }}>
                     {error}
                  </div>
               )
            }
            <form onSubmit={this.submit} style={{ width: '300px' }}>
               Question: {question}
               <Input E_1 value={answer} placholder="Answer" onChange={this.changeAnswer} />
               <Button I_3 type="submit">submit</Button>
               <ButtonLink to={`/venues/${id}/apply-as-owner`}>Apply as owner</ButtonLink>
            </form>
         </Overlay>
      );
   }

   renderOverlay = () => {
      const { loading, showMink } = this.state;
      if (loading) return renderLoading();
      if (showMink) return this.renderMink();
      return null;
   }

   render() {
      const {
         props: { venue },
         state: { selectedCategory, loading },
      } = this;

      const authorized = !loading && (venue.insider || venue.owner);

      return (
         <div>
            {this.renderOverlay()}
            <Header {...venue} />
            <ButtonContainer container flex>
               {categories.map(category => (
                  <Button
                     selected={authorized && selectedCategory.id === category.id}
                     T_4
                     key={category.id}
                     onClick={() => this.setState({ selectedCategory: category })}
                  >
                     {category.name}
                  </Button>
               ))}
            </ButtonContainer>
            {authorized && selectedCategory.Component
               && (
                  <selectedCategory.Component
                     venue={venue}
                     openMink={() => this.setState({ showMink: true })}
                  />
               )
            }
         </div>
      );
   }
}

function mapStateToProps({ venues }, { match: { params: { id } } }) {
   return {
      venue: venues.find(venue => venue.id === id),
   };
}

export default pageWrapper('13A.1')(connect(mapStateToProps)(VenuePage));
