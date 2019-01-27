import { createStore } from 'redux';
import rootReducer from './root-reducer';

declare global {
   /* tslint:disable interface-name */
   interface Window {
      __REDUX_DEVTOOLS_EXTENSION__ (): any;
   }
   /* tslint:enable */
}

export default createStore(
   rootReducer,
   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
