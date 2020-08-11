import React from 'react';

import { Icon } from '../../atoms';
import { FlagButton } from './openCardStyle';
import { calcRem } from '../../../style';

export const FlagItem = ({ flagged, toggleFlag, disabled }) => (
  <FlagButton
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleFlag();
    }}
    flagged={flagged}
    disabled={disabled}
  >
    <Icon size={0.75} icon={flagged ? 'check' : 'flag'} color="secondary" />
    <span>{flagged ? 'recorded' : 'remove'}</span>
  </FlagButton>
);
