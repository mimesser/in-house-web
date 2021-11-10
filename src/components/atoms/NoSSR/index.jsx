import React, { useEffect, useState } from 'react';

export const NoSSR = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? children : null;
};

export const withNoSSR = (Component) => (props) => (
  <NoSSR>
    <Component {...props} />
  </NoSSR>
);
