import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import styled from 'styled-components';
import GlobalStyles from 'styling/GlobalStyles';
import FindYourVenue from './FindYourVenue';
import ListYourVenue from './ListYourVenue';

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
   justify-content: space-between;
   color: #fff;
   font-size: 20px;
   padding: 0 20px;
`;

export default class App extends React.Component {
   public render () {
      return (
         <Router>
            <Fragment>
               <GlobalStyles />
               <Container>
                  <Header>
                     <i className='material-icons'>
                        menu
                     </i>
                     <span>In House</span>
                     <i className='material-icons'>
                        share
                     </i>
                  </Header>
                  <Route path='/' exact={true} component={FindYourVenue} />
                  <Route path='/list' component={ListYourVenue} />
               </Container>
            </Fragment>
         </Router>
      );
   }
}
