/* eslint-disable react/jsx-no-target-blank */
import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Terms from '../Terms';

import { Heading, Checkbox } from '../../atoms';
import { font, fontWeight, fontSize, spacing, palette } from '../../../style';
import { acceptTerms } from '../../../store/aggregate';

const Layout = styled.div`
   display: flex;
   flex-direction: column;
   padding-top: ${spacing.xxLarge};

   > div {
      font-weight: ${fontWeight.bolder};
      margin-top: ${spacing.xxLarge};
      display: flex;
      align-items: center;
   }
`;
const LinkText = styled.button`
   display: inline-block;
   margin-left: ${spacing.large};
   color: ${palette.textDark};
   margin-left: ${spacing.large};
   border: none;
   outline: none;
   font: inherit;
   font-family: ${font.heading};
   font-size: ${fontSize.large};
   background: none;
   padding: 0;
   cursor: pointer;
   &:hover {
      text-decoration: underline;
   }
`;

const AcceptTerms = ({ acceptTerms }) => {
   const [accepted, setAccepted] = useState(false);
   const [termsModal, showTermsModal] = useState(false);
   const handleChange = () => {
      setAccepted(true);
      acceptTerms();
   };

   return (
      <Layout>
         <Terms open={termsModal} close={() => showTermsModal(false)} modal />
         <Heading>i agree to be fair</Heading>
         <div>to engage respectfully and offer the same objectivity and decency that i would hope for in return</div>
         <div>
            <Checkbox onChange={handleChange} checked={accepted} />
            <LinkText onClick={() => showTermsModal(true)}>i agree to terms of use</LinkText>
         </div>
      </Layout>
   );
};

const mapDispatch = {
   acceptTerms,
};
export default connect(
   undefined,
   mapDispatch,
)(AcceptTerms);
