import React from 'react';
import styled from 'styled-components';
import searchIcon from './icons/icon-search';
import { SearchInput } from 'components';

const Icon = styled.div`
   cursor: pointer;
   svg {
      height: 24px;
      width: 24px;
      fill #555;
      :hover {
         fill #bbb;
      }
   }
`;

const SearchIcon = Icon.extend`
   margin-left: auto;
`;

export default function Search() {
   return (
      <SearchInput F_2 />
   );
}
