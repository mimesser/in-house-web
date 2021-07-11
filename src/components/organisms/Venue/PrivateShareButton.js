import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { PokeButton } from '../../molecules';
import { setPrivateShareItem } from '../../../store/venues';
import { palette } from '../../../style';

const Circle = styled.span`
  ${PokeButton} {
    border-radius: 60px;
    padding: 0.5em 0.6em;
    background-color: ${({ color }) => color};
  }
`;

const Share = ({ id, type, openModal, onOpenSharePopup, size, circleColor }) => {
  const handleClick = useCallback(
    (e) => {
      e.stopPropagation();
      openModal(id, type);
      if (onOpenSharePopup && typeof onOpenSharePopup === 'function') {
        onOpenSharePopup();
      }
    },
    [id],
  );

  if (circleColor) {
    return (
      <Circle color={circleColor(palette)}>
        <PokeButton onClick={handleClick} size={size} />
      </Circle>
    );
  }

  return <PokeButton onClick={handleClick} size={size} />;
};

const mapDispatch = {
  openModal: setPrivateShareItem,
};

export default connect(undefined, mapDispatch)(Share);
