import React from 'react';

const markup = { __html: require(`!raw-loader!./content.html`) };

export default <div dangerouslySetInnerHTML={markup} />;
