import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Overlay, Section, Typography, Input, Button } from 'components';
import { createFeedback } from 'services/feedback';
import { times } from 'utils';
import styled from 'styled-components';

const Block = styled.div`
   padding: 10px;
   margin: 4px;
   cursor: pointer;
   background-color: ${props => (props.active ? '#000' : 'inherit')};
   &:hover {
      padding: 16px;
      font-size: 30px;
      background-color: rgba(0, 0, 0, 0.8);
   }
`;

export default class FeedbackForm extends Component {
   state = {
      error: null,
      title: '',
      text: '',
      mood: 1,
   }

   submit = async (e) => {
      e.preventDefault();
      const { venue } = this.props;
      const { title, text, mood } = this.state;
      const error = await createFeedback({
         venueId: venue.id, title, text, mood,
      }, venue);
      if (error) {
         this.setState({ error });
      } else {
         this.props.onClose();
      }
   }

   changeHandler = key => (value) => {
      this.setState({ [key]: value });
   }

   render() {
      const { onClose } = this.props;
      const {
         error, title, text, mood,
      } = this.state;

      return (
         <Overlay onClose={onClose}>
            <Section container centerAlign maxWidth={400}>
               <form onSubmit={this.submit}>
                  {
                     error && (
                        <div style={{ padding: '20px', color: '#fbb' }}>
                           {error}
                        </div>
                     )
                  }
                  <Typography H1>new comment</Typography>
                  <div style={{ padding: '20px 0' }}>
                     <Input
                        E_1
                        value={title}
                        onChange={this.changeHandler('title')}
                        placeholder="title"
                     />
                  </div>
                  <div style={{ padding: '20px 0' }}>
                     <Input
                        E_1
                        value={text}
                        onChange={this.changeHandler('text')}
                        placeholder="comment"
                        multiline
                     />
                  </div>
                  <div style={{ padding: '20px 0' }}>
                     {times(3, t => (
                        <Block
                           key={t}
                           active={t === mood}
                           onClick={() => this.changeHandler('mood')(t)}
                        >
                           {t}
                        </Block>
                     ))}
                  </div>
                  <div style={{ padding: '20px 0' }}>
                     <Button
                        I_1
                        type="submit"
                     >
                        Leave feedback
                     </Button>
                  </div>
               </form>
            </Section>
         </Overlay>
      );
   }
}

FeedbackForm.propTypes = {
   venue: PropTypes.shape().isRequired,
   onClose: PropTypes.func.isRequired,
};
