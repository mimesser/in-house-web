import React from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
import { createStructuredSelector } from 'reselect';
import Link from 'next/link';

import { panelBoxShadow, spacing, palette, fontWeight, calcRem } from '../../../style';
import { selectIsActiveInsider } from '../../../store/venues';

const Nav = styled.nav`
   display: flex;
   background-color: ${palette.white};
   ${panelBoxShadow}
`;

const linkTextStyle = ({ active, deny }) => {
   if (deny) {
      return css`
         color: ${palette.textLight};
      `;
   }
   if (active) {
      return css`
         color: ${palette.textDark};
         font-weight: ${fontWeight.bolder};
         border-bottom: ${calcRem('2px')} solid;
      `;
   }
   return undefined;
};

const cursor = ({ deny }) => (deny ? 'not-allowed' : 'pointer');

const A = styled.a`
   flex: 1;
   text-align: center;
   padding: ${spacing.small};
   color: ${palette.text};
   text-decoration: none;
   transition: color 0.5s;
   cursor: ${cursor};
   ${linkTextStyle};
`;

const TabHeader = ({ id, tab: { path, label, secured }, active, authorized }) =>
   !authorized && secured ? (
      <A deny>{label}</A>
   ) : (
      <Link href={`/houses?id=${id}&tab=${path}`} as={`/houses/${id}/${path}`} passHref>
         <A active={active}>{label}</A>
      </Link>
   );

const tabs = [
   {
      path: 'rate',
      label: 'rate',
      secured: true,
   },
   {
      path: 'post',
      label: 'post',
      secured: true,
   },
   {
      path: 'mink',
      label: 'mink',
   },
];

const Navbar = ({ id, selected, authorized }) => (
   <Nav>
      {tabs.map(t => (
         <TabHeader id={id} key={t.path} tab={t} active={selected === t.path} authorized={authorized} />
      ))}
   </Nav>
);

const mapState = createStructuredSelector({
   authorized: selectIsActiveInsider,
});

export default connect(mapState)(Navbar);
