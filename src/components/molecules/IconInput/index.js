import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { ifProp } from '../../../utils';
import { Icon, Input } from '../../atoms';

const StyledInput = styled(Input)`
   font-size: 16px;
   padding: 12px 12px 12px 40px;
   width: 100%;
`;

const Wrapper = styled.div`
   display: flex;
   align-items: center;
   justify-content: ${ifProp('right', 'flex-end', 'flex-start')};
   width: 100%;
   height: 100%;
`;

const StyledIcon = styled(Icon)`
   border: none;
   position: absolute;
   color: #1a90e4;
   cursor: pointer;
   :hover {
      color: #0a80d4;
   }
`;

export const IconInput = ({ icon, onChange, ...props }) => {
   const { breakpoint, right, height } = props;
   const iconElement = <StyledIcon height={height ? height / 2.5 : undefined} icon={icon} />;
   return (
      <Wrapper>
         {!right && iconElement}
         <StyledInput {...props} onChange={evt => onChange(evt.target.value)} className="input" breakpoint={breakpoint} />
         {right && iconElement}
      </Wrapper>
   );
};

IconInput.propTypes = {
   icon: PropTypes.string.isRequired,
   responsive: PropTypes.bool,
   breakpoint: PropTypes.number,
   right: PropTypes.bool,
   height: PropTypes.number,
   onChange: PropTypes.func,
};

IconInput.defaultProps = {
   breakpoint: 960,
   responsive: false,
   right: false,
   height: 16,
   onChange: () => null,
};
