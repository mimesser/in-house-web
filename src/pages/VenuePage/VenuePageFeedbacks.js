import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Section, Typography, Button, Icon } from 'components';
import { rateFeedback } from 'services/feedback';
import FeedbackForm from './FeedbackForm';

class VenuePageFeedbacks extends Component {
   constructor(props) {
      super(props);
      this.state = {
         feedbackForm: false,
      };
   }

   openFeedbackForm = () => {
      this.setState({ feedbackForm: true });
   }

   rateFeedback = async (feedbackId, rating) => {
      await rateFeedback(feedbackId, rating);
   }

   render() {
      const { feedbacks, venue } = this.props;
      const { feedbackForm } = this.state;
      return (
         <Section>
            {feedbackForm
               && <FeedbackForm venueId={venue.id} onClose={() => this.setState({ feedbackForm: false })} />
            }
            {feedbacks.map(feedback => (
               <div style={{ padding: '20px', display: 'flex' }} key={feedback.id}>
                  <Typography H2>{feedback.title}</Typography>
                  <Typography C1>{feedback.text}</Typography>
                  <div>
                     <Typography P2>
                        <Button
                           I_4
                           onClick={() => this.rateFeedback(feedback.id, feedback.myRating === 0 ? null : 0)}
                           unselected={feedback.myRating !== 0}
                        >
                           <Icon size={40}>
                              thumb_down
                           </Icon>
                        </Button>
                        {Number.parseInt(feedback.percentage * 100, 10)}%
                        <Button
                           I_4
                           onClick={() => this.rateFeedback(feedback.id, feedback.myRating === 1 ? null : 1)}
                           unselected={feedback.myRating !== 1}
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
               onClick={() => this.openFeedbackForm()}
            >
               Leave feedback
            </Button>
         </Section>
      );
   }
}

VenuePageFeedbacks.propTypes = {
   feedbacks: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

function mapStateToProps({ user }, { venue }) {
   const myRatings = user.feedbackRatings;
   console.log(venue.feedbacks);
   return {
      feedbacks: (venue.feedbacks || []).map((f) => {
         const myVote = myRatings.find(r => r.feedbackId === f.id);

         const totalVotes = f.votesAgainst + f.votesFor;

         return {
            myRating: myVote ? myVote.rating : null,
            ...f,
            percentage: totalVotes ? (f.votesFor / totalVotes) : 0,
         };
      }),
      // minks: venue.minks
      //    .map((mink) => {
      //       const myVote = myRatings.find(r => r.minkId === mink.id);

      //       const totalVotes = mink.votesAgainst + mink.votesFor;
      //       return {
      //          myRating: myVote ? myVote.rating : null,
      //          ...mink,
      //          percentage: totalVotes ? (mink.votesFor / totalVotes) : 0,
      //       };
      //    })
      //    .sort((a, b) => {
      //       const diff = b.percentage - a.percentage;
      //       if (diff > 0) return -1;
      //       if (diff < 0) return 1;
      //       return 0;
      //    }),
   };
}

export default connect(mapStateToProps)(VenuePageFeedbacks);
