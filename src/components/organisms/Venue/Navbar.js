import React from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
import { createStructuredSelector } from 'reselect';
import Link from 'next/link';

import { spacing, palette, fontWeight, calcRem } from '../../../style';
import { selectAnyTabItemSelected, selectIsActiveInsider } from '../../../store/venues';
import { HelpTip } from '../../atoms';

const linkTextStyle = ({ active }) => {
  if (active) {
    return css`
      color: ${palette.primary};
      border-bottom-color: currentColor;
      position: relative;
    `;
  }

  return css`
    color: ${palette.lightGray};
  `;
};

const A = styled.a`
  flex: 1;
  text-align: center;
  padding: ${spacing.md};
  color: ${palette.gray};
  font-weight: ${fontWeight.bold};
  text-decoration: none;
  transition: color 0.5s, border-color 0.5s;
  border-bottom: ${calcRem('6px')} solid transparent;
  ${linkTextStyle};
`;

const HelpWrap = styled.div`
  flex: 1;
  background-color: ${palette.white};
  display: flex;
`;

const Nav = styled.nav`
  display: flex;
  flex-shrink: 0; // safari
  background-color: ${palette.white};
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
`;

const TabHeader = ({ id, tab: { path, label, secured, help }, active, authorized }) => {
  if (!authorized && secured) {
    return (
      <Link href={`/houses/${id}`} passHref>
        <A>{label}</A>
      </Link>
    );
  }

  const link = (
    <HelpWrap>
      <Link href={`/houses?id=${id}&tab=${path}`} as={`/houses/${id}/${path}`} passHref>
        <A active={active}>{label}</A>
      </Link>
    </HelpWrap>
  );

  if (active && help) {
    return (
      <HelpTip tip={help} placement="top">
        {link}
      </HelpTip>
    );
  }
  return link;
};

const tabs = [
  {
    path: 'rate',
    label: 'rate',
    secured: true,
    help: 'rate individual details from bathrooms to ceo',
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

const Navbar = ({ id, selected, authorized, anyTabItemSelected }) => (
  <Nav>
    {tabs.map(t => (
      <TabHeader
        id={id}
        key={t.path}
        tab={t}
        active={selected === t.path && !anyTabItemSelected}
        authorized={authorized}
      />
    ))}
  </Nav>
);

const mapState = createStructuredSelector({
  authorized: selectIsActiveInsider,
  anyTabItemSelected: selectAnyTabItemSelected,
});

export default connect(mapState)(Navbar);
