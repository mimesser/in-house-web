import React, { useState } from 'react';
import axios from 'axios';
import { Page } from '../components/templates';
import { Container, Heading, Input } from '../components/atoms';
import { NotifyLayout, SubmitButton } from '../components/organisms';

const isEmailValid = email => {
   // eslint-disable-next-line
   const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   return re.test(String(email).toLowerCase());
};

const Notify = () => {
   const [submitted, setSubmitted] = useState(false);
   const [loading, setLoading] = useState(false);
   const [email, setEmail] = useState('');

   async function submit() {
      setLoading(true);
      try {
         await axios.post(
            'https://inhouseprelaunch.azurewebsites.net/api/emails?code=m7WcoGFdsWppZXKb8DvbMKWiRDbBfhtgFlFCyqertPPuYdY8YJgCCg==',
            { email },
         );
      } finally {
         setSubmitted(true);
      }
   }

   const emailValid = isEmailValid(email);

   return (
      <Page title="In-House">
         <Container>
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
         </Container>
      </Page>
   );
};

export default Notify;
