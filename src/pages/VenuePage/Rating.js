import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Overlay, Section, Typography } from 'components';
import { times } from 'utils';
import { rateCategory } from 'services/venue';
import styled from 'styled-components';

const Block = styled.div`
   padding: 10px;
   margin: 4px;
   cursor: pointer;
   &:hover {
      padding: 16px;
      font-size: 30px;
      background-color: rgba(0, 0, 0, 0.8);
   }
`;

export default class Rating extends Component {
   state = {
      error: null,
   }

   select = async (rating) => {
      const { venueId, categoryId } = this.props;
      const error = await rateCategory({ venueId, categoryId, rating });
      if (error) {
         this.setState({ error });
      } else {
         this.props.onClose();
      }
   }

   render() {
      const { name, onClose } = this.props;
      const { error } = this.state;

      return (
         <Overlay onClose={onClose}>
            <Section container centerAlign maxWidth={400}>
               {
                  error && (
                     <div style={{ padding: '20px', color: '#fbb' }}>
                        {error}
                     </div>
                  )
               }
               <Typography H1>{name}</Typography>
               <div style={{ display: 'flex', height: '40px', alignItems: 'center' }}>
                  {times(11, t => (
                     <Block key={t} onClick={() => this.select(t)}>{t}</Block>
                  ))}
               </div>
            </Section>
         </Overlay>
      );
   }
}

Rating.propTypes = {
   venueId: PropTypes.string.isRequired,
   categoryId: PropTypes.string.isRequired,
   name: PropTypes.string.isRequired,
   onClose: PropTypes.func.isRequired,
};
