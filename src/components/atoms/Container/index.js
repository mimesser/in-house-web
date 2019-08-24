import React from 'react';
import styled, { css } from 'styled-components';

import { breakpoints, spacing } from '../../../style';

const height = ({ fullHeight }) =>
  fullHeight &&
  css`
    min-height: 100vh;
    // noinspection CssInvalidPropertyValue
    min-height: -webkit-fill-available;
  `;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: auto;

  padding-left: ${props => {
    if (props.full) return 0;
    return `calc((100vw - ${breakpoints.sm}) / 2)`;
  }};

  padding-right: ${props => {
    if (props.full) return 0;
    return `calc((100vw - ${breakpoints.sm}) / 2)`;
  }};

  padding-top: ${props => {
    if (props.fullVertical) return 0;
    if (props.small) return spacing.medium;
    return spacing.large;
  }};

  padding-bottom: ${props => {
    if (props.fullVertical) return 0;
    if (props.small) return spacing.medium;
    return spacing.large;
  }};

  ${height};
`;
