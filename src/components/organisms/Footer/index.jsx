import React, { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import { Copyright, Patent, Icon } from '../../atoms';
import { appColors, calcRem, fontSize, constColors, device, mobileWidth } from '../../../style';
import { HasMoreContentIndicator } from '../../atoms/Indicators/HasMore';
import { useIntersectionObserverRef } from 'rooks';
import { imageOffset } from '../Pages/components';
const socialLinks = [
  {
    icon: 'facebook',
    href: 'https://www.facebook.com/iH.movement/',
  },
  {
    icon: 'linkedin',
    href: 'https://www.linkedin.com/company/in-house6',
  },
  {
    icon: 'youtube',
    href: 'https://www.youtube.com/channel/UC4mqXm_iuXUIcf0cBcwHuIA',
  },
  {
    icon: 'instagram',
    href: 'https://www.instagram.com/ih.movement',
  },
];

const SocialLink = ({ href, icon }) => (
  <span style={{ width: '24px', padding: '0 15px' }}>
    <a href={href} rel="noopener noreferrer" target="_blank">
      <Icon icon={icon} size={1.5} />
    </a>
  </span>
);
const Layout = styled.div`
  background-color: ${({ variant }) =>
    // eslint-disable-next-line no-nested-ternary
    variant === 'transparent'
      ? 'transparent'
      : variant === 'light'
      ? appColors.white
      : variant === 'darkest'
      ? appColors.secondaryBlack
      : appColors.gray600};
  color: ${({ variant }) => (variant === 'light' ? appColors.gray500 : appColors.gray300)};
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
  padding: ${calcRem(30)} 0 ${calcRem(20)};
  display: flex;
  display-direction: row;
  flex-wrap: wrap;
  row-gap: 30px;
  column-gap: 20px;
  ${imageOffset}
`;

const LinkGroup = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 99%;
  row-gap: 30px;
  flex-grow: 0;
  @media (min-width: ${mobileWidth.lg}) {
    flex-basis: calc(25% - 20px);
  }
`;

const Break1 = styled.div`
  width: 100%;
  background: ${({ variant }) =>
    ['light', 'transparent'].includes(variant) ? appColors.gray600 : appColors.gray100};
  height: 1px;
  opacity: 0.2;

  @media all and (min-width: ${calcRem(767)}) {
    display: none;
  }
`;
const Break2 = styled.div`
  grid-area: break;
  width: 100%;
  background: ${({ variant }) =>
    ['light', 'transparent'].includes(variant) ? appColors.gray600 : appColors.gray100};
  height: 1px;
  opacity: 0.2;
`;
const A = styled.a`
  outline: none;
  text-decoration: none;
  cursor: pointer;
  font-size: ${calcRem(12)};
  display: block;
  color: inherit;
  transition: color 0.5s;
`;
const SocialMedia1 = styled.div`
  align-self: flex-end;
  flex-basis: 99%;
  flex-grow: 0;
  text-align: right;
  @media (min-width: ${mobileWidth.lg}) {
    flex-basis: 50%;
  }
  @media all and (max-width: ${calcRem(767)}) {
    display: none;
  }
`;
const SocialMedia2 = styled.div`
  @media all and (min-width: ${calcRem(767)}) {
    display: none;
  }
  flex-basis: 99%;
  flex-grow: 0;
  text-align: center;
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
      <LinkGroup>
        <Link href="/list-workplace" passHref prefetch={false}>
          <A>distressed worker?</A>
        </Link>
        <Link href="/list-workplace" passHref prefetch={false}>
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
      </LinkGroup>
      <Break1 variant={variant} />
      <LinkGroup>
        <Link href="/faqs" passHref prefetch={false}>
          <A>terms of service</A>
        </Link>
        <Link href="/about" passHref prefetch={false}>
          <A>contact</A>
        </Link>
      </LinkGroup>
      <SocialMedia1>
        {socialLinks.map((link) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <SocialLink {...link} key={link.icon} />
        ))}
      </SocialMedia1>
      <Break2 variant={variant} />
      <CopyrightLine href="/">
        <Copyright /> | <Patent />
      </CopyrightLine>
      <SocialMedia2>
        {socialLinks.map((link) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <SocialLink {...link} key={link.icon} />
        ))}
      </SocialMedia2>
    </Layout>
  );
};

Footer.propTypes = {
  variant: PropTypes.oneOf(['light', 'dark', 'darkest', 'transparent']),
};
