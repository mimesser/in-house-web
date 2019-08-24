import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Heading, Input, Dropdown, Loader } from '../../atoms';
import { WinkConfirmation, CounterInput } from '../../molecules';
import { Modal } from '../Modal';
import { ButtonContainer, FormGroup, Container, SubmitButton } from './style';
import { postFeedback, clearFeedback } from '../../../store/feedback';

const subjectOptions = ['request new beta house', 'technical issue', 'general feedback', 'other issue'].map(value => ({
  label: value,
  value,
}));

function FeedbackForm(props) {
  const [subject, setSubject] = useState(undefined);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const getHandler = setter => event => setter(event.target.value);
  const handleSubjectChange = value => setSubject(value);
  const handleEmailChange = getHandler(setEmail);

  const submit = () => {
    props.postFeedback({ email, subject: subject.value, message });
  };

  const clear = () => {
    setSubject('');
    setEmail('');
    setMessage('');
  };

  const valid = !!subject && !!message;

  /**
   * TODO: after submission, the form should clear.
   * Find a better way to do this.
   * * Maybe put form variables in Redux.
   * * Maybe have an onClose event on the Modal.
   */
  if (props.success && subject) {
    clear();
  }

  return (
    <Container>
      <Modal
        open={props.success || props.loading}
        closeModal={clear}
        inverse
        canDismiss={false}
        canClose={false}
        title="Success!"
      >
        {props.loading ? <Loader white /> : <WinkConfirmation />}
      </Modal>
      <Heading>let us know</Heading>
      <FormGroup>we keep everything confidential</FormGroup>
      <FormGroup>
        <Dropdown value={subject} placeholder="subject" options={subjectOptions} onChange={handleSubjectChange} />
      </FormGroup>
      <CounterInput
        multiline
        disabled={!subject}
        value={message}
        onChange={setMessage}
        max={500}
        placeholder="type something"
        rows={4}
      />
      <FormGroup>
        <Input
          value={email}
          disabled={!subject || !message}
          onChange={handleEmailChange}
          placeholder="email (if you want a reply)"
          type="email"
        />
      </FormGroup>
      {props.error && <FormGroup>{props.error}</FormGroup>}
      <ButtonContainer>
        <SubmitButton visible={valid} onClick={submit}>
          send
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
