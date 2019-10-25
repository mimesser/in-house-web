/* eslint-disable react/jsx-no-target-blank */
import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Terms from '../Terms';

import { Heading, Checkbox, HelpTip } from '../../atoms';
import { font, fontWeight, fontSize, spacing, appBackground } from '../../../style';
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

const AgreementText = styled.span`
  margin-left: ${spacing.large};

  font: inherit;
  font-family: ${font.heading};
  font-size: ${fontSize.large};
`;

const LinkText = styled(AgreementText)`
  margin-left: 0;
  padding: 0;
  border: none;
  outline: none;
  background: none;
  cursor: pointer;
  text-decoration: underline;
`;

const HelpWrap = styled.div`
  background-color: ${appBackground};
  padding: ${spacing.xLarge};
  margin: 0 -${spacing.xLarge} ${spacing.xLarge};
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
      <HelpTip tip="don’t be a jerk">
        <HelpWrap>
          <Checkbox onChange={handleChange} checked={accepted} />
          <AgreementText>
            i agree to{' '}
            <LinkText as="button" onClick={() => showTermsModal(true)}>
              terms of use
            </LinkText>
          </AgreementText>
        </HelpWrap>
      </HelpTip>
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
