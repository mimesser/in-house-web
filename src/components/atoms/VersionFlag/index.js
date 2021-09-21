import React from 'react';
import styled from 'styled-components';

export const VersionFlag = () => {
  const VersionFlag = styled.div`
    position: fixed;
    background-color: #000;
    color: #f9f9f9;
    bottom: 0;
    right: 0;
    text-size-adjust: 100%;
    line-height: 1.2;
    font-size: 0.875rem;
    word-spacing: 0.25rem;
    font-family: HelveticaLTWXX-Bold, Helvetica, Sans-Serif;
    padding: 5px;
    opacity: 0.8;
    z-index: 99999999;
    border-radius: 3px;
    box-shadow: 0 11px 40px 0 rgb(0 0 0 / 25%), 0 2px 10px 0 rgb(0 0 0 / 12%);
  `;
  return <VersionFlag>{`${process.env.SENTRY_ENVIRONMENT}`}</VersionFlag>;
};
