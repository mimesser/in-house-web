import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';

import { H1, H2, Input } from '../../atoms';
import Text from '../../atoms/text/_index';
import { WinkConfirmation, CounterInput } from '../../molecules';
import {
  FormGroup,
  Container,
  Commands,
  Dropdown,
  SubmitButton,
  BackButton,
  LeftArrowIcon,
} from './style';
import { postFeedback, clearFeedback } from '../../../store/feedback';
import { isEmailValid } from '../../../utils/index';
import { feedbackPageOptions } from '../../../constants';

const subjectOptions = ['-- select subject --', ...feedbackPageOptions].map((value) => ({
  label: value,
  value,
}));

function FeedbackForm(props) {
  const subjectId = props.subjectIndex || 0;
  const { redirectLink } = props;
  const [subject, setSubject] = useState(subjectOptions[subjectId]);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [valid, setValidity] = useState(false);
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

  useEffect(
    () =>
      setValidity(
        subject.value !== subjectOptions[0].value && !!message && (!email || isEmailValid(email)),
      ),
    [subject, email, message],
  );

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
      <Text.Heading
              className="section--heading-title"
              variant="light"
              weight="bold"
              size={32}
              color="grey600"
              level={1}
              text="contact us"
            />
      <br />
      <Text
              size={14}
              className="description"
              style={{ maxWidth: 650 }}
              color="grey600"
              text={`all communications are strictly confidential`}
            />
      <br />
      <Dropdown
        value={subject}
        placeholder="subject"
        options={subjectOptions}
        onChange={handleSubjectChange}
      />
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
          placeholder="email"
          type="email"
        />
      </FormGroup>
      {props.error && <FormGroup>{props.error}</FormGroup>}
      <Commands>
        <BackButton inverse onClick={() => router.back()}>cancel
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
