import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Break, Patent, Copyright } from '../../atoms';
import { appBackground, spacing, breakpoints, fontSize, palette } from '../../../style';

const Layout = styled.div`
  background: ${appBackground};
  padding: ${spacing.xl};
`;

const Wrapper = styled.div`
  margin: 0 auto;
  display: block;
  width: 100%;

  @media screen and (min-width: ${breakpoints.lg}) {
    width: ${breakpoints.md};
    display: flex;
    justify-content: space-between;
  }
`;

const Links = styled.div`
  margin-top: auto;

  ${Break} {
    color: ${palette.lightGray};
    height: 1px;
    width: auto;
  }
`;

const A = styled.a`
  outline: none;
  text-decoration: none;
  cursor: pointer;
  font-size: ${fontSize.sm};
  padding: ${spacing.sm} 0;
  display: block;
  color: ${palette.black};
  &:hover {
    color: ${palette.midnight};
  }
`;

const MobileBreak = styled(Break)`
  @media screen and (min-width: ${breakpoints.lg}) {
    display: none;
  }
`;

const CopyrightLine = styled(A)`
  max-width: ${breakpoints.md};
  margin: 0 auto;

  @media screen and (min-width: ${breakpoints.lg}) {
    text-align: center;
  }
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
