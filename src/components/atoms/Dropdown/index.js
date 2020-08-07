import styled from 'styled-components';
import Select from 'react-select';

import { palette, spacing } from '../../../style';
import { baseFormControlStyle, fontStyle, placeholder } from '../Input';
import { withNoSSR } from '../NoSSR';

// TODO: resolve SSR problems
export const Dropdown = styled(withNoSSR(Select)).attrs(() => ({
  classNamePrefix: 'react-select',
}))`
  .react-select__control {
    ${baseFormControlStyle};
    padding: calc(${spacing.xxs} - 1px);

    &.react-select__control--menu-is-open,
    &.react-select__control--is-focused {
      outline: none;
      box-shadow: none;
      color: ${palette.primary};
      border: 1px solid ${palette.primary};
    }
    &.react-select__control--is-disabled {
      background-color: transparent;
      color: ${palette.lightGray};
      border-color: ${palette.lightGray};
    }
    :hover {
      box-shadow: none;
      border: 1px solid ${palette.primary};
    }

    .react-select__single-value {
      color: inherit;
    }
  }

  .react-select__placeholder {
    ${placeholder};
  }

  .react-select__indicator-separator {
    display: none;
  }

  .react-select__menu {
    box-shadow: none;
    border: 1px solid ${palette.gray};

    .react-select__menu-list {
      ::-webkit-scrollbar {
        -webkit-appearance: none;
        width: 7px;
      }
      
      ::-webkit-scrollbar-thumb {
        border-radius: 4px;
        background-color: rgba(0, 0, 0, .5);
        box-shadow: 0 0 1px rgba(255, 255, 255, .5);
      }
      padding: 0;
      ${fontStyle};

      .react-select__option {
        &.react-select__option--is-selected {
          color: ${palette.primary};
          background-color: ${palette.lightGray};
        }
        &.react-select__option--is-focused {
          background-color: ${palette.gray};
        }
      }
    }
  }
`;

Dropdown.defaultProps = {
  placeholder: '',
  isSearchable: false,
  theme: selectOriginalTheme => ({
    ...selectOriginalTheme,
    borderRadius: 0,
  }),
};
