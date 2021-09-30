import React from 'react';
import styled from 'styled-components';

const markup = { __html: require(`!raw-loader!./content.html`).default };

const Main = styled.div`
  width: 96%;
  margin-left: 2%;
  padding-right: 150px;
  text-transform: initial;
  text-align: left;
  padding-bottom: 50px;
  @media (max-width: 991px) {
    padding-right: 0px;
  }
  > div * {
    text-align: left;
  }
  > div h1 {
    margin-top: 25px;
  }
  > div h2 {
    text-align: left;
    line-height: 1.5;
    padding: 15px 0px;
    font-size: 18px;
  }
  > div h3 {
    font-size: 14px;
  }
`;

// eslint-disable-next-line react/no-danger
export const Content = () => <Main dangerouslySetInnerHTML={markup} />;
export default Content;
