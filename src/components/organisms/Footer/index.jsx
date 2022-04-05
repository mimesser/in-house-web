import React, { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import { Copyright, Patent, Icon } from '../../atoms';
import { appColors, calcRem, fontSize, constColors, device } from '../../../style';
import { HasMoreContentIndicator } from '../../atoms/Indicators/HasMore';
import { useIntersectionObserverRef } from 'rooks';
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
  <span style={{width: '24px', padding: '0 15px'}}>
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
      : appColors.gray600
      };
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
  padding: ${calcRem(24)} ${calcRem(12)} ${calcRem(20)} ${calcRem(12)};
  @media all and (min-width: ${calcRem(767)}) {
    display: grid;
    column-gap: 20px;
    grid-template-areas:
    "a b"
    "a b"
    "a b"
    "a b"
    "a b"
    "break break"
    "copyright copyright";    
    padding: ${calcRem(30)} ${calcRem(80)} ${calcRem(30)} ${calcRem(80)};
  }
  
  @media ${device.desktop} {
    padding-left: 277px;
    padding-right: 277px;
    
  }
`;

const Break1 = styled.div`
  width: 100%;
  background: ${({ variant }) =>
    ['light', 'transparent'].includes(variant) ? appColors.gray600 : appColors.gray100};
  height: 1px;
  margin-bottom: ${calcRem(12)};
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
  margin-bottom: ${calcRem(12)};
  opacity: 0.2;
`;
const A = styled.a`
  outline: none;
  text-decoration: none;
  cursor: pointer;
  font-size: ${calcRem(12)};
  margin-bottom: ${calcRem(30)};
  display: block;
  color: inherit;
  transition: color 0.5s;
`;
const SocialMedia1 = styled.div`
  @media all and (max-width: ${calcRem(767)}) {
    display: none;
  }
`;
const SocialMedia2 = styled.div`
  @media all and (min-width: ${calcRem(767)}) {
    display: none;
  }
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
      <div>          
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
      </div>
      <Break1 variant={variant} />
      <div style={{ display: 'flex', flexDirection: 'column'}}>
        <Link href="/faqs" passHref prefetch={false}>
          <A>terms of service</A>
        </Link>
        <Link href="/about" passHref prefetch={false}>
          <A>contact</A>
        </Link>
        <SocialMedia1 style={{ alignSelf: 'flex-end', paddingTop: '90px'}}>
          {socialLinks.map((link) => (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <SocialLink {...link} key={link.icon} />
          ))}
        </SocialMedia1>
      </div>
      <Break2 variant={variant} />
      <CopyrightLine href="/">
        <Copyright /> | <Patent />
      </CopyrightLine>
      <SocialMedia2 style={{ alignSelf: 'flex-end', textAlign: 'center', paddingTop:'30px'}}>
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
