import React from 'react';
import PropTypes, { number } from 'prop-types';
import styled from 'styled-components';
import { appColors } from '../../../style';

const stepperTheme = {
  DONE: { light: appColors.gray100, dark: appColors.gray600 },
  REMAINING: { light: appColors.gray500, dark: appColors.gray200 },
};

const getColor = (variant, state) => {
  return stepperTheme[state][variant];
};

const Stepper = ({ variant = 'light', state, ...props }) => {
  if (!state || (typeof state.step !== 'number' && typeof state.total !== 'number')) return null;
  return (
    <Styling variant={variant} {...props}>
      {[...Array(Math.abs(+state?.total) ?? 0)].map((_, idx) => (
        <span className={`step ${idx + 1 <= +state?.step ? 'step--has-completed' : ''}`.trim()} />
      ))}
    </Styling>
  );
};

const Styling = styled.div`
  display: grid;
  grid-gap: 1.5px;
  grid-auto-flow: column;

  .step {
    display: block;
    background-color: ${({ variant }) => getColor(variant, 'REMAINING')};
    height: 6px;
    width: 100%;

    &--has-completed {
      background-color: ${({ variant }) => getColor(variant, 'DONE')};
    }
  }
`;

Stepper.propTypes = {
  variant: PropTypes.oneOf(['light', 'dark']),
  state: PropTypes.shape({ step: PropTypes.number, total: number }),
};

export default Stepper;
