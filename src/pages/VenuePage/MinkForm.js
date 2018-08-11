import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Overlay, Section, Typography, Input, Button } from 'components';
import { createMink } from 'services/mink';


export default class MinkForm extends Component {
   static propTypes = {
      venue: PropTypes.shape().isRequired,
      onClose: PropTypes.func.isRequired,
   };

   state = {
      error: null,
      question: '',
      answer: '',
   }

   submit = async (e) => {
      e.preventDefault();
      const { venue } = this.props;
      const { question, answer } = this.state;
      const error = await createMink({
         venueId: venue.id, question, answer,
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
         error, question, answer,
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
                  <Typography H1>new mink</Typography>
                  <div style={{ padding: '20px 0' }}>
                     <Input
                        E_1
                        value={question}
                        onChange={this.changeHandler('question')}
                        placeholder="question"
                     />
                  </div>
                  <div style={{ padding: '20px 0' }}>
                     <Input
                        E_1
                        value={answer}
                        onChange={this.changeHandler('answer')}
                        placeholder="answer"
                     />
                  </div>
                  <div style={{ padding: '20px 0' }}>
                     <Button
                        I_1
                        type="submit"
                     >
                        submit
                     </Button>
                  </div>
               </form>
            </Section>
         </Overlay>
      );
   }
}
