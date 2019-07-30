import React from 'react';

import { Modal } from '../Modal';
import content from './content';

export default function Terms({ modal, open, close }) {
   if (modal) {
      return (
         <Modal open={open} closeModal={close}>
            {content}
         </Modal>
      );
   }

   return content;
}
