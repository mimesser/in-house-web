/* eslint-disable react/jsx-no-target-blank */
import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Terms from '../Terms';

import { H1, Checkbox, HelpTip, ClearButton, Button } from '../../atoms';
import { spacing, appBackground, calcRem, palette } from '../../../style';
import { acceptTerms } from '../../../store/aggregate';
import { selectSelectedVenue } from '../../../store/venues';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: ${spacing.xxl};

  > ${Button} {
    margin-top: auto;
    align-self: flex-end;
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

const Header = styled.div`
  padding-bottom: ${spacing.xxl};
  text-transform: uppercase;
`;

const AcceptTerms = ({ acceptTerms, house }) => {
  const [accepted, setAccepted] = useState(false);
  const [termsModal, showTermsModal] = useState(false);
  const handleChange = () => setAccepted(!accepted);

  return (
    <Layout>
      {termsModal && <Terms close={() => showTermsModal(false)} modal />}
      <Header>{house}</Header>
      <H1>haters beware</H1>
      <HelpTip tip="don’t be a jerk">
        <HelpWrap>
          <Checkbox onChange={handleChange} checked={accepted}>
            i agree to engage respectfully with the same objectivity and decency that i would expect in return, and i
            understand that any actions by me that this platform deems intentionally malicious, corrupting, or confusing
            will be removed and that my ability to access this platform in the future may be permanently blocked.
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
  venue: selectSelectedVenue,
  acceptTerms,
};
export default connect(undefined, mapDispatch)(AcceptTerms);
