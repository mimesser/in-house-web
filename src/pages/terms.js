import React, { Component } from 'react';
import styled from 'styled-components';

import { Page } from '../components/templates';
import { SplashLayout, MultiStep, Step1, Step2, Step3, Step4, Step5 } from '../components/organisms';
import { Container, Heading } from '../components/atoms';

const Warning = styled.p`
   text-align: justify;
   text-decoration: underline;
   font-weight: 600;
`;
const P = styled.p`
   strong {
      font-weight: 600;
   }
   text-align: justify;
`;

class Terms extends Component {
   render() {
      return (
         <Page title="How It Works">
            <Container>
               <Heading>terms & conditions</Heading>
               <P>
                  <strong>Last Updated on July 4, 2019.</strong> These terms and conditions are effective immediately
                  for those registering accounts after July 4, 2019 and will become effective July 4, 2019 for those
                  with pre-existing accounts.
               </P>
               <P>
                  These terms and conditions, which we refer to as the <strong>“Terms,”</strong> govern your access to
                  and use of the website and mobile applications of Minklist Digital, LLC dba In-house.com, that link to
                  or reference these Terms, which we refer to collectively as the <strong>“Site.”</strong> By accessing
                  or using the Site, you are agreeing to the Terms and concluding a legally binding contract with
                  Minklist Digital, LLC, which we refer to as <strong>“Minklist,” “In-House,” “we”, “us”</strong> or
                  similar terms, a registered New York State corporation headquartered in Brooklyn, New York.
               </P>
               <Warning>
                  YOU SHOULD NOT ACCESS OR USE THE SITE IF YOU ARE UNWILLING OR UNABLE TO BE BOUND BY THE TERMS.
               </Warning>
            </Container>
         </Page>
      );
   }
}

export default Terms;
