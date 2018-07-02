import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Menu from './Menu';
import Search from './Search';

const Wrapper = styled.nav`
   position: fixed;
   top: 0;
   left: 0;
   right: 0;
   ${props => props.theme.B_7};
   z-index: 1;
`;

const Logo = styled(Link)`
   cursor: pointer;
   color: #999;
   &:hover {
      color: #aaa;
   }
`;

const Content = styled.div`
   display: flex;
   padding: 40px 40px 20px;
   max-width: 1024px;
   margin: 0 auto;
`;
const Right = styled.div`
   margin-left: auto;
   display: flex;
   align-items: center;
`;

export default function Header() {
   return (
      <Wrapper>
         <Content>
            <Logo to="/">IN-HOUSE</Logo>
            {/* <Right>
               <Search />
               <Menu />
            </Right> */}
         </Content>
      </Wrapper>
   );
}
