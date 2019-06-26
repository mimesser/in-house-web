import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { createStructuredSelector } from 'reselect';
import Link from 'next/link';

import { panelBoxShadow, spacing, palette } from '../../../style';
import { selectIsActiveInsider } from '../../../store/venues';

const Nav = styled.nav`
   display: flex;
   background-color: ${palette.white};
   ${panelBoxShadow}
`;

const activeStyle = ({ active }) =>
   active &&
   `
   opacity: 1;
   border-bottom: 1px solid;
`;
const cursor = ({ deny }) => (deny ? 'not-allowed' : 'pointer');

const A = styled.a`
   flex: 1;
   text-align: center;
   padding: ${spacing.medium};
   color: ${palette.text};
   text-decoration: none;
   opacity: 0.5;
   transition: opacity 0.5s;
   cursor: ${cursor};
   ${activeStyle};
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
