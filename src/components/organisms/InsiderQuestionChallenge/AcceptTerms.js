/* eslint-disable react/jsx-no-target-blank */
import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Link from 'next/link';

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

      a {
         font-family: ${font.heading};
         font-size: ${fontSize.large};
         text-decoration: none;
         color: ${palette.textDark};
         margin-left: ${spacing.large};
      }
   }
`;

const AcceptTerms = ({ acceptTerms }) => {
   const [accepted, setAccepted] = useState(false);
   const handleChange = () => {
      setAccepted(true);
      acceptTerms();
   };

   return (
      <Layout>
         <Heading>i agree to be fair</Heading>
         <div>to engage respectfully and offer the same objectivity and decency that i would hope for in return</div>
         <div>
            <Checkbox onChange={handleChange} checked={accepted} />
            <Link href="/terms">
               {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
               <a target="_blank">i agree to terms of use</a>
            </Link>
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
