import React from 'react';

import { Modal } from '../Modal';
import content from './content';

export default function Terms({ modal, close }) {
  if (modal) {
    return <Modal closeModal={close}>{content}</Modal>;
  }

  return content;
}
