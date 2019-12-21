import React from 'react';

module.exports = new Proxy(
  {},
  {
    get: (target, property) => {
      const Mock = props => {
        const { children } = props;

        return <span>{children}</span>;
      };

      Mock.displayName = property;

      return Mock;
    },
  },
);
