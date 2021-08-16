import React from 'react';
import { debounce } from 'lodash';
import { palette } from '../../../style';
import { Icon } from '../../atoms';
import { FlagButton } from './openCardStyle';

export const FlagItem = ({ flagged, toggleFlag, disabled, color }) => (
  <FlagButton onClick={debounce((e) => toggleFlag(), 100)} flagged={flagged} disabled={disabled}>
    <Icon size={0.75} icon={flagged ? 'check' : 'flag'} color={color} />
    <span>{flagged ? 'recorded' : 'remove'}</span>
  </FlagButton>
);
