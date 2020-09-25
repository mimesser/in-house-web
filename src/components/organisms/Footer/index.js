import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { TransparentLinkStyle, Button, Break, Patent, Copyright } from '../../../components/atoms';
import { appBackground, spacing, breakpoints, font, fontSize, palette } from '../../../style';
const Layout = styled.div`
  background: ${appBackground};
  width: 100%;
  padding-top: ${spacing.sm};
`;
const Links = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: ${spacing.xl};
  margin-left: ${spacing.sm};
  > a {
  }

  hr {
    color: black;
  }
  ${Break} {
    color: black;
    width: 90%;
    margin-left: 5vw;
    height: 1px;
    opacity: 0.2;
  }
`;
const A = styled.a`
  outline: none;
  text-decoration: none;
  cursor: pointer;
  font-size: ${fontSize.sm};
  padding: ${spacing.sm} 0 ${spacing.sm} ${spacing.lg};
  // margin-top: ${spacing.sm};
  display: block;
  color: ${palette.black};
  &:hover {
    color: ${palette.midnight};
  }
`;

export const Footer = () => (
  <Layout>
    <Links>
      <Link href="/list-house" passHref prefetch={false}>
        <A>beta-list organisation</A>
      </Link>
      <Link href="#howitworks" passHref prefetch={false}>
        <A>how it works</A>
      </Link>
      <Link href="/polls" passHref prefetch={false}>
        <A>faqs</A>
      </Link>
      <Link href="/about" passHref prefetch={false}>
        <A>about</A>
      </Link>

      <Break />

      <Link href="/terms" passHref prefetch={false}>
        <A>terms of service</A>
      </Link>
      <Link href="/feedback" passHref prefetch={false}>
        <A>contact</A>
      </Link>
      <Break />
      <A>
        <Copyright></Copyright> | <Patent></Patent>
      </A>
    </Links>
  </Layout>
);
