import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Input, Button } from 'components';
import styled from 'styled-components';
import pageWrapper from 'utils/page-wrapper';

const InputContainer = styled.div`
   margin: 30px 0;
`;

function NotifyMe({ email, onSubmit, onEmailChange }) {
   return (
      <form onSubmit={onSubmit}>
         <Typography T2>notify me when live</Typography>
         <InputContainer>
            <Input
               E_1
               type="email"
               placeholder="email"
               width="260px"
               value={email}
               onChange={onEmailChange}
            />
         </InputContainer>
         <Button I_3 type="submit">submit</Button>
      </form>
   );
}

NotifyMe.propTypes = {
   email: PropTypes.string.isRequired,
   onSubmit: PropTypes.func.isRequired,
   onEmailChange: PropTypes.func.isRequired,
};

export default pageWrapper('0C')(NotifyMe);
