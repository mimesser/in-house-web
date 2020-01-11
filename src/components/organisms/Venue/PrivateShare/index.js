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
import { selectInDemo } from '../../../../store/demo';
import { Modal } from '../../Modal';
import { Button, H2 } from '../../../atoms';
import { CounterInput, WinkConfirmation } from '../../../molecules';
import { SubmitButton, Layout } from './style';
import { DemoWinkConfirmationLayout } from '../demoStyle';
import { isEmailValid, isPhoneNumberValid } from '../../../../utils/validation';

const DemoWinkConfirmation = ({ onCloseClick }) => (
  <DemoWinkConfirmationLayout>
    <div>
      <div>
        in real life, this would send your message to the recipient through our system so you can stay anonymous
      </div>
      <WinkConfirmation size={12} />
    </div>
    <Button onClick={onCloseClick}>got it</Button>
  </DemoWinkConfirmationLayout>
);

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
  const isValidEmailOrPhone = isEmailValid(recipient) || isPhoneNumberValid(recipient);

  return (
    <Layout>
      {renderItem(id)}
      <H2>send anonymous</H2>
      <CounterInput
        value={recipient}
        onChange={handleRecipientChange}
        max={50}
        error={recipientError}
        subtext="sent via in-house network"
      />
      <CounterInput
        value={message}
        onChange={setMessage}
        max={60}
        rows={4}
        placeholder={placeholder}
        multiline
        subtext="anonymous message"
      />
      <SubmitButton disabled={!isValidEmailOrPhone} loading={sending} onClick={send}>
        send to co-insider
      </SubmitButton>
    </Layout>
  );
};

const ModalWrapper = props => {
  const { id, sending, sent, inDemo, close } = props;
  const venue = props.venue || (id ? props.getVenue(id) : undefined);

  if (!id) {
    return null;
  }

  return (
    <Modal
      closeModal={close}
      canClose={!sending && !sent}
      inverse={sent}
      canDismiss={false}
      title={venue && venue.name}
    >
      {!sent && <PrivateShare {...props} venue={venue} />}
      {sent && (inDemo ? <DemoWinkConfirmation onCloseClick={close} /> : <WinkConfirmation />)}
    </Modal>
  );
};

const mapState = createStructuredSelector({
  id: selectPrivateShareItemId,
  venue: selectSelectedVenue,
  recipientError: selectPrivateShareRecipientError,
  sent: selectPrivateShareSent,
  sending: selectPrivateShareSending,
  inDemo: selectInDemo,
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
