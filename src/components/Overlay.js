import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const rotate360 = keyframes`
   from { opacity: 0; }
   to { opacity: 1; }
`;

const Wrapper = styled.div`
   position: fixed;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   z-index: 100;
   ${props => props.theme.N_1};
   display: flex;
   align-items: center;
   justify-content: center;
   animation: ${rotate360} 0.5s;
   /* transition: all 1s ease-out; */
`;

const CloseIcon = styled.i`
   position: absolute;
   top: -33px;
   right: -50px;
   font-size: 40px;
   color: ${props => props.theme.A_3};
   cursor: pointer;
   &:hover {
      color: ${props => props.theme.A_2};
   }
`;


const Content = styled.div`
   position: relative;
`;

export default function Overlay({ children, onClose }) {
   return (
      <Wrapper>
         <Content>
            {onClose &&
               <CloseIcon
                  onClick={onClose ? (() => onClose()) : undefined}
                  className="material-icons"
               >
                  close
               </CloseIcon>
            }
            {children}
         </Content>
      </Wrapper>
   );
}

Overlay.propTypes = {
   children: PropTypes.node,
   onClose: PropTypes.func,
};
