import React from 'react';
import styled from 'styled-components';
import searchIcon from './icons/icon-search';
import menuIcon from './icons/hamburger';

const Wrapper = styled.nav`
   position: fixed;
   top: 0;
   left: 0;
   right: 0;
`;

const Logo = styled.div`
   color: #aaa;
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

const MenuIcon = Icon.extend`
   margin-left: 40px;
   svg {
      width: 20px;
   }
`;

const Content = styled.div`
   display: flex;
   padding: 20px;
   max-width: 1024px;
   margin: 0 auto;
`;

export default function Header() {
   return (
      <Wrapper>
         <Content>
            <Logo>IN-HOUSE</Logo>
            <SearchIcon>{searchIcon}</SearchIcon>
            <MenuIcon>{menuIcon}</MenuIcon>
         </Content>
      </Wrapper>
   );
}
