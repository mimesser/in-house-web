import * as React from 'react';

export const withForwardedRef = Component =>
  React.forwardRef((props, ref) => <Component {...props} forwardedRef={ref} />);
