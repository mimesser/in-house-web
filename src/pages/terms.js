import React, { Component } from 'react';
import styled from 'styled-components';

import Terms from '../components/organisms/Terms';
import { Page } from '../components/organisms';
import { spacing, font } from '../style';

const Content = styled.div`
  margin: 0 ${spacing.md};
  strong {
    ${font.bold};
  }
  text-align: justify;
  h2,
  h3,
  h4 {
    font: inherit;
    letter-spacing: inherit;
    ${font.bold};
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
      <Page title="Terms of Service">
        <Content>
          <Terms />
        </Content>
      </Page>
    );
  }
}

export default TermsPage;
