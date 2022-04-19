import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { appColors, calcRem } from '../../../style';
import { Loader } from '../Loader';
import { Icon } from '../Icon';
import { truncateFileName } from '../../../utils/helpers/truncateFile';

// Todo - Improve structure - reference input component
const btnTheme = {
  light: {
    text: appColors.midnight,
    textActive: appColors.secondaryBlack,
    textOutline: appColors.gray200,
    textOutlineDisabled: appColors.gray500,
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

const dashedStyle = css`
  background-image: linear-gradient(to right, ${appColors.gray400} 60%, rgba(0, 0, 0, 0) 0%),
    linear-gradient(${appColors.gray400} 60%, rgba(0, 0, 0, 0) 0%),
    linear-gradient(to right, ${appColors.gray400} 60%, rgba(0, 0, 0, 0) 0%),
    linear-gradient(${appColors.gray400} 60%, rgba(0, 0, 0, 0) 0%);
  background-position: top, right, bottom, left;
  background-size: 20px 1px, 1px 20px;
  background-repeat: repeat-x, repeat-y;
`;

const ButtonBase = styled.button`
  min-width: 130px;
  position: relative;
  padding: ${calcRem(12)} ${calcRem(6)};
  font-size: ${calcRem(16)};
  font-weight: 700;
  font-size: ${calcRem(16)};
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
  width: 100%;

  .btn-children {
    margin: 0 4px;
    visibility: ${({ loading }) => loading && 'hidden'};
    &--prefix,
    &--suffix {
      display: inline-flex;
      position: relative;
      font-weight: 700;
      font-size: ${calcRem(16)};
      visibility: ${({ loading }) => loading && 'hidden'};
      align-items: center;
    }

    &--prefix {
      top: 3px;
      margin-right: 11px;
    }

    &--suffix {
      top: -1px;
      margin-left: 11px;
    }
  }

  .loader-container {
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    visibility: ${({ loading }) => !loading && 'hidden'};
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

  ${({ outlined, variant, disable, dashed }) =>
    outlined &&
    css`
      background: none;
      ${
        dashed
          ? dashedStyle
          : `border: 1px solid ${btnTheme[variant][`textOutline${disable ? 'Disabled' : ''}`]};`
      }
      

      color: ${btnTheme[variant][`textOutline${disable ? 'Disabled' : ''}`]};

      .loader span {
        background-color: ${btnTheme[variant][`textOutline${disable ? 'Disabled' : ''}`]};
      }

      &:hover {
        background: none;
        ${
          dashed
            ? dashedStyle
            : `border: ${!disable && `1px solid ${btnTheme[variant].outlineHover}`};`
        }
        color: ${!disable && btnTheme[variant].outlineHover};
      }

      &:active {
        background: none;
        ${
          dashed
            ? dashedStyle
            : `border: ${
                !disable &&
                `1px solid ${btnTheme[variant === 'dark' ? 'light' : 'dark'].textActive}`
              };`
        }
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
  return (
    <ButtonBase
      {...props}
      disable={disabled}
      aria-disabled={disabled}
      variant={variant}
      onClick={disabled || loading ? undefined : onClick}
      loading={loading}
    >
      {loading && (
        <div className="loader-container">
          <Loader className="loader" small />
        </div>
      )}
      <>
        <div className="btn-children">
          {props.prefix && <span className="btn-children--prefix">{props.prefix}</span>}
          {text || children}
        </div>
        {!props.noSuffix &&
          (props.suffix ? (
            <span className="btn-children--suffix">{props.suffix}</span>
          ) : (
            <Icon icon="arrow-right" className="btn-children--suffix" />
          ))}
      </>
    </ButtonBase>
  );
};

const CTABtnStyling = styled(Button)`
  color: ${appColors.gray100};
  background-color: ${appColors.gray500};
  &:hover {
    background-color: rgba(203, 203, 203, 0.5);
  }

  &:active {
    color: #ffffff;
    background-color: rgba(203, 203, 203, 0.7);
  }
  max-width: 351px;
  text-align: center;
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

export const BackButton = (props) => (
  <Button text="back" {...props} noBorder prefix={<Icon icon="arrow-left" />} noSuffix />
);

const IconButtonStyling = styled.button`
  border: none;
  background: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  color: ${({ variant }) => {
    if (variant) {
      return variant === 'dark' ? appColors.midnight : appColors.gray200;
    }
    return 'inherit';
  }};

  &:hover {
    color: ${appColors.gray300};
  }

    &:active {
      color: ${({ variant }) => {
        if (variant) {
          return variant === 'dark' ? appColors.secondaryBlack : appColors.white;
        }
        return 'inherit';
      }}

`;

export const IconButton = ({ icon, variant, containerProps, ...props }) => (
  <IconButtonStyling {...containerProps} variant={variant}>
    <Icon icon={icon} {...props} />
  </IconButtonStyling>
);

const UploadButtonStyling = styled.div`
  > input {
    display: none;
  }
  > button {
    padding: ${calcRem(9.5)} ${calcRem(6)};
  }
`;

export const UploadButton = (props) => {
  const inputRef = useRef(null);
  const [file, setFile] = useState({});

  const onClick = () => {
    if (inputRef?.current) {
      inputRef.current.click();
    }
  };

  const handleChange = (event) => {
    if (props?.onChange) props.onChange(event);
    setFile(event.target.files[0]);
  };

  return (
    <UploadButtonStyling>
      <input type="file" {...props} ref={inputRef} onChange={handleChange} />
      <Button
        type="button"
        prefix={<Icon icon="attachment" />}
        suffix={<Icon icon="plus" />}
        onClick={onClick}
        outlined
        text={
          <span style={{ fontSize: 14, color: appColors.gray400 }}>
            {(file?.name && truncateFileName(file?.name)) || props.placeholder || 'Select file...'}
          </span>
        }
        dashed
        variant={props.variant}
        style={props.style}
      />
    </UploadButtonStyling>
  );
};

Button.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  variant: PropTypes.oneOf(['dark', 'light']),
  outlined: PropTypes.bool,
  noBorder: PropTypes.bool,
  disabled: PropTypes.bool,
  wide: PropTypes.bool,
  noSuffix: PropTypes.bool,
  dashed: PropTypes.bool,
};

IconButton.propTypes = {
  variant: PropTypes.oneOf(['dark', 'light']),
  icon: PropTypes.oneOf(['arrow-right', 'arrow-left', 'x', 'search']),
  size: PropTypes.number,
  color: PropTypes.string,
};

export default Button;
