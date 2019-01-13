import * as React from 'react';
import styled from 'styled-components';
import GlobalStyles from 'styling/GlobalStyles';
import FindYourHouse from './FindYourHouse';
// import './../assets/scss/App.scss';

// const reactLogo = require('../assets/img/react_logo.svg');

// export interface IAppProps {
// }

const { Fragment } = React;

export const Container = styled.div`
   display: flex;
   flex-direction: column;
   height: 100%;
`;

export const Header = styled.header`
   height: 48px;
   background-color: #0939CF;
   display: flex;
   align-items: center;
   justify-content: center;
   color: #fff;
   font-size: 20px;
`;

export default class App extends React.Component {
   public render () {
      return (
         <Fragment>
            <GlobalStyles />
            <Container>
               <Header>In House</Header>
               <FindYourHouse />
            </Container>
         </Fragment>
      );
   }
}
