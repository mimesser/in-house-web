import React, { useState } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import Link from 'next/link';

import { appColors, breakpoints } from '../../../style';
import { Icon } from '..';
import { withNoSSR } from '../NoSSR';

const customStyles = {
  option: (styles, { isFocused }) => ({
    ...styles,
    background: isFocused ? appColors.gray2 : appColors.midnight,
    color: appColors.offWhite,
  }),
  control: (styles) => ({
    ...styles,
    outline: 'none',
    boxShadow: 'none',
    color: appColors.midnight,
    border: `1px solid ${appColors.midnight}`,
  }),
  menuList: (styles) => ({
    ...styles,
    padding: 0,
  }),
  noOptionsMessage: (styles) => ({
    ...styles,
    margin: 0,
    padding: 0,
    background: appColors.gray4,
  }),
  input: (styles) => ({
    ...styles,
    fontSize: '16px',
  }),
};

const OptionLabel = styled.span`
  display: flex;
  justify-content: space-between;

  ${Icon} {
    color: ${appColors.gray3};
  }

  small {
    font-size: 11px;
    color: ${appColors.gray4};
  }
`;

const NoOptionsDiv = styled.div`
  display: flex;
  flex-direction: column;

  & > div {
    &:first-child {
      background-color: ${appColors.gray4};
      color: ${appColors.midnight};
      padding: 8px 10px;
      align-self: flex-start;
    }
  }
`;

const LinkFullWidth = styled.div`
  background-color: ${appColors.midnight};
  cursor: pointer;
  display: flex;
  padding: 8px 10px;
  color: ${appColors.offWhite};
  justify-content: space-between;
  align-items: center;
  &:hover {
    background-color: ${appColors.gray2};
  }
`;

// TODO: resolve SSR problems
export const CustomSelect = styled(withNoSSR(Select)).attrs(() => ({
  classNamePrefix: 'react-select',
}))`
  opacity: ${({ options }) => (options ? 1 : 0)};
  transition: opacity 1s;

  .react-select__input input {
    text-transform: lowercase;
  }

  @media (min-width: ${breakpoints.md}) {
    width: 680px;
  }
`;

const filterVenues = (option, selectedValue) => {
  const { label } = option;

  if (selectedValue && selectedValue.length)
    return label && label.toLocaleLowerCase().includes(selectedValue.toLocaleLowerCase());

  return null;
};

const formatOptionLabel = ({ name, venueInfo }) => (
  <OptionLabel>
    <div>
      {name}&nbsp;
      <small>
        {venueInfo?.address}
        {venueInfo && `, ${venueInfo.city}`}
      </small>
    </div>
    <div>
      <Icon icon="winky-circle" size={1.2} />
    </div>
  </OptionLabel>
);

const noOptionsMessage = () => (
  <NoOptionsDiv>
    <div>no results</div>
    <div>
      <Link href="/list-house">
        <LinkFullWidth>
          <span>list your org</span>
          <Icon icon="arrow-right" />
        </LinkFullWidth>
      </Link>
    </div>
  </NoOptionsDiv>
);

/* eslint-disable react/jsx-props-no-spreading */
export const Dropdown = ({ options, searchValue, placeholder, onFocus, onBlur, ...props }) => {
  const [placeholderText, setPlaceholderText] = useState(placeholder || 'find your org');
  return (
    <CustomSelect
      options={options}
      components={{
        DropdownIndicator: () => null,
        Placeholder: () =>
          placeholderText ? (
            <>
              <Icon icon="search" />
              {placeholderText}
            </>
          ) : null,
      }}
      onFocus={(e) => {
        setPlaceholderText(null);
        if (onFocus) {
          onFocus(e);
        }
      }}
      onBlur={(e) => {
        setPlaceholderText(placeholder || 'find your org');
        if (onBlur) {
          onBlur(e);
        }
      }}
      getOptionLabel={({ name }) => name}
      getOptionValue={({ id }) => id}
      filterOption={filterVenues}
      formatOptionLabel={formatOptionLabel}
      noOptionsMessage={searchValue ? noOptionsMessage : () => null}
      isSearchable
      isClearable
      styles={customStyles}
      {...props}
    />
  );
};
