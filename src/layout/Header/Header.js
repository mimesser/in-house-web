import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Menu from './Menu';
import searchIcon from './icons/icon-search';

const Wrapper = styled.nav`
   position: fixed;
   top: 0;
   left: 0;
   right: 0;
`;

const Logo = styled(Link)`
   cursor: pointer;
   color: #999;
   &:hover {
      color: #aaa;
   }
`;

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

const Content = styled.div`
   display: flex;
   padding: 40px 20px 20px;
   max-width: 1024px;
   margin: 0 auto;
`;

export default function Header() {
   return (
      <Wrapper>
         <Content>
            <Logo to="/">IN-HOUSE</Logo>
            <SearchIcon>{searchIcon}</SearchIcon>
            <Menu />
         </Content>
      </Wrapper>
   );
}
