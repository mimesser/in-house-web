import ReactDOM from 'react-dom';

import { withNoSSR } from '../NoSSR';

export const Portal = withNoSSR(({ children, node = document.body }) => ReactDOM.createPortal(children, node));
