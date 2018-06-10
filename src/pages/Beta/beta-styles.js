import styled, { css } from 'styled-components';

const content = css`
   max-width: 1024px;
   margin: 0 auto;
   padding-left: 20px;
   padding-right: 20px;
`;

const narrowContent = css`
   max-width: 600px;
   margin: 0 auto;
   padding-left: 20px;
   padding-right: 20px;
`;


export const Wrapper = styled.div`
   background-color: ${props => props.theme.A_7};
`;

export const Header = styled.nav`
   position: fixed;
   top: 0;
   left: 0;
   right: 0;
`;

export const HeaderContent = styled.div`
   ${content};
   display: flex;
   margin: 0 auto;
   padding: 20px;
   align-items: center;
`;

export const Logo = styled.div`
   color: #fff;
`;

export const SearchIcon = styled.div`
   margin-left: auto;
   height: 24px;
   width: 24px;
   svg {
      fill #fff;
   }
`;

export const MenuIcon = styled.div`
   height: 24px;
   width: 24px;
   svg {
      fill #fff;
   }
`;

export const Section1 = styled.div`
   overflow: auto;
   padding-top: 120px
   padding-bottom: 60px;
   text-align: center;
   ${content};
`;

export const Section2 = styled.div`
   text-align: center;
   ${content};
`;

export const Section3 = styled.div`
`;

export const Section4 = styled.div`
   ${narrowContent};
   .L1 {
      margin-bottom: 20px;
   }
`;

export const Section5 = styled.div`
`;

export const Section6 = styled.div`
`;

export const Video = styled.div`
   height: 400px;
   background-image: url(${require('assets/images/main.jpg')});
   background-position: center;
   background-repeat: no-repeat;
   background-size: cover;
`;
