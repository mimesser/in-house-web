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
import { Modal } from '../../Modal';
import { CounterInput, WinkConfirmation, PokeButton } from '../../../molecules';
import { SendAnonymous, SubmitButton, Layout, Tip } from './style';

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
   const placeholder = `${venueName} insider? someone thinks you should know about — “${getItemTitle(id)}”`;

   return (
      <Layout>
         {renderItem(id)}
         <SendAnonymous>
            <span>send anonymous</span>
            <PokeButton />
         </SendAnonymous>
         <Tip>send text or email via in-house network</Tip>
         <CounterInput value={recipient} onChange={handleRecipientChange} max={50} error={recipientError} marginless />
         <Tip>anonymous message</Tip>
         <CounterInput
            value={message}
            onChange={setMessage}
            max={60}
            rows={4}
            placeholder={placeholder}
            multiline
            marginless
         />
         <SubmitButton disabled={recipient.length === 0} loading={sending} onClick={send}>
            send to co-insider
         </SubmitButton>
      </Layout>
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
