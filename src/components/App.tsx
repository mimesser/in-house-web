import * as React from 'react';
import GlobalStyles from 'styling/GlobalStyles';
import FindYourHouse from './FindYourHouse';
// import './../assets/scss/App.scss';

// const reactLogo = require('../assets/img/react_logo.svg');

// export interface IAppProps {
// }

export default class App extends React.Component {
   public render () {
      return (
         <div className='app'>
            <GlobalStyles />
            <FindYourHouse />
         </div>
      );
   }
}
