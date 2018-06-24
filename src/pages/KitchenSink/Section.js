import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
   border-bottom: 1px solid #444;
   margin: 20px 0;
`;
const Header = styled.h4`
   color: #ffff00;
`;
const Content = styled.div`
   padding: 20px 0;
`;

export default function Section({ header, children }) {
   return (
      <Container>
         <Header>{header}</Header>
         <Content>{children}</Content>
      </Container>
   );
}

Section.propTypes = {
   header: PropTypes.string.isRequired,
   children: PropTypes.node.isRequired,
};
