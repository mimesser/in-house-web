import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Section, Typography, Button, Icon } from 'components';
import { rateFeedback } from 'services/feedback';
import FeedbackForm from './FeedbackForm';

function parseFeedbacks(feedbacks) {
   if (!feedbacks) return [];
   return feedbacks.map((f) => {
      const totalVotes = f.votesAgainst + f.votesFor;

      return {
         ...f,
         percentage: totalVotes ? (f.votesFor / totalVotes) : 0,
      };
   });
}

export default class VenuePageFeedbacks extends Component {
   static propTypes = {
      feedbacks: PropTypes.arrayOf(PropTypes.shape()).isRequired,
      venue: PropTypes.PropTypes.shape().isRequired,
   };

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
      await rateFeedback(feedbackId, rating, this.props.venue);
   }

   render() {
      const { feedbacks, venue } = this.props;
      const { feedbackForm } = this.state;
      return (
         <Section>
            {feedbackForm
               && (
                  <FeedbackForm
                     venue={venue}
                     onClose={() => this.setState({ feedbackForm: false })}
                  />
               )
            }
            {parseFeedbacks(feedbacks).map(feedback => (
               <div style={{ padding: '20px', display: 'flex' }} key={feedback.id}>
                  <Typography H2>{feedback.title}</Typography>
                  <Typography C1>{feedback.text}</Typography>
                  <div>
                     <Typography P2>
                        <Button
                           I_4
                           onClick={() => this.rateFeedback(
                              feedback.id,
                              feedback.myRating === 0 ? null : 0,
                           )}
                           unselected={feedback.myRating !== 0}
                        >
                           <Icon size={40}>
                              thumb_down
                           </Icon>
                        </Button>
                        {Number.parseInt(feedback.percentage * 100, 10)}%
                        <Button
                           I_4
                           onClick={() => this.rateFeedback(
                              feedback.id,
                              feedback.myRating === 1 ? null : 1,
                           )}
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
