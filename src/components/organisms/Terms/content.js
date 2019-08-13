import React from 'react';

const markup = { __html: require(`!raw-loader!./content.html`).default };

// eslint-disable-next-line react/no-danger
export default <div dangerouslySetInnerHTML={markup} />;
