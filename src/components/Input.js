import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Icon } from 'components';
import baseComponent from './base-component';

const BaseComponent = baseComponent('input');

const Wrapper = BaseComponent.extend`
   padding: 6px;
   width: ${props => props.width};
   ${props => props.search && css`
      padding: 14px 18px;
   `}
`;

const Container = styled.div`
   position: relative;
   i {
      right: 7px;
      position: absolute;
      color: ${props => props.theme.A_3};
      top: 7px;
      font-size: 31px;
   }
`;

export default function Input({ onChange, ...props }) {
   function changeHandler({ target: { value } }) {
      onChange(value);
   }

   const comp = <Wrapper {...props} onChange={changeHandler} />;

   if (!props.search) return comp;

   return (
      <Container>
         {comp}
         <Icon>search</Icon>
      </Container>
   );
}

Input.propTypes = {
   onChange: PropTypes.func.isRequired,
   width: PropTypes.string,
   search: PropTypes.bool,
};

Input.defaultProps = {
   width: 'auto',
};
