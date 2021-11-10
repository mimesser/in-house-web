import React from 'react';

import { Modal } from '../Modal';
import Content from './content';

export const Terms = ({ modal, close }) =>
  modal ? (
    <Modal closeModal={close}>
      <Content />
    </Modal>
  ) : (
    <Content />
  );
export default Terms;
