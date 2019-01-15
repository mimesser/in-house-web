import axios from 'axios';
import * as React from 'react';
import {
   Button, Container, FoundSubText, Input, List, Loader, SubText, Title, Wrapper,
} from './styles';
import Venue from './Venue';

export default class FindYourHouse extends React.Component {
   state = {
      filter: '',
      venues: null,
   };

   async componentWillMount () {
      try {
         const { data: { venues } } = await axios.get('https://in-house-dev.azurewebsites.net/api/aggregate');
         this.setState({ venues });
      } catch (err) {
         console.log(err);
      }
   }

   render () {
      const { venues } = this;
      const { filter } = this.state;

      if (!venues) {
         return (
            <Container>
               <Loader>Loading...</Loader>
            </Container>
         );
      }

      return (
         <Container>
            <Wrapper>
               <Title>
                  Find your house
               </Title>
               <Input placeholder='Search by name or address...' value={filter} onChange={this.changeFilter} />
               {this.subText}
            </Wrapper>
            <List>
               {venues.map((venue) => <Venue key={venue.id} venue={venue} />)}
            </List>
            <Wrapper>
               <Button>List your house</Button>
            </Wrapper>
         </Container>
      );
   }

   changeFilter = ({ target: { value } }) => {
      this.setState({ filter: value });
   }

   get subText () {
      const { filter } = this.state;
      return filter
         ? (
            <FoundSubText>
               Search results
            </FoundSubText>
         ) : (
            <SubText>
               You can find your workplace by looking up it’s name
            </SubText>
         );
   }

   get venues () {
      const { venues: allVenues, filter } = this.state;
      if (!allVenues) return null;
      if (!filter) return [];
      const simpleFilter = filter.toLowerCase();
      return allVenues.filter((venue) => venue.name.toLowerCase().indexOf(simpleFilter) > -1);
   }
}
