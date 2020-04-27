/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import { Icon, ClearButton, Brand } from '../../atoms';
import { spacing, palette, onDesktop, deskPadRem } from '../../../style';

const borderColor = ({ white }) => {
  // TODO: add alpha support to palette functions
  const c = white ? 249 : 51;
  return `rgba(${c}, ${c}, ${c}, 0.2)`;
};

const Layout = styled.div`
  position: relative;
  flex: none; // safari
  color: ${({ white }) => (white ? palette.white : palette.primary)};
  border-bottom: ${borderColor} solid 1px;
  ${onDesktop(`border-bottom-color: transparent`)};

  > div {
    display: flex;
    align-items: center;
    padding: ${spacing.xl} ${spacing.xxl};

    ${({ noPadd }) => !noPadd && onDesktop(`padding: ${spacing.xl} ${deskPadRem}`)};

    > span {
      margin-right: auto;

      & > a {
        text-decoration: none;
      }
    }
  }
`;

const MenuToggle = styled(ClearButton)`
  margin-left: ${spacing.xl};
`;

const IconLink = ({ icon, href }) => (
  <Link href={href}>
    <a>
      <Icon icon={icon} size={1.5} />
    </a>
  </Link>
);

export const Header = ({ openMenu, white, noPadd }) => (
  <Layout white={white} noPadd={noPadd}>
    <div>
      <Brand />
      <IconLink icon="search" href="/houses" />
      <MenuToggle onClick={openMenu}>
        <Icon icon="menu" size={1.5} />
      </MenuToggle>
    </div>
  </Layout>
);
