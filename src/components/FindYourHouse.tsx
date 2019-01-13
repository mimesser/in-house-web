import * as React from 'react';
import { Button, Container, Content, Header, Input, List, SubText, Title } from './find-your-house-styles';

export default function FindYourHouse () {
   return (
      <Container>
         <Header>In House</Header>
         <Content>
            <Title>
               Find your house
            </Title>
            <Input placeholder='Search by name or address...' />
            <SubText>
               You can find your workplace by looking up it’s name
            </SubText>
            <List />
            <Button>List your house</Button>
         </Content>
      </Container>
   );
}
