/* eslint-disable react/jsx-no-target-blank */
import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Terms from '../Terms';

import { H1, Checkbox, HelpTip, ClearButton, Button } from '../../atoms';
import { spacing, appBackground, calcRem, palette } from '../../../style';
import { acceptTerms } from '../../../store/aggregate';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-top: ${spacing.xxl};

  > ${Button} {
    margin-top: auto;
    align-self: flex-start;
  }
`;

const TermsLink = styled(ClearButton)`
  margin-top: ${spacing.xl};
  margin-left: ${calcRem('36px')};
  color: ${palette.gray};
`;

const HelpWrap = styled.div`
  background-color: ${appBackground};
  margin-top: ${spacing.xxxl};
`;

const AcceptTerms = ({ acceptTerms }) => {
  const [accepted, setAccepted] = useState(false);
  const [termsModal, showTermsModal] = useState(false);
  const handleChange = () => setAccepted(!accepted);

  return (
    <Layout>
      {termsModal && <Terms close={() => showTermsModal(false)} modal />}
      <H1>i agree to be fair</H1>
      <HelpTip tip="don’t be a jerk">
        <HelpWrap>
          <Checkbox onChange={handleChange} checked={accepted}>
            to engage respectfully and offer the same objectivity and decency that i would hope for in return
          </Checkbox>
        </HelpWrap>
      </HelpTip>
      <TermsLink onClick={() => showTermsModal(true)}>review terms of service</TermsLink>
      <Button disabled={!accepted} icon="arrow-right" onClick={acceptTerms}>
        continue
      </Button>
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
