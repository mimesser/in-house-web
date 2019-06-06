import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { panelBoxShadow, spacing } from '../../../theme';

const Nav = styled.nav`
   display: flex;
   background-color: ${({ theme: { palette } }) => palette.white};
   ${panelBoxShadow}
`;

const activeStyle = ({ active }) =>
   active &&
   `
   opacity: 1;
   border-bottom: 1px solid;
`;

const A = styled.a`
   flex: 1;
   text-align: center;
   padding: ${spacing.medium};
   color: ${({ theme: { textColors } }) => textColors.primary};
   text-decoration: none;
   opacity: 0.5;
   transition: opacity 0.5s;
   cursor: pointer;
   ${activeStyle};
`;

const TabHeader = ({ id, path, label, active }) => (
   <Link href={`/houses?id=${id}&tab=${path}`} as={`/houses/${id}/${path}`}>
      <A active={active}>{label}</A>
   </Link>
);

const tabs = [
   {
      path: 'rate',
      label: 'rate',
   },
   {
      path: 'post',
      label: 'post',
   },
   {
      path: 'mink',
      label: 'mink',
   },
];

export const Navbar = ({ id, selected }) => (
   <Nav>
      {tabs.map(({ path, label }) => (
         <TabHeader id={id} key={path} path={path} label={label} active={selected === path} />
      ))}
   </Nav>
);
