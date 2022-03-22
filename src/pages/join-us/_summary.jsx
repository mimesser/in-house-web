import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Text from '../../components/atoms/text/_index';

const Summary = ({ values }) => {
  const router = useRouter();
  const { user_type: userType } = router.query;
  return (
    <Styling>
      <div>
        <Text color="gray400" size={14} text="name" transform="uppercase" />
        <Text color="gray100" variant="light" size={14} text={values.name} />
      </div>
      <div>
        <Text color="gray400" size={14} text="email" transform="uppercase" />
        <Text color="gray100" variant="light" size={14} text={values.email} />
      </div>
      <div>
        <Text color="gray400" size={14} text="comment" transform="uppercase" />
        <Text color="gray100" variant="light" size={14} text={values.comment} />
      </div>
      <div>
        <Text color="gray400" size={14} text="heard about" transform="uppercase" />
        <Text color="gray100" variant="light" size={14} text={values.heardAbout.value} />
      </div>
      {userType === 'motivated' && (
        <div style={{ marginTop: 30, maxWidth: 400 }}>
          <Text color="gray400" size={14} text="interest" transform="uppercase" />
          <Text
            color="gray100"
            variant="light"
            size={14}
            text={Object.keys(values.interest).join(',\n')}
          />
        </div>
      )}
      <div>
        <Text color="gray400" size={14} text="attachment" transform="uppercase" />
        <Text color="gray100" variant="light" size={14} text={values.file?.name} />
      </div>
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
