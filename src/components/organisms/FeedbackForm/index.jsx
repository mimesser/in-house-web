import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import Text from '../../atoms/text/_index';
import { WinkConfirmation, CounterInput } from '../../molecules';
import Button from '../../atoms/Button/_index';
import { FormGroup, Container, Commands, SubmitButton, LeftArrowIcon, FieldsGroup } from './style';
import Input from '../../atoms/Input/_index';
import { postFeedback, clearFeedback } from '../../../store/feedback';
import { isEmailValid } from '../../../utils/index';
import { feedbackPageOptions } from '../../../constants';
import { appColors } from '../../../style';

const subjectOptions = feedbackPageOptions.map((value) => ({
  label: value,
  value,
}));

function FeedbackForm(props) {
  const subjectId = props.subjectIndex || 0;
  const { redirectLink } = props;
  const [subject, setSubject] = useState(null);
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
    setSubject(null);
    setEmail('');
    setMessage('');
  };

  useEffect(() => setValidity(!subject && !!message && (!email || isEmailValid(email))), [
    subject,
    email,
    message,
  ]);

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
        lineHeight={39}
        smSize={45}
        smLineHeight={55}
        mdSize={54}
        mdLineHeight={66}
        color={appColors.gray100}
        level={1}
        text="contact us"
      />
      <Text
        size={16}
        lineHeight={20}
        smSize={20}
        smLineHeight={24}
        className="description"
        style={{ maxWidth: 650 }}
        color={appColors.gray100}
        text={`all communications are strictly confidential`}
      />

      <FieldsGroup>
        <Input.Select
          variant="light"
          placeholder="subject"
          options={subjectOptions}
          onChange={handleSubjectChange}
          value={subject}
        />
        <CounterInput
          variant="light"
          multiline
          marginless
          disabled={!subject}
          value={message}
          onChange={setMessage}
          max={500}
          placeholder="type something"
          rows={4}
        />
        <FormGroup marginless>
          <Input
            variant="light"
            value={email}
            disabled={!subject}
            onChange={handleEmailChange}
            placeholder="email"
            type="email"
            style={{ width: '351px' }}
          />
        </FormGroup>
        {props.error && <FormGroup>{props.error}</FormGroup>}
      </FieldsGroup>
      <Commands>
        <Button
          noBorder
          variant="light"
          suffix=" "
          onClick={() => router.back()}
          style={{ flexGrow: 0, paddingLeft: 0 }}
        >
          cancel
        </Button>
        <Button
          disabled={!valid}
          onClick={submit}
          variant="light"
          icon="arrow-right"
          loading={props.loading}
          text="send"
          style={{
            width: '134px',
            backgroundColor: valid ? undefined : appColors.gray600,
            borderColor: appColors.gray300,
            borderStyle: 'solid',
            borderWidth: '1px',
          }}
        />
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
