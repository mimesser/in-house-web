/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import styled from 'styled-components';

import Link from 'next/link';
import { spacing, appColors } from '../../../style';
import Text from '../text/_index'

export const Brand = styled(({ className, variant }) => (
  <span className={className}>
		<Text
			variant={variant? variant : "light"}
			family="helvetica"
			size={14}
			weight="bold"
		>
			<Link href="/">
        in-house
			</Link>&nbsp;|&nbsp;
			<Link href="/about">
        org 2.0
			</Link>
		</Text>
  </span>
))`
  word-spacing: ${spacing.xs};
  text-transform: none;
  word-break: keep-all;
  width: 140px;
	min-width: 140px;
	> p > a {
		text-decoration: none;
	}
	z-index: 2;
`;
