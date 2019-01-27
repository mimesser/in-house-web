import FindYourVenue from 'components/FindYourVenue';
import ListYourVenue from 'components/ListYourVenue';
import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container, Header } from './styles';

export default function Routes () {
   return (
      <Router>
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
      </Router>
   );
}
