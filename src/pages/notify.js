import React, { useState } from 'react';
import axios from 'axios';
import { Page } from '../components/templates';
import { Heading, Input } from '../components/atoms';
import { NotifyLayout, SubmitButton } from '../components/organisms';
import { isEmailValid } from '../utils/validation';

const Notify = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  async function submit() {
    setLoading(true);
    try {
      // TODO: use api for this as well?
      await axios.post(
        'https://inhouseprelaunch.azurewebsites.net/api/emails?code=38xRjN0xPdUIrAgYiwyBHeaEoL29X4IgfiHKltRAW8dvrezWRaeg7A==',
        { email },
      );
    } finally {
      setSubmitted(true);
    }
  }

  const emailValid = isEmailValid(email);

  return (
    <Page title="In-House">
      {submitted ? (
        <NotifyLayout>
          <Heading>thank you!</Heading>
          <p>we’ll let you know when we go live!</p>
        </NotifyLayout>
      ) : (
        <NotifyLayout>
          <Heading>notify me</Heading>
          <p>we’ll let you know when we go live!</p>
          <Input
            disabled={loading}
            value={email}
            onChange={event => setEmail(event.target.value)}
            placeholder="Email"
            type="email"
          />
          <SubmitButton visible={emailValid} disabled={!emailValid || loading} onClick={submit}>
            send
          </SubmitButton>
        </NotifyLayout>
      )}
    </Page>
  );
};

export default Notify;
