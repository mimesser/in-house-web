import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Text from '../../components/atoms/text/_index';

const SummaryRow = ({ text, value, style }) => (
  <div style={style}>
    <Text color="gray400" size={14} smSize={20} text={text} transform="uppercase" />
    <Text color="gray100" variant="light" size={14} smSize={20} text={value} />
  </div>
);

const Summary = ({ values, interests = [] }) => {
  const router = useRouter();
  const { user_type: userType } = router.query;
  return (
    <Styling>
      <SummaryRow text="name" value={values.name} />
      <SummaryRow text="email" value={values.email} />
      <SummaryRow text="comment" value={values.comment} />
      <SummaryRow text="heard about" value={values.heardAbout.label} />
      {userType === 'motivated' && (
        <SummaryRow
          text="interest"
          value={Object.keys(values.interest)
            .map((value) => interests.find((interest) => interest.value === value).label)
            .join(',\n')}
          style={{ marginTop: 30, maxWidth: 400 }}
        />
      )}
      <SummaryRow text="attachment" value={values.file?.name} />
    </Styling>
  );
};

const Styling = styled.div`
  > div {
    margin-top: 30px;
    & > p:first-child {
      margin-bottom: 8px;
    }
  }
`;

export default Summary;
