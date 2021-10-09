import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
import { createStructuredSelector } from 'reselect';
import Link from 'next/link';

import {
  showInsiderChallenge,
  selectAnyTabItemSelected,
  selectIsActiveInsider,
} from '../../../store/venues';

import { spacing, palette, font, calcRem } from '../../../style';

import { HelpTip } from '../../atoms';
import { formatMovementURL } from '../../../utils/format';

const linkTextStyle = ({ active, custom }) => {
  if (active && !custom) {
    return css`
      color: ${palette.primary};
      border-bottom-color: currentColor;
      position: relative;
    `;
  }
  if (custom) {
    return css`
      color: ${palette.white};
      background-color: ${palette.primary};
      border-bottom: none;
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
  cursor: pointer;
  padding: ${spacing.md};
  color: ${palette.gray};
  ${font.bold};
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
  z-index: 100; // otherwise box-shadow is hidden in rate tab
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0;
  z-index: 3;
`;

const TabHeader = ({
  id,
  name,
  tab: { path, label, secured, help },
  active,
  custom,
  authorized,
  venueType = 'houses',
  lite,
  showChallenge,
}) => {
  const movementName = formatMovementURL(name);
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    const tickIntervalId = setInterval(() => setTime(Date.now()), 1000);

    return () => clearInterval(tickIntervalId);
  }, []);

  const retriggerChallenge = (e) => {
    showChallenge(id);
  };

  if (!authorized && secured) {
    return (
      <HelpWrap onClick={retriggerChallenge}>
        <A active={active} custom={custom}>
          {label}
        </A>
      </HelpWrap>
    );
  }

  const link = (
    <HelpWrap>
      <Link
        href={`/${venueType}?id=${id}&tab=${path}&time=${time}`}
        as={`/${lite ? 'movement' : venueType}/${lite ? movementName : id}/${path}`}
      >
        <A active={active} custom={custom}>
          {label}
        </A>
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

const defaultTabs = [
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

const liteTabs = [
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

const Navbar = ({
  id,
  name,
  selected,
  authorized,
  venueType,
  tabs = defaultTabs,
  lite,
  showChallenge,
}) => {
  if (lite) tabs = liteTabs;

  return (
    <Nav>
      {tabs.map((t) => (
        <TabHeader
          id={id}
          name={name}
          key={t.path}
          tab={t}
          custom={t.custom}
          active={selected === t.path}
          authorized={authorized}
          venueType={venueType}
          lite={lite}
          showChallenge={showChallenge}
        />
      ))}
    </Nav>
  );
};

const mapState = createStructuredSelector({
  authorized: selectIsActiveInsider,
  anyTabItemSelected: selectAnyTabItemSelected,
});

const mapDispatch = {
  showChallenge: showInsiderChallenge,
};

export default connect(mapState, mapDispatch)(Navbar);
