import React from 'react';
import { debounce } from 'lodash';

import { Icon } from '../../atoms';
import { FlagButton } from './openCardStyle';

export const FlagItem = ({ flagged, toggleFlag, disabled }) => (
  <FlagButton onClick={debounce((e) => toggleFlag(), 100)} flagged={flagged} disabled={disabled}>
    <Icon size={0.75} icon={flagged ? 'check' : 'flag'} color="secondary" />
    <span>{flagged ? 'recorded' : 'remove'}</span>
  </FlagButton>
);
