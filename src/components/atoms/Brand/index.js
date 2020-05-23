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
      <a>movement</a>
    </Link>
  </span>
))`
  word-spacing: ${spacing.xs};
  text-transform: none;
`;
