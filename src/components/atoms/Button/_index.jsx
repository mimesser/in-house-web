import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { appColors, calcRem } from '../../../style';
import { Loader } from '../Loader';
import { Icon } from '../Icon';

const btnTheme = {
  light: {
    text: appColors.midnight,
    textActive: appColors.secondaryBlack,
    textOutline: appColors.gray200,
    bg: appColors.gray200,
    bgActive: appColors.white,
    textDisabled: appColors.gray400,
    bgDisabled: appColors.gray500,
    hover: appColors.gray300,
    outlineHover: appColors.gray300,
  },
  dark: {
    text: appColors.gray100,
    textOutline: appColors.gray500,
    textOutlineDisabled: appColors.gray300,
    textActive: appColors.white,
    bg: appColors.midnight,
    bgActive: appColors.midnight,
    textDisabled: appColors.gray100,
    bgDisabled: appColors.gray300,
    hover: appColors.gray500,
    outlineHover: appColors.gray400,
  },
};

const ButtonBase = styled.button`
  min-width: 89px;
  padding: ${calcRem(12)} ${calcRem(4)};
  font-size: ${calcRem(16)};
  font-weight: 700;
  cursor: ${({ disable }) => (disable ? 'not-allowed' : 'pointer')};
  transition: color 0.35s ease-in-out, background-color 0.35s ease-in-out;
  border: none;
  background-color: ${({ variant, disable }) => {
  return btnTheme[variant][`bg${disable ? 'Disabled' : ''}`];
}};
  color: ${({ variant, disable }) => btnTheme[variant][`text${disable ? 'Disabled' : ''}`]};
  display: inline-flex;
  justify-content: ${({ noSuffix, prefix }) => (noSuffix && !prefix ? 'center' : 'space-between')};
  align-items: center;
  width: ${({ wide }) => wide && '100%'};

  .btn-children {
    margin: 0 4px;
    &--prefix {
      margin-right: 11px;
    }
  }

  .loader span {
    background-color: ${({ variant, disable }) =>
  btnTheme[variant][`text${disable ? 'Disabled' : ''}`]};
  }

  &:hover {
    background-color: ${({ variant, disable }) => !disable && btnTheme[variant].hover};
  }

  &:active {
    background-color: ${({ variant, disable }) => !disable && btnTheme[variant].bgActive};
    color: ${({ variant, disable }) => !disable && btnTheme[variant].textActive};
  }

  ${({ outline, variant, disable, dashed }) =>
    outline &&
    css`
      background: none;
      border: 1px
        ${`${dashed ? 'dashed' : 'solid'} ${
          btnTheme[variant][`textOutline${disable ? 'Disabled' : ''}`]
        }`};
      color: ${btnTheme[variant][`textOutline${disable ? 'Disabled' : ''}`]};

      .loader span {
        background-color: ${btnTheme[variant][`textOutline${disable ? 'Disabled' : ''}`]};
      }

      &:hover {
        background: none;
        border: ${!disable &&
        `1px ${dashed ? 'dashed' : 'solid'} ${btnTheme[variant].outlineHover}`};
        color: ${!disable && btnTheme[variant].outlineHover};
      }

      &:active {
        background: none;
        border: ${!disable &&
        `1px ${dashed ? 'dashed' : 'solid'} ${
          btnTheme[variant === 'dark' ? 'light' : 'dark'].textActive
        }`};
        color: ${!disable && btnTheme[variant === 'dark' ? 'light' : 'dark'].textActive};
      }
    `}

  ${({ noBorder, variant, disable }) =>
          noBorder &&
    css`
      border: none;
      background: none;
      color: ${btnTheme[variant][`textOutline${disable ? 'Disabled' : ''}`]};

      .loader span {
        background-color: ${btnTheme[variant][`textOutline${disable ? 'Disabled' : ''}`]}};
      }

      &:hover {
        background: none;
        border: none;
        color: ${!disable && btnTheme[variant].outlineHover};
      }

      &:active {
        background: none;
        border: none;
        color: ${!disable && btnTheme[variant === 'dark' ? 'light' : 'dark'].textActive};
      }
    `}
`;

const Button = ({ text, children, variant = 'dark', disabled, loading, onClick, ...props }) => {
  console.log(disabled, loading);
  return (
    <ButtonBase
      {...props}
      disable={disabled}
      aria-disabled={disabled}
      variant={variant}
      onClick={disabled || loading ? undefined : onClick}
    >
      {loading ? (
        <Loader className="loader" small />
      ) : (
        <>
          <div className="btn-children">
            {props.prefix && <span className="btn-children--prefix">{props.prefix}</span>}
            {text || children}
          </div>
          {!props.noSuffix && (props.suffix ?? <Icon icon="arrow-right" />)}
        </>
      )}
    </ButtonBase>
  );
};

const CTABtnStyling = styled(Button)`
  color: #d9d9d9;
  background-color: rgba(203, 203, 203, 0.3);

  &:hover {
    background-color: rgba(203, 203, 203, 0.5);
  }

  &:active {
    color: #ffffff;
    background-color: rgba(203, 203, 203, 0.7);
  }
`;

export const CTAButton = (props) => (
  <CTABtnStyling
    {...props}
    prefix={false}
    variant="light"
    noSuffix
    dashed={false}
    outlined={false}
  />
);

Button.propTypes = {
  text: PropTypes.string,
  variant: PropTypes.oneOf(['dark', 'light']),
  outlined: PropTypes.bool,
  noBorder: PropTypes.bool,
  disabled: PropTypes.bool,
  wide: PropTypes.bool,
  noSuffix: PropTypes.bool,
  dashed: PropTypes.bool,
};

export default Button;
