/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import styled from 'styled-components';

import Link from 'next/link';
import { spacing } from '../../../style';

export const Brand = styled(({ className }) => (
  <span className={className}>
    <Link href="/">
      <a>
        <b>in-house</b>
      </a>
    </Link>{' '}
    |{' '}
    <Link href="/about">
      <a>org 2.0</a>
    </Link>
  </span>
))`
  word-spacing: ${spacing.xs};
  text-transform: none;
  word-break: keep-all;
  width: 140px;
  min-width: 140px;
`;
