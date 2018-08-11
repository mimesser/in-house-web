import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Overlay, Section, Typography, Input, Button } from 'components';
import { createCategory } from 'services/category';


export default class CategoryForm extends Component {
   static propTypes = {
      industryId: PropTypes.string.isRequired,
      onClose: PropTypes.func.isRequired,
   };

   state = {
      error: null,
      name: '',
   }

   submit = async (e) => {
      e.preventDefault();
      const { industryId } = this.props;
      const { name } = this.state;
      const error = await createCategory({
         industryId, name,
      });
      if (error) {
         this.setState({ error });
      } else {
         this.props.onClose();
      }
   }

   changeHandler = key => (value) => {
      this.setState({ [key]: value });
   }

   render() {
      const { onClose } = this.props;
      const {
         error, name,
      } = this.state;

      return (
         <Overlay onClose={onClose}>
            <Section container centerAlign maxWidth={400}>
               <form onSubmit={this.submit}>
                  {
                     error && (
                        <div style={{ padding: '20px', color: '#fbb' }}>
                           {error}
                        </div>
                     )
                  }
                  <Typography H1>new catgory</Typography>
                  <div style={{ padding: '20px 0' }}>
                     <Input
                        E_1
                        value={name}
                        onChange={this.changeHandler('name')}
                        placeholder="name"
                     />
                  </div>
                  <div style={{ padding: '20px 0' }}>
                     <Button
                        I_1
                        type="submit"
                     >
                        submit
                     </Button>
                  </div>
               </form>
            </Section>
         </Overlay>
      );
   }
}
