import React, { useState, useEffect } from 'react';
import moment from 'moment';
import styled from 'styled-components';

const CountDownWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const CountDownItem = styled.span`
  color: #fff;
  font-size: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  line-height: 30px;
  margin: 10px;
  padding-top: 10px;
  position: relative;
  width: 100px;
  height: 100px;
`;

const CountDownSVG = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100px;
  height: 100px;
`;

export const CountDown = (props) => {
  const [countdownDays, setDays] = useState(undefined);
  const [countdownHours, setHours] = useState(undefined);
  const [countdownMinutes, setMinutes] = useState(undefined);
  const [countdownSeconds, setSeconds] = useState(undefined);

  useEffect(() => {
    const interval = setInterval(() => {
      const { timeTillDate, timeFormat } = props;
      const then = moment(timeTillDate, timeFormat);
      const now = moment();
      const countdown = moment(then - now);
      const days = countdown.format('D');
      const hours = countdown.format('HH');
      const minutes = countdown.format('mm');
      const seconds = countdown.format('ss');
      console.log(countdown);
      setDays(days);
      setHours(hours);
      setMinutes(minutes);
      setSeconds(seconds);
    }, 1000);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, []);

  function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  }

  function describeArc(x, y, radius, startAngle, endAngle) {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);

    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    const d = ['M', start.x, start.y, 'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y].join(' ');

    return d;
  }

  const SVGCircle = ({ radius }) => (
    <CountDownSVG>
      <path fill="none" stroke="#fff" strokeWidth="4" d={describeArc(50, 50, 48, 0, radius)} />
    </CountDownSVG>
  );

  /* eslint-disable camelcase */
  function mapNumber(number, in_min, in_max, out_min, out_max) {
    /* eslint-disable camelcase */
    return ((number - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
  }

  const daysRadius = mapNumber(countdownDays, 30, 0, 0, 360);
  const hoursRadius = mapNumber(countdownHours, 24, 0, 0, 360);
  const minutesRadius = mapNumber(countdownMinutes, 60, 0, 0, 360);
  const secondsRadius = mapNumber(countdownSeconds, 60, 0, 0, 360);

  return countdownSeconds ? (
    <>
      <CountDownWrapper>
        {countdownDays && (
          <CountDownItem>
            <SVGCircle radius={daysRadius} />
            {countdownDays}
          </CountDownItem>
        )}
        {countdownHours && (
          <CountDownItem>
            <SVGCircle radius={hoursRadius} />
            {countdownHours}
          </CountDownItem>
        )}
        {countdownMinutes && (
          <CountDownItem>
            <SVGCircle radius={minutesRadius} />
            {countdownMinutes}
          </CountDownItem>
        )}
        {countdownSeconds && (
          <CountDownItem>
            <SVGCircle radius={secondsRadius} />
            {countdownSeconds}
          </CountDownItem>
        )}
      </CountDownWrapper>
    </>
  ) : null;
};
