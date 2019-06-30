import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Heading, Button, Loader } from '../../atoms';
import { WinkConfirmation, CounterInput } from '../../molecules';
import { Modal } from '../Modal';
import { Select, Textarea, Input } from '../../atoms/Input';
import { ButtonContainer, P, Container, SubmitButton } from './style';
import { postFeedback, clearFeedback } from '../../../store/feedback/actions';

const subjectOptions = ['request new beta house', 'technical issue', 'general feedback', 'other issue'];

function FeedbackForm(props) {
   const [subject, setSubject] = useState('');
   const [email, setEmail] = useState('');
   const [message, setMessage] = useState('');
   const getHandler = setter => event => setter(event.target.value);
   const handleSubjectChange = getHandler(setSubject);
   const handleEmailChange = getHandler(setEmail);

   const submit = () => {
      props.postFeedback({ email, subject, message });
   };

   const clear = () => {
      setSubject('');
      setEmail('');
      setMessage('');
   };

   const valid = !!subject && !!message;

   return (
      <Container>
         {/* Must hide Modal on initial render / struggles with SSR */}
         {process.browser && (
            <Modal
               open={props.success || props.loading}
               closeModal={clear}
               inverse
               canClose={!!props.success}
               title="Success!"
            >
               {props.loading ? <Loader white /> : <WinkConfirmation />}
            </Modal>
         )}
         <Heading>let us know</Heading>
         <P>we keep everything confidenial</P>
         <P>
            <Select value={subject} onChange={handleSubjectChange}>
               <option disabled value="">
                  subject
               </option>
               {subjectOptions.map(subjectOption => (
                  <option key={subjectOption} value={subjectOption}>
                     {subjectOption}
                  </option>
               ))}
            </Select>
         </P>
         <CounterInput
            multiline
            value={message}
            onChange={setMessage}
            max={500}
            placeholder="type something"
            rows={4}
         />
         <P>
            <Input value={email} onChange={handleEmailChange} placeholder="email (if you want a reply)" type="email" />
         </P>
         {props.error && <P>{props.error}</P>}
         <ButtonContainer>
            <SubmitButton visible={valid} onClick={submit}>
               request to list my house
            </SubmitButton>
         </ButtonContainer>
      </Container>
   );
}

const mapState = state => ({
   ...state.feedback,
});

const mapDispatch = {
   postFeedback,
   clearFeedback,
};

export default connect(
   mapState,
   mapDispatch,
)(FeedbackForm);
