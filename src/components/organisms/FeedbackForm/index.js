import React, { useState } from 'react';
import { connect } from 'react-redux';

import { H1, H2, Input, Dropdown } from '../../atoms';
import { WinkConfirmation, CounterInput } from '../../molecules';
import { FormGroup, Container, SubmitButton } from './style';
import { postFeedback, clearFeedback } from '../../../store/feedback';

const subjectOptions = [
  'notify when live',
  'list your house',
  'technical issue',
  'general feedback',
  'other issue',
].map((value) => ({
  label: value,
  value,
}));

function FeedbackForm(props) {
  const [subject, setSubject] = useState(undefined);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const getHandler = (setter) => (event) => setter(event.target.value);
  const handleSubjectChange = (value) => setSubject(value);
  const handleEmailChange = getHandler(setEmail);

  const submit = () => {
    props.postFeedback({ email, subject: subject.value, message });
  };

  const clear = () => {
    setSubject('');
    setEmail('');
    setMessage('');
  };

  const valid = !!subject && (!!message || !!email);

  /**
   * TODO: after submission, the form should clear.
   * Find a better way to do this.
   * * Maybe put form variables in Redux.
   * * Maybe have an onClose event on the Modal.
   */
  if (props.success && subject) {
    clear();
  }

  if (props.success) {
    return <WinkConfirmation />;
  }

  return (
    <Container>
      <H1>let us know</H1>
      <H2>we keep everything confidential</H2>
      <Dropdown value={subject} placeholder="subject" options={subjectOptions} onChange={handleSubjectChange} />
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
          disabled={!subject}
          onChange={handleEmailChange}
          placeholder="email (if you want a reply)"
          type="email"
        />
      </FormGroup>
      {props.error && <FormGroup>{props.error}</FormGroup>}
      <SubmitButton disabled={!valid} onClick={submit} icon="arrow-right" loading={props.loading}>
        send
      </SubmitButton>
    </Container>
  );
}

const mapState = (state) => ({
  ...state.feedback,
});

const mapDispatch = {
  postFeedback,
  clearFeedback,
};

export default connect(mapState, mapDispatch)(FeedbackForm);
