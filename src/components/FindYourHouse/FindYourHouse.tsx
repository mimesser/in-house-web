import * as React from 'react';
import {
   Button, Container, Input, List, SubText, Title, Wrapper,
} from './styles';
import VenueList from './VenueList';

export default function FindYourHouse () {
   return (
      <Container>
         <Wrapper>
            <Title>
               Find your house
            </Title>
            <Input placeholder='Search by name or address...' />
            <SubText>
               You can find your workplace by looking up it’s name
            </SubText>
         </Wrapper>
         <List>
            <VenueList />
         </List>
         <Wrapper>
            <Button>List your house</Button>
         </Wrapper>
      </Container>
   );
}
