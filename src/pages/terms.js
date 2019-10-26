import React, { Component } from 'react';
import styled from 'styled-components';
import Terms from '../components/organisms/Terms';
import { Page } from '../components/templates';
import { spacing } from '../style';

const Content = styled.div`
  margin: 0 ${spacing.medium};
  strong {
    font-weight: 600;
  }
  text-align: justify;
  h2,
  h3,
  h4 {
    font: inherit;
    letter-spacing: inherit;
    font-weight: 600;
  }
  h4 {
    text-decoration: underline;
  }
  h2 {
    text-align: center;
  }
  a {
    color: inherit;
  }
`;

class TermsPage extends Component {
  render() {
    return (
      <Page title="terms of service">
        <Content>
          <Terms />
        </Content>
      </Page>
    );
  }
}

export default TermsPage;
