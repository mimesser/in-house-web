import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  clearPrivateShareItem,
  selectPrivateShareItem,
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
import { SubmitButton, Layout, FormLayout, CustomOverlay, ShareContent } from './style';
import { DemoWinkConfirmationLayout } from '../demoStyle';
import { isEmailValid, isPhoneNumberValid } from '../../../../utils/validation';
import venue from '../../../../store/demo/data/venue';

const DemoWinkConfirmation = ({ onCloseClick }) => (
  <DemoWinkConfirmationLayout>
    <div>
      <div>
        in real life, this would send your message to the recipient through our system so you can
        stay anonymous
      </div>
      <WinkConfirmation size={12} />
    </div>
    <Button onClick={onCloseClick}>got it</Button>
  </DemoWinkConfirmationLayout>
);

const PrivateShare = ({
  venue: { name: venueName },
  type,
  getItemTitle,
  renderItem,
  recipientError,
  sending,
  share,
  setError,
  id,
}) => {
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');
  const handleRecipientChange = useCallback(
    (value) => {
      if (recipientError) {
        setError(undefined);
      }
      setRecipient(value);
    },
    [recipientError],
  );

  const send = () => share(type, id, recipient, message || placeholder);
  const recipientPlaceholder = 'email/mobile';
  const placeholder = `${venueName} insider? someone thinks you should know about — “${getItemTitle(
    id,
  )}”`;
  const isValidEmailOrPhone = isEmailValid(recipient) || isPhoneNumberValid(recipient);

  return (
    <Layout>
      <ShareContent>{renderItem(id)}</ShareContent>
      <FormLayout>
        <H2>send anonymous</H2>
        <CounterInput
          value={recipient}
          onChange={handleRecipientChange}
          max={50}
          placeholder={recipientPlaceholder}
          error={recipientError}
        />
        <CounterInput
          value={message}
          onChange={setMessage}
          max={120}
          rows={4}
          placeholder={placeholder}
          multiline
        />
        <SubmitButton disabled={!isValidEmailOrPhone} loading={sending} onClick={send} inverse>
          send anonymously
        </SubmitButton>
      </FormLayout>
    </Layout>
  );
};

const ModalWrapper = (props) => {
  const { shareItem, sending, sent, inDemo, close } = props;
  const venue = props.venue || (shareItem ? props.getVenue(shareItem.id) : undefined);

  if (!shareItem || shareItem.type !== props.type) {
    return null;
  }

  return (
    <Modal closeModal={close} canClose={!sending && !sent} inverse={sent} canDismiss={false} noPadd>
      <CustomOverlay />
      {!sent && <PrivateShare {...props} venue={venue} id={shareItem.id} />}
      {sent && (inDemo ? <DemoWinkConfirmation onCloseClick={close} /> : <WinkConfirmation />)}
    </Modal>
  );
};

const mapState = createStructuredSelector({
  shareItem: selectPrivateShareItem,
  venue: selectSelectedVenue,
  recipientError: selectPrivateShareRecipientError,
  sent: selectPrivateShareSent,
  sending: selectPrivateShareSending,
  inDemo: selectInDemo,
});

const mapDispatch = {
  close: clearPrivateShareItem,
  share: privateShare,
  setError: setPrivateShareRecipientError,
};

export default connect(mapState, mapDispatch)(ModalWrapper);
