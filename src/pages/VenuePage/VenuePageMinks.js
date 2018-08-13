import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input, Section, Typography, Button, Icon } from 'components';
import { submitAnswer, rateMink } from 'services/mink';
import Rating from './Rating';
import MinkForm from './MinkForm';

class VenuePageMinks extends Component {
   static propTypes = {
      venue: PropTypes.shape().isRequired,
   }

   constructor(props) {
      super(props);
      this.state = {
         rating: null,
         results: {},
         minkForm: null,
         minkRating: null,
         answers: props.minks.reduce((res, mink) => ({
            ...res,
            [mink.id]: '',
         })),
      };
   }

   async componentWillReceiveProps(nextProps) {
      const {
         props: { venue },
         state: { minkRating },
      } = this;
      // if you rated a feedback, but weren't an insider
      if (!venue.insider && nextProps.venue.insider && minkRating) {
         const { minkId, rating } = minkRating;
         await rateMink(minkId, rating, venue);
      }
   }

   openRating = (rating) => {
      this.setState({ rating });
   }

   tryAnswer = async (minkId) => {
      const error = await submitAnswer(minkId, this.state.answers[minkId]);
      const { results } = this.state;

      this.setState({
         results: {
            ...results,
            [minkId]: !error,
         },
      });
   }

   answerHandler = minkId => (value) => {
      const { answers } = this.state;
      this.setState({
         answers: {
            ...answers,
            [minkId]: value,
         },
      });
   }

   rateMink = async (minkId, rating) => {
      const { venue, openMink } = this.props;
      if (!venue.insider) {
         openMink();
         this.setState({ minkRating: { minkId, rating } });
      } else {
         await rateMink(minkId, rating, venue);
      }
   }

   openMinkForm = () => {
      this.setState({ minkForm: true });
   }

   renderRating = () => {
      const { rating } = this.state;
      if (rating) {
         return (
            <Rating
               name={rating.name}
               venueId={rating.venue}
               categoryId={rating.category}
               onClose={() => this.setState({ rating: null })}
            />
         );
      }
      return null;
   }

   renderResult = (minkId) => {
      const result = this.state.results[minkId];
      if (result === true) {
         return <Icon size={40}>thumb_up</Icon>;
      }
      if (result === false) {
         return <Icon size={40}>thumb_down</Icon>;
      }
      return null;
   }

   render() {
      const { minks, venue } = this.props;
      const { minkForm } = this.state;
      return (
         <Section>
            {minkForm
               && <MinkForm venue={venue} onClose={() => this.setState({ minkForm: false })} />
            }
            {minks.map(mink => (
               <div style={{ padding: '20px', display: 'flex' }} key={mink.id}>
                  <div style={{ marginRight: '100px', textAlign: 'center' }}>
                     <Typography H2>{mink.question}</Typography>
                     <Typography P2>
                        try answer
                        <Input
                           E_1
                           value={this.state.answers[mink.id]}
                           placeholder="answer"
                           onChange={this.answerHandler(mink.id)}
                        />
                        <Button J_1 onClick={() => this.tryAnswer(mink.id)}>Submit</Button>
                        {this.renderResult(mink.id)}
                     </Typography>
                  </div>
                  <div>
                     <Typography P2>
                        <Button
                           I_4
                           onClick={() => this.rateMink(mink.id, mink.myRating === 0 ? null : 0)}
                           unselected={mink.myRating !== 0}
                        >
                           <Icon size={40}>
                              thumb_down
                           </Icon>
                        </Button>
                        {Number.parseInt(mink.percentage * 100, 10)}%
                        <Button
                           I_4
                           onClick={() => this.rateMink(mink.id, mink.myRating === 1 ? null : 1)}
                           unselected={mink.myRating !== 1}
                        >
                           <Icon size={40}>
                              thumb_up
                           </Icon>
                        </Button>
                     </Typography>
                  </div>
               </div>
            ))}
            <Button
               I_1
               onClick={() => this.openMinkForm()}
            >
               Add mink
            </Button>
         </Section>
      );
   }
}

VenuePageMinks.propTypes = {
   minks: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

function mapStateToProps(_, { venue }) {
   return {
      minks: venue.minks
         .map((mink) => {
            // const myVote = myRatings.find(r => r.minkId === mink.id);

            const totalVotes = mink.votesAgainst + mink.votesFor;
            return {
               // myRating: myVote ? myVote.rating : null,
               ...mink,
               percentage: totalVotes ? (mink.votesFor / totalVotes) : 0,
            };
         })
         .sort((a, b) => {
            const diff = b.percentage - a.percentage;
            if (diff > 0) return -1;
            if (diff < 0) return 1;
            return 0;
         }),
   };
}

export default connect(mapStateToProps)(VenuePageMinks);
