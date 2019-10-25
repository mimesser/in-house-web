import React, { useCallback, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';

import {
  selectSelectedVenue,
  selectSelectedTag,
  selectRateTagConfirmation,
  setSelectedTag,
  rateTag,
} from '../../../../store/venues';
import { selectShowHelp } from '../../../../store/help';
import { Modal } from '../../Modal';
import { RateConfirmation } from '../RateConfirmation';
import { Dial } from '../../../molecules';
import { ItemTitle, Layout, SubTitle } from '../openCardStyle';
import { fontSize, spacing, theme } from '../../../../style';

const RateItemTitle = styled(ItemTitle)`
  color: ${({ rated }) => rated && theme.colors.textUltraLight};
  font-size: ${fontSize.large};
  margin-top: ${spacing.nano};
`;

const RateSubTitle = styled(SubTitle)`
  visibility: ${({ rated }) => (rated ? 'visible' : 'hidden')};
`;

const RateTag = ({ tag, rateTag, setRated, rated, showHelp }) => {
  const { name: tagName, userRate } = tag;
  const [value, setValue] = useState(userRate);

  useEffect(() => {
    setValue(userRate);
    return () => setRated(false);
  }, [tag]);
  const handleChange = useCallback(
    newValue => {
      if (newValue < 0 || newValue > 10) {
        return;
      }
      setValue(newValue);

      if (newValue !== '') {
        setRated(true);
        rateTag(newValue);
      }
    },
    [setValue, rateTag],
  );

  const sliderProps = {
    size: 450,
    padd: 100,
    inverse: rated,
  };

  let valueColor;
  if (!rated) {
    const { secondary, secondaryDark } = theme.colors;
    valueColor = secondaryDark;

    sliderProps.color = secondaryDark;
    sliderProps.knobColor = secondaryDark;
    sliderProps.circleColor = secondary;
    sliderProps.progressColor = secondaryDark;
  }

  return (
    <Layout>
      <RateSubTitle rated={rated}>you rated</RateSubTitle>
      <RateItemTitle rated={rated} keepSpace>
        {tagName}
      </RateItemTitle>
      <Dial
        value={showHelp ? 10.9 : value}
        valueColor={valueColor}
        onChange={handleChange}
        {...sliderProps}
        showHelp={showHelp}
        readonly={showHelp}
      />
    </Layout>
  );
};

const ModalWrapper = props => {
  const { tag, confirmation, setSelectedTag, venue } = props;
  const close = useCallback(() => setSelectedTag(undefined), []);
  const [rated, setRated] = useState(false);

  const showRateTag = tag && !confirmation;
  const showConfirmation = tag && confirmation;
  const inverse = showConfirmation || rated;

  return (
    <Modal open={!!tag} closeModal={close} inverse={inverse} title={venue.name}>
      {showRateTag ? <RateTag {...props} rated={rated} setRated={setRated} /> : null}
      {showConfirmation ? <RateConfirmation title={tag.name} {...confirmation} /> : null}
    </Modal>
  );
};

const mapState = createStructuredSelector({
  venue: selectSelectedVenue,
  tag: selectSelectedTag,
  confirmation: selectRateTagConfirmation,
  showHelp: selectShowHelp,
});
const mapDispatch = {
  setSelectedTag,
  rateTag,
};
export default connect(
  mapState,
  mapDispatch,
)(ModalWrapper);
