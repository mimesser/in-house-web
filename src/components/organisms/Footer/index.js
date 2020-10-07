import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { TransparentLinkStyle, Button, Break, Patent, Copyright } from '../../atoms';
import { appBackground, spacing, breakpoints, font, fontSize, palette } from '../../../style';

const Layout = styled.div`
  background: ${appBackground};
  padding-top: ${spacing.sm};
`;

const Wrapper = styled.div`
  max-width: ${breakpoints.md};
  margin: 0 auto;
  display: flex;

  margin: 0, auto;
  // align-items: center;
  // justify-content: center;
  div {
    width: 50%;
  }
  @media (max-width: ${breakpoints.md}) {
    display: block;
    width: 100%;
  }
`;
const Links = styled.div`
  margin-top: auto;

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
const MobileBreak = styled(Break)`
  @media screen and (min-width: ${breakpoints.md}) {
    display: none;
  }
`;
const CopyrightLine = styled(A)`
  max-width: ${breakpoints.md};
  margin: 0 auto;
`;
export const Footer = () => (
  <Layout>
    <Links>
      <Wrapper>
        <div>
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
        </div>
        <MobileBreak />
        <div>
          <Link href="/terms" passHref prefetch={false}>
            <A>terms of service</A>
          </Link>
          <Link href="/feedback" passHref prefetch={false}>
            <A>contact</A>
          </Link>
        </div>
      </Wrapper>
      <Break />
      <CopyrightLine>
        <Copyright /> | <Patent />
      </CopyrightLine>
    </Links>
  </Layout>
);
