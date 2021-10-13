import React from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  text-align: center;
  > div {
    margin: 0px !important;
  }
`;

const Time = styled.div`
  font-size: 32px;
`;

export const CountDown = (props) => {
  const minuteSeconds = 60;
  const hourSeconds = 3600;
  const daySeconds = 86400;

  const timerProps = {
    isPlaying: true,
    size: 120,
    strokeWidth: 6,
  };

  const renderTime = (dimension, time) => {
    return (
      <div>
        <Time>{time}</Time>
        <div>{dimension}</div>
      </div>
    );
  };

  const getTimeSeconds = (time) => (minuteSeconds - time) | 0; // eslint-disable-line no-bitwise

  const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0; // eslint-disable-line no-bitwise

  const getTimeHours = (time) => ((time % daySeconds) / hourSeconds) | 0; // eslint-disable-line no-bitwise

  const getTimeDays = (time) => (time / daySeconds) | 0; // eslint-disable-line no-bitwise

  const stratTime = Date.now() / 1000; // use UNIX timestamp in seconds
  const endTime = new Date(props.timeTillDate).getTime() / 1000; // use UNIX timestamp in seconds

  const remainingTime = endTime - stratTime;
  const days = Math.ceil(remainingTime / daySeconds);
  const daysDuration = days * daySeconds;

  return (
    <Wrapper>
      <CountdownCircleTimer
        /* eslint-disable react/jsx-props-no-spreading */
        {...timerProps}
        colors={[['#FFF']]}
        duration={daysDuration}
        initialRemainingTime={remainingTime}
      >
        {({ elapsedTime }) => renderTime('days', getTimeDays(daysDuration - elapsedTime))}
      </CountdownCircleTimer>
      <CountdownCircleTimer
        /* eslint-disable react/jsx-props-no-spreading */
        {...timerProps}
        colors={[['#FFF']]}
        duration={daySeconds}
        initialRemainingTime={remainingTime % daySeconds}
        onComplete={(totalElapsedTime) => [remainingTime - totalElapsedTime > hourSeconds]}
      >
        {({ elapsedTime }) => renderTime('hours', getTimeHours(daySeconds - elapsedTime))}
      </CountdownCircleTimer>
      <CountdownCircleTimer
        /* eslint-disable react/jsx-props-no-spreading */
        {...timerProps}
        colors={[['#FFF']]}
        duration={hourSeconds}
        initialRemainingTime={remainingTime % hourSeconds}
        onComplete={(totalElapsedTime) => [remainingTime - totalElapsedTime > minuteSeconds]}
      >
        {({ elapsedTime }) => renderTime('minutes', getTimeMinutes(hourSeconds - elapsedTime))}
      </CountdownCircleTimer>
      <CountdownCircleTimer
        /* eslint-disable react/jsx-props-no-spreading */
        {...timerProps}
        colors={[['#FFF']]}
        duration={minuteSeconds}
        initialRemainingTime={remainingTime % minuteSeconds}
        onComplete={(totalElapsedTime) => [remainingTime - totalElapsedTime > 0]}
      >
        {({ elapsedTime }) => renderTime('seconds', getTimeSeconds(elapsedTime))}
      </CountdownCircleTimer>
    </Wrapper>
  );
};
