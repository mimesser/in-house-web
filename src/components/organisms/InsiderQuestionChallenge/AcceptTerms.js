/* eslint-disable react/jsx-no-target-blank */
import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Terms from '../Terms';

import { H1, Checkbox, HelpTip } from '../../atoms';
import { font, fontWeight, fontSize, spacing, appBackground } from '../../../style';
import { acceptTerms } from '../../../store/aggregate';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: ${spacing.xxl};

  > div {
    font-weight: ${fontWeight.bold};
    margin-top: ${spacing.xxl};
    display: flex;
    align-items: center;
  }
`;

const AgreementText = styled.span`
  margin-left: ${spacing.lg};

  font: inherit;
  font-family: ${font.primary};
  font-size: ${fontSize.lg};
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
  padding: ${spacing.xl};
  margin: 0 -${spacing.xl} ${spacing.xl};
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
      <H1>i agree to be fair</H1>
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
