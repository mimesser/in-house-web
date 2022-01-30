import * as React from 'react';
import { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { omit } from 'lodash';
import Select from 'react-select';
import { appColors, calcRem } from '../../../style';
import { Icon } from '../Icon';

const inputStyleStates = {
  DEFAULT: { dark: appColors.gray400, light: appColors.gray400 },
  ACTIVE: { dark: appColors.gray600, light: appColors.gray100 },
  ERROR: { dark: appColors.gray600, light: appColors.gray100 },
  FILLED: { dark: appColors.gray500, light: appColors.gray300 },
  DISABLED: { dark: appColors.gray200, light: appColors.gray500 },
};

/**
 * Pull colors for input style states accordingly
 * @param {'light' | 'dark'} variant
 * @param {"DEFAULT" | "ACTIVE" | "ERROR" | "FILLED" | "DISABLED" } key
 * @returns {string}
 */
const getColor = (variant = 'dark', key = 'DEFAULT') => {
  return inputStyleStates[key][variant];
};

const TextController = (props) => {
  const { label, id, name, helpText, maxChars, children, onChange } = props;
  const [inValue, setValue] = useState(props?.value || '');
  const inputRef = useRef(null);

  const tMax = typeof maxChars === 'number' ? maxChars : maxChars?.maxChars;

  const onChangeCallBack = (res, meta) => {
    const e = res?.target ? res : { target: { name: meta.name, value: res, meta } };

    if (tMax && inputRef.current.value.length <= tMax) {
      setValue(e.target.value);
      if (props?.onChange) props.onChange(e);
    }
    if (onChange && !tMax) {
      setValue(e.target.value);
      props.onChange(e);
    }
  };

  const clearInputValue = useCallback(() => {
    if (props.type !== 'search') {
      if (inputRef.current) {
        inputRef.current.value = '';
        setValue('');
        if (props?.onChange) onChange({ target: inputRef.current });
      }
    }
  }, [props?.value]);

  const ExtendedChild = React.Children.map(children, (child) => {
    if (child) {
      return React.cloneElement(
        child,
        {
          ...child.props,
          ...props,
          // value: inValue || props?.value,
          onChange: onChangeCallBack,
          ref: inputRef,
        },
        null,
      );
    }
  });

  return (
    <BaseStyling {...props}>
      {label && <label htmlFor={id || name}>{label}</label>}
      <span className="base-input-container">
        {ExtendedChild}
        {((props?.clearable && inValue) || props?.type === 'search') && (
          <button className="base-input-container--clearable" onClick={clearInputValue}>
            <Icon icon={props.type === 'search' ? 'search' : 'x'} />
          </button>
        )}
      </span>
      <div className="base-input--bottom">
        {helpText && <span>{helpText}</span>}
        {maxChars && <span>{`${inValue.length}/${tMax}`}</span>}
      </div>
    </BaseStyling>
  );
};

const Input = ({ ...props }) => {
  return (
    <TextController {...props}>
      <InputStyling as="input" />
    </TextController>
  );
};

const ISelect = ({ options, disabled, ...props }) => {
  return (
    <TextController {...props} maxChars={false}>
      <Select
        className="base-input-container"
        classNamePrefix="base-input"
        blurInputOnSelect
        options={options}
        dropDownIndicator={<Icon icon="angle-down" />}
        menuPlacement="auto"
        isDisabled={disabled}
      />
    </TextController>
  );
};

const TextArea = (props) => {
  return (
    <TextController {...props}>
      <TextAreaStyling as="textarea" />
    </TextController>
  );
};

const inputBasePropType = {
  variant: PropTypes.oneOf(['light', 'dark']),
  helpText: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  error: PropTypes.bool,
  maxChars: PropTypes.oneOfType([
    PropTypes.shape({ strict: PropTypes.bool, maxChars: PropTypes.number }),
    PropTypes.number,
  ]),
  clearable: PropTypes.bool,
};

Input.propTypes = inputBasePropType;
TextArea.propTypes = omit(inputBasePropType, ['clearable']);
ISelect.propTypes = omit(inputBasePropType, ['maxChars', 'clearable']);

Input.Select = ISelect;
Input.TextArea = TextArea;

const BaseStyling = styled.div`
  margin: 0;
  transition: color 0.3s, border-color 0.3s;
  font-size: ${calcRem(14)};
  font-weight: ${({ weight }) => weight || 400};

  input,
  textarea,
  .base-input__control {
    background: none;
    padding: ${calcRem(10.96)} ${calcRem(8)};
    border: ${({ error, variant, value }) => {
      return `${error ? 2 : 1}px solid ${getColor(
        variant,
        // eslint-disable-next-line no-nested-ternary
        error ? 'ACTIVE' : !value ? 'DEFAULT' : 'FILLED',
      )}`;
    }};
    border-radius: 0;
    color: ${({ variant, value }) => getColor(variant, !value ? 'DEFAULT' : 'FILLED')} !important;
    width: 100%;
    box-shadow: none;

    &::placeholder {
      color: ${({ variant }) => getColor(variant, 'DEFAULT')};
    }

    &:hover,
    &:focus {
      color: ${({ variant }) => getColor(variant, 'ACTIVE')};
      border: ${({ error, variant }) => `${error ? 2 : 1}px solid ${getColor(variant, 'ACTIVE')}`};
      outline: none;
    }

    &:disabled {
      color: ${({ variant }) => getColor(variant, 'DISABLED')};
      border: ${({ variant }) => `1px solid ${getColor(variant, 'DISABLED')}`};
      cursor: not-allowed;
    }
  }

  .base-input {
    &-container {
      position: relative;
      &--clearable {
        display: inline-flex;
        cursor: pointer;
        position: absolute;
        transform: translate(-26px, 67%);
        background: none;
        padding: 0;
        border: none;
      }
    }
    &--bottom {
      display: grid;
      grid-template-columns: ${({ maxChars, helpText }) =>
        maxChars && helpText ? '1fr auto' : '1fr'};
      text-align: ${({ maxChars, helpText }) => maxChars && !helpText && 'right'};
    }
    &__single-value {
      color: ${({ variant }) => getColor(variant, 'ACTIVE')};
    }
  }

  .base-input__control {
    padding: 1px;

    &--menu-is-open {
      border: ${({ error, variant }) => `${error ? 2 : 1}px solid ${getColor(variant, 'ACTIVE')}`};
    }

    &--is-disabled {
      color: ${({ variant }) => getColor(variant, 'DISABLED')};
      border: ${({ variant }) => `1px solid ${getColor(variant, 'DISABLED')}`};
      cursor: not-allowed;
    }
  }

  .base-input__menu {
    border-radius: 0;
    padding: 0;
    margin-top: 5px;
    border: ${({ variant }) => `1px solid ${getColor(variant, 'ACTIVE')}`};

    &-list {
      color: ${({ variant }) => getColor(variant, 'ACTIVE')};
      padding: 0;
    }
  }

  .base-input__option {
    background-color: ${({ variant }) =>
      getColor(variant === 'light' ? 'dark' : 'light', 'ACTIVE')};

    &--is-focused {
      background-color: ${({ variant }) => getColor(variant, 'DISABLED')};
    }

    &--is-selected,
    &:active {
      background-color: ${({ variant }) =>
        getColor(variant === 'light' ? 'dark' : 'light', 'DISABLED')};
      color: ${({ variant }) => getColor(variant === 'light' ? 'dark' : 'light', 'ACTIVE')};
    }
  }

  .base-input__indicator-separator {
    display: none;
  }
`;

const InputStyling = styled(BaseStyling)`
  padding-right: ${({ clearable, type, value }) => (clearable || type === "search") && value && '35px !important'};
`;

const TextAreaStyling = styled(BaseStyling)`
  resize: none;
`;

export default Input;
