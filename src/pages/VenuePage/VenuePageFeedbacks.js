import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Section, Typography, Button, Icon } from 'components';
import { rateFeedback } from 'services/feedback';
import FeedbackForm from './FeedbackForm';

function parseFeedbacks(feedbacks) {
   if (!feedbacks) return [];
   // eslint-disable-next-line
   return feedbacks.map((f) => {
      // const totalVotes = f.negativeVotes + f.positiveVotes;

      return {
         ...f,
         percentage: f.voteRating,
      };
   });
}

export default class VenuePageFeedbacks extends Component {
   static propTypes = {
      venue: PropTypes.PropTypes.shape().isRequired,
      openMink: PropTypes.func.isRequired,
   };

   constructor(props) {
      super(props);
      this.state = {
         feedbackForm: false,
         feedbackRating: null,
      };
   }

   async componentWillReceiveProps(nextProps) {
      const {
         props: { venue },
         state: { feedbackRating },
      } = this;
      // if you rated a feedback, but weren't an insider
      if (!venue.insider && nextProps.venue.insider && feedbackRating) {
         const { feedbackId, rating } = feedbackRating;
         await rateFeedback(feedbackId, rating, venue);
      }
   }

   openFeedbackForm = () => {
      const { venue, openMink } = this.props;
      if (!venue.insider) {
         openMink();
      }
      this.setState({ feedbackForm: true });
   }

   rateFeedback = async (feedbackId, rating) => {
      const { venue, openMink } = this.props;
      if (!venue.insider) {
         openMink();
         this.setState({ feedbackRating: { feedbackId, rating } });
      } else {
         await rateFeedback(feedbackId, rating, this.props.venue);
      }
   }

   renderFeedbackForm = () => {
      const { feedbackForm } = this.state;
      const { venue } = this.props;

      if (venue.insider && feedbackForm) {
         return (
            <FeedbackForm
               venue={venue}
               onClose={() => this.setState({ feedbackForm: false })}
            />
         );
      }
      return null;
   }

   render() {
      const { venue } = this.props;
      const { blabs } = venue;
      return (
         <Section>
            {this.renderFeedbackForm()}
            {parseFeedbacks(blabs).map(feedback => (
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
