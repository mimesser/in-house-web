import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';

import { H1, H2, Input } from '../../atoms';
import { WinkConfirmation, CounterInput } from '../../molecules';
import { FormGroup, Container, Commands, Dropdown, SubmitButton, BackButton, LeftArrowIcon } from './style';
import { postFeedback, clearFeedback } from '../../../store/feedback';

const subjectOptions = [
  '-- select subject --',
  'get notified when live',
  'request new industry poll',
  'list your warehouse',
  'list your hospital',
  'list your supermarket',
  'list something else',
  'join our team / movement',
  'strategic partnership',
  'technical difficulty',
  'criticism / hate',
  'general feedback',
  'other',
].map((value) => ({
  label: value,
  value,
}));

function FeedbackForm(props) {
  const subjectId = props.subjectIndex || 0;
  const { redirectLink } = props;
  const [subject, setSubject] = useState(subjectOptions[subjectId]);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const getHandler = (setter) => (event) => setter(event.target.value);
  const handleSubjectChange = (value) => setSubject(value);
  const handleEmailChange = getHandler(setEmail);
  const router = useRouter();

  const submit = () => {
    props.postFeedback({ email, subject: subject.value, message, redirectLink });
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
      <Commands>
        <BackButton inverse onClick={() => router.back()}>
          <LeftArrowIcon icon="arrow-left" />
          back
        </BackButton>
        <SubmitButton disabled={!valid} onClick={submit} icon="arrow-right" loading={props.loading}>
          send
        </SubmitButton>
      </Commands>
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
