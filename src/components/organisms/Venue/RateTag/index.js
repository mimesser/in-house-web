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
import { ItemTitle, Layout } from '../openCardStyle';
import { fontSize, spacing, theme, fontWeight, palette } from '../../../../style';

const RateItemTitle = styled(ItemTitle)`
  color: ${({ rated }) => rated && theme.colors.lightGray};
  font-size: ${fontSize.lg};
  margin-top: ${spacing.xxs};
`;

// TODO
const RateSubTitle = styled.div`
  font-size: ${fontSize.lg};
  font-weight: ${fontWeight.bold}
  color: ${palette.lightGray};
  margin-bottom: ${spacing.lg};
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
    size: 420,
    inverse: rated,
  };

  let valueColor;
  if (!rated) {
    const { mediumGray, darkGray } = theme.colors;
    valueColor = darkGray;

    sliderProps.color = darkGray;
    sliderProps.knobColor = darkGray;
    sliderProps.circleColor = mediumGray;
    sliderProps.progressColor = darkGray;
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

  if (!tag) {
    return null;
  }

  const showRateTag = !confirmation;
  const showConfirmation = confirmation;
  const inverse = showConfirmation || rated;

  return (
    <Modal closeModal={close} inverse={inverse} title={venue.name}>
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
