import React from 'react';

import { Commands, Main } from './style';

export const StepLayout = ({ main, commands, step }) => (
   <>
      <Main>{main}</Main>
      <Commands step={step}>{commands}</Commands>
   </>
);
