import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
   clearPrivateShareItemId,
   selectPrivateShareItemId,
   selectPrivateShareRecipientError,
   selectSelectedVenue,
   privateShare,
   selectPrivateShareSent,
   selectPrivateShareSending,
   setPrivateShareRecipientError,
} from '../../../../store/venues';
import { Heading } from '../../../atoms';
import { Modal } from '../../Modal';
import { CounterInput, WinkConfirmation } from '../../../molecules';
import { SubmitButton } from './style';

const PrivateShare = ({
   venue: { name: venueName },
   type,
   id,
   getItemTitle,
   renderItem,
   recipientError,
   sending,
   share,
   setError,
}) => {
   const [recipient, setRecipient] = useState('');
   const [message, setMessage] = useState('');
   const handleRecipientChange = useCallback(
      value => {
         if (recipientError) {
            setError(undefined);
         }
         setRecipient(value);
      },
      [recipientError],
   );
   const send = () => share(type, id, recipient, message || placeholder);
   const placeholder = `${venueName} insider? someone wants you to know about — “${getItemTitle(id)}”`;

   return (
      <>
         <Heading>send anonymous</Heading>
         {renderItem(id)}
         <CounterInput
            value={recipient}
            onChange={handleRecipientChange}
            max={50}
            placeholder="recipient email/mobile"
            error={recipientError}
         />
         <CounterInput value={message} onChange={setMessage} max={60} multiline rows={3} placeholder={placeholder} />
         <SubmitButton visible={recipient.length > 0} loading={sending} onClick={send}>
            send
         </SubmitButton>
      </>
   );
};

const ModalWrapper = props => {
   const { id, sending, sent, close, venue } = props;
   return (
      <Modal
         open={!!id}
         closeModal={close}
         canClose={!sending && !sent}
         inverse={sent}
         canDismiss={false}
         title={venue && venue.name}
      >
         {id && !sent && <PrivateShare {...props} />}
         {id && sent && <WinkConfirmation />}
      </Modal>
   );
};

const mapState = createStructuredSelector({
   id: selectPrivateShareItemId,
   venue: selectSelectedVenue,
   recipientError: selectPrivateShareRecipientError,
   sent: selectPrivateShareSent,
   sending: selectPrivateShareSending,
});
const mapDispatch = {
   close: clearPrivateShareItemId,
   share: privateShare,
   setError: setPrivateShareRecipientError,
};

export default connect(
   mapState,
   mapDispatch,
)(ModalWrapper);
