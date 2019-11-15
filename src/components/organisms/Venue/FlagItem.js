import React from 'react';

import { Icon } from '../../atoms';
import { FlagButton } from './openCardStyle';

export const FlagItem = ({ flagged, toggleFlag, disabled }) => (
  <FlagButton onClick={toggleFlag} flagged={flagged} disabled={disabled}>
    <Icon icon={flagged ? 'check' : 'flag'} color="secondary" />
    <span>{flagged ? 'recorded' : 'remove'}</span>
  </FlagButton>
);
