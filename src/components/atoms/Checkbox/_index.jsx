import React, { useRef } from 'react';
import styled from 'styled-components';
import { appColors } from '../../../style';

export const Checkbox = ({ variant = 'light', ...props }) => {
  const inputRef = useRef(null);

  const toggle = () => {
    if (inputRef.current !== null) {
      inputRef.current.click();
    }
  };

  return (
    <CheckboxStyle variant={variant} role="checkbox" tabIndex={0} {...props} onClick={toggle}>
      <input
        id={props.name}
        type="checkbox"
        name={props.name}
        onChange={props.onChange}
        disabled={props.disabled}
        checked={props.checked}
        ref={inputRef}
      />
      <label role="presentation" htmlFor={props.name} onClick={toggle} />
      <>
        {React.Children.map(props.children, (child) => {
          return props?.children && React.cloneElement(child, { variant, ...child.props });
        })}
      </>
    </CheckboxStyle>
  );
};

const CheckboxStyle = styled.div`
  --svg-size: 24px;
  display: inline-flex;
  align-items: center;
  width: fit-content;

  > label {
    margin-right: 21px;
    cursor: ${(props) => (props?.disabled ? 'not-allowed' : 'pointer')};
  }

  > input {
    display: none;
  }

  > input[type='checkbox'] + label {
    border: 3px solid
      ${({ variant }) => (variant === 'light' ? appColors.gray300 : appColors.gray600)};
    height: var(--svg-size);
    min-width: var(--svg-size);
    max-width: var(--svg-size);
    display: inline-block;
  }

  > input[type='checkbox']:checked + label {
    color: ${({ variant }) => (variant === 'light' ? appColors.gray300 : appColors.gray600)};
    border: 3px solid
      ${({ variant }) => (variant === 'light' ? appColors.gray100 : appColors.gray600)};
    background-color: ${({ variant }) =>
      variant === 'light' ? appColors.gray100 : appColors.gray600};
    background-size: 18px;
    background-image: url('/static/checked.png');
    background-position-y: 2px;
    background-repeat: no-repeat;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
`;
