import Routes from 'components/Routes';
import * as React from 'react';
import { Provider } from 'react-redux';
import boot from 'services/boot';
import store from 'store';
import GlobalStyles from 'styling/GlobalStyles';

export default class App extends React.Component {
   async componentWillMount () {
      await boot();
   }

   public render () {
      return (
         <Provider store={store}>
            <GlobalStyles />
            <Routes />
         </Provider>
      );
   }
}
