/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';

import { theme, palette, spacing } from '../../../style';
import SlidingCharacter from './Character';
import Text from './Text';

const Wrapper = styled.div`
  display: flex;
  color: ${({ color }) => color};
  font-size: ${({ fontSize }) => fontSize};
  > * {
    &:not(:first-child) {
      border-left: ${({ borderColor, borderWidth }) => `${borderColor} ${borderWidth} solid`};
    }
  }
  box-sizing: border-box;
`;

const defaultProps = {
  background: palette.transparent,
  characterSet: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'],
  characterWidth: '2em',
  fontSize: '2em',
  minLength: 2,
  padDirection: 'left',
  step: 200,
  textColor: theme.colors.primary,
  value: '0.0',
};

const escapeValue = (value, characterSet) =>
  value
    .split('')
    .map((char) => (characterSet.includes(char) ? char : characterSet[0]))
    .join('');

const getMinLengthFill = (currValue, characterSet, minLength) => {
  if (minLength && currValue.length < minLength) {
    return Array(minLength - currValue.length).fill(characterSet[0]);
  }
  return [];
};

export const SlidingValue = ({
  background = defaultProps.background,
  characterSet = defaultProps.characterSet,
  characterWidth = defaultProps.characterWidth,
  fontSize = defaultProps.fontSize,
  minLength = defaultProps.minLength,
  padDirection = defaultProps.padDirection,
  step = defaultProps.step,
  textColor = defaultProps.textColor,
  value = defaultProps.value,
}) => {
  console.log('@ Sliding Value');
  const initialValue = Array(value.length).fill(characterSet[0]).join('');
  const [prevValue, setPrevValue] = useState(initialValue);
  const [currValue, setCurrValue] = useState(initialValue);

  // persisted vars that inform state
  const shadowPrevValue = useRef(initialValue);
  const shadowCurrValue = useRef(initialValue);
  const updateTimer = useRef(null);

  const updateValue = () => {
    const escapedFinalValue = escapeValue(value, characterSet);
    if (updateTimer.current || shadowPrevValue.current === escapedFinalValue) {
      return;
    }

    shadowPrevValue.current = shadowCurrValue.current;
    setPrevValue(shadowPrevValue.current);

    const currChars = shadowCurrValue.current.split('');
    const finalChars = escapedFinalValue.split('');

    const nextValue = finalChars
      .map((char, idx) => {
        const currChar = currChars[idx];
        const charIdx = characterSet.indexOf(currChar);
        const nextChar =
          currChar === char || (charIdx === 0 && !characterSet.includes(char))
            ? currChar
            : characterSet[(charIdx + 1) % characterSet.length];
        return nextChar;
      })
      .join('');

    shadowCurrValue.current = nextValue;
    setCurrValue(shadowCurrValue.current);

    updateTimer.current = setTimeout(() => {
      updateTimer.current = null;
      updateValue();
    }, step);
  };

  useEffect(updateValue, []);
  useEffect(() => {
    if (updateTimer.current) {
      clearTimeout(updateTimer.current);
      updateTimer.current = null;
    }
    updateValue();
  }, [value, characterSet, step]);

  let prevChars;
  let currChars;

  if (padDirection === 'right') {
    prevChars = [...prevValue.split(''), ...getMinLengthFill(prevValue, characterSet, minLength)];
    currChars = [...currValue.split(''), ...getMinLengthFill(currValue, characterSet, minLength)];
  } else {
    prevChars = [...getMinLengthFill(prevValue, characterSet, minLength), ...prevValue.split('')];
    currChars = [...getMinLengthFill(currValue, characterSet, minLength), ...currValue.split('')];
  }

  return (
    <Wrapper color={textColor} fontSize={fontSize}>
      {prevChars.map((v, idx) => {
        console.log('###### VVV = ', v);
        return (
          <SlidingCharacter
            key={`sliding-${idx}`}
            background={background}
            characterWidth={characterWidth}
            prevValue={v === ' ' ? '\u2007' : v}
            step={step}
            textColor={textColor}
            value={currChars[idx] === ' ' ? '\u2007' : currChars[idx]}
          />
        );
      })}
    </Wrapper>
  );
};

export default SlidingValue;
