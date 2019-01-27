import api from 'api';
import * as React from 'react';
import { getVenues } from 'services/venue';
import {
   Button, Container, FoundSubText, Input, List, Loader, SubText, Title, Wrapper,
} from './styles';
import Venue from './Venue';
import IVenue from 'interfaces/IVenue';

class State {
   readonly filter: string = '';
   readonly venues?: IVenue[] = null;
}

export default class FindYourVenue extends React.Component<{}, State> {
   state = new State();

   async componentWillMount () {
      try {
         const venues = await getVenues();
         this.setState({ venues });
      } catch (err) {
         console.log(err);
      }
   }

   render () {
      const { filter, venues } = this.state;


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
               <Button to='/list'>List your house</Button>
            </Wrapper>
         </Container>
      );
   }

   changeFilter = ({ target: { value } }): void => {
      this.setState({ filter: value });
   }

   get subText (): React.ReactNode {
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

   get venues (): IVenue[] {
      const { venues: allVenues, filter } = this.state;
      if (!allVenues) return null;
      if (!filter) return [];
      const simpleFilter = filter.toLowerCase();
      return allVenues.filter((venue) => venue.name.toLowerCase().indexOf(simpleFilter) > -1);
   }
}
