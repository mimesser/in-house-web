import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Button, Overlay } from 'components';
import styled from 'styled-components';
import pageWrapper from 'utils/page-wrapper';

const InputContainer = styled.div`
   margin: 30px 0;
`;

function RequestNewIndustryConfirmation({ onConfirm }) {
   return (
      <Overlay>
         <Typography T2>thank you</Typography>
         <InputContainer>
            <Typography P1>
               we will list your industry as soon as we get more <span>feedback</span> on the
               best categories to be rated
            </Typography>
         </InputContainer>
         <Button I_3 type="button" onClick={onConfirm}>ok</Button>
      </Overlay>
   );
}

RequestNewIndustryConfirmation.propTypes = {
   onConfirm: PropTypes.func.isRequired,
};

export default pageWrapper('7H.1')(RequestNewIndustryConfirmation);
