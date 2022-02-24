import React, { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import { Copyright, Patent } from '../../atoms';
import { appColors, calcRem, fontSize, constColors } from '../../../style';
import { HasMoreContentIndicator } from '../../atoms/Indicators/HasMore';
import { useIntersectionObserverRef } from 'rooks';

const Layout = styled.div`
  background-color: ${({ variant }) =>
    // eslint-disable-next-line no-nested-ternary
    variant === 'transparent'
      ? 'transparent'
      : variant === 'light'
      ? appColors.white
      : appColors.gray600};
  color: ${({ variant }) => (variant === 'light' ? appColors.gray500 : appColors.gray300)};
  padding: ${calcRem(24)} ${calcRem(12)} ${calcRem(20)} ${calcRem(12)};
  border-top: 0.5px solid
    ${({ variant }) => (variant === 'light' ? appColors.gray600 : appColors.grey8)};

  > a {
    &:hover {
      color: ${({ variant }) => (variant === 'light' ? appColors.gray600 : appColors.gray200)};
    }

    &:active {
      color: ${({ variant }) => (variant === 'light' ? appColors.secondaryBlack : appColors.white)};
    }
  }

  @media all and (min-width: ${calcRem(900)}) {
    display: grid;
    column-gap: 20px;
    grid-template-areas:
      'a b'
      'a b'
      'a b'
      'a b'
      'copyright copyright';
  }
`;

const Break = styled.div`
  width: 100%;
  background: ${({ variant }) =>
    ['light', 'transparent'].includes(variant) ? appColors.gray600 : appColors.gray100};
  height: 1px;
  margin-bottom: ${calcRem(12)};
  opacity: 0.2;

  @media all and (min-width: ${calcRem(900)}) {
    display: none;
  }
`;

const A = styled.a`
  outline: none;
  text-decoration: none;
  cursor: pointer;
  font-size: ${calcRem(12)};
  margin-bottom: ${calcRem(12)};
  display: block;
  color: inherit;
  transition: color 0.5s;
`;

const CopyrightLine = styled.div`
  grid-area: copyright;
  color: ${appColors.gray400};
`;

export const Footer = ({ variant, showScrollIndicator }) => {
  const [hideIndicator, setHideIndicator] = useState(false);

  const observer = useRef();

  const isFooterShowing = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setHideIndicator(true);
        } else {
          if (hideIndicator) setHideIndicator(false);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hideIndicator],
  );

  return (
    <Layout variant={variant} ref={isFooterShowing}>
      {!hideIndicator && showScrollIndicator && <HasMoreContentIndicator />}
      <Link href="/list-house" passHref prefetch={false}>
        <A>distressed worker?</A>
      </Link>
      <Link href="/list-house" passHref prefetch={false}>
        <A>progressive leadership?</A>
      </Link>
      <Link href="#howitworks" passHref prefetch={false}>
        <A>how it works</A>
      </Link>
      <Link href="/faqs" passHref prefetch={false}>
        <A>faqs</A>
      </Link>
      <Link href="/about" passHref prefetch={false}>
        <A>about</A>
      </Link>
      <Break variant={variant} />
      <Link href="/faqs" passHref prefetch={false}>
        <A>terms of service</A>
      </Link>
      <Link href="/about" passHref prefetch={false}>
        <A>contact</A>
      </Link>
      <Break variant={variant} />
      <CopyrightLine href="/">
        <Copyright /> | <Patent />
      </CopyrightLine>
    </Layout>
  );
};

Footer.propTypes = {
  variant: PropTypes.oneOf(['light', 'dark', 'transparent']),
};
