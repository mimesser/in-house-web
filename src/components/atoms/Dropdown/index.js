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
      padding: calc(${spacing.tiny} - 1px);

      &.react-select__control--menu-is-open,
      &.react-select__control--is-focused {
         outline: none;
         box-shadow: none;
         color: ${palette.textDark};
         border: 1px solid ${palette.primaryLight};
      }
      &.react-select__control--is-disabled {
         background-color: transparent;
         color: ${palette.secondaryLight};
         border-color: ${palette.secondaryLight};
      }
      :hover {
         box-shadow: none;
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
      border: 1px solid ${palette.primaryLight};

      .react-select__menu-list {
         padding: 0;
         ${fontStyle};

         .react-select__option {
            &.react-select__option--is-focused {
               background-color: ${palette.secondaryLight};
            }
            &.react-select__option--is-selected {
               color: ${palette.textDark};
               background-color: ${palette.secondary};
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
