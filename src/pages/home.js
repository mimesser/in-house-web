import React, { useState } from 'react';
import axios from 'axios';
import { Page } from '../components/templates';
import { Container, Heading, Input, Button } from '../components/atoms';
import { NotifyLayout } from '../components/organisms';

const Home = () => {
   const [submitted, setSubmitted] = useState(false);
   const [loading, setLoading] = useState(false);
   const [email, setEmail] = useState('');

   async function submit() {
      setLoading(true);
      try {
         await axios.post('https://inhouseprelaunch.azurewebsites.net/api/emails?code=m7WcoGFdsWppZXKb8DvbMKWiRDbBfhtgFlFCyqertPPuYdY8YJgCCg==', { email });
      } finally {
         setSubmitted(true);
      }
   }

   return (
      <Page title="Home Page">
         <Container>
            {submitted ? (
               <>
                  <Heading>thank you!</Heading>
                  <p>we’ll let you know when we go live!</p>
               </>
            ) : (
               <NotifyLayout>
                  <Heading>notify me</Heading>
                  <p>we’ll let you know when we go live!</p>
                  <Input disabled={loading} value={email} onChange={event => setEmail(event.target.value)} placeholder="Email or mobile" />
                  <Button disabled={!email} onClick={submit}>
                     send
                  </Button>
               </NotifyLayout>
            )}
         </Container>
      </Page>
   );
};

export default Home;
