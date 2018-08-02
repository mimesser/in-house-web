import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Button } from 'components';
import styled from 'styled-components';
import pageWrapper from 'utils/page-wrapper';

const InputContainer = styled.div`
   margin: 30px 0;
`;

function NotifyConfirm({ onConfirm }) {
   return (
      <div>
         <Typography T2>thanks</Typography>
         <InputContainer>
            <Typography P1>we will let you know when the platform is ready</Typography>
         </InputContainer>
         <Button I_3 onClick={onConfirm}>ok</Button>
      </div>
   );
}

NotifyConfirm.propTypes = {
   onConfirm: PropTypes.func.isRequired,
};

export default pageWrapper('0D')(NotifyConfirm);
