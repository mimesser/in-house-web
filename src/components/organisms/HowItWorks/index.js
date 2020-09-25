import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Router from 'next/router';
import { Button, Brand, TransparentLinkStyle, Icon } from '../../atoms';
import { Modal } from '../Modal';
import { fontSize, font, palette, spacing, breakpoints, deskPadRem, onDesktop, appColors } from '../../../style';

import { rgba } from 'polished';
const OpenLink = styled(Button)`
  ${TransparentLinkStyle};
`;

const Step = styled.div`
  color: ${palette.offWhite};
  display: flex;
  margin-bottom: ${spacing.xl};
`;

const Num = styled.div`
  border: 1px solid ${palette.white};
  border-radius: 50%;
  width: 2em;
  height: 2em;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${fontSize.md};
  ${font.bold};
  margin-right: ${spacing.xl};
`;

const Title = styled.div`
  font-size: ${fontSize.md};
  ${font.bold};
  margin-bottom: ${spacing.sm};
  position: relative;
`;

const Desc = styled.div`
  mark {
    text-decoration: underline;
    background: none;
    color: currentColor;
    ${font.bold};
  }
`;

const Steps = styled(({ children, className }) => (
  <div className={className}>
    {React.Children.map(children, (c, i) => (
      <Step key={i}>
        <Num>{i + 1}</Num>
        <div>{c}</div>
      </Step>
    ))}
  </div>
))`
  margin-top: ${spacing.sm};
  ${onDesktop(`margin-top: auto`)};
  margin-bottom: auto;
  padding: ${spacing.xxxl};
`;

const NotifyLink = styled(Button)`
  margin-bottom: ${spacing.xxxl};

  padding: ${spacing.xl};
  min-height: ${spacing.xxxl};
  height: ${spacing.xxxl};
`;

const Layout = styled.div`
  height: 100vh;
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;

  background: ${appColors.midnight};

  margin: 0;
  paddding: ${spacing.xl};
`;
const PaperPlan = styled(Icon)`
  position: absolute;
  margin-left: 10px;
  bottom: 0px;
  color: white;
`;

const PageTitle = styled(Title)`
  font-size: ${fontSize.lg};
  margin: 10vh ${spacing.xl} ${spacing.sm} ${spacing.xl};
`;
const StepSection = styled.span`
  display: block;
`;
export const HowItWorks = () => {
  return (
    <>
      <Layout>
        <PageTitle>how it works</PageTitle>
        <Steps>
          <StepSection>
            <Title>list your workplace</Title>
            <Desc>
              free & <mark>anonymous</mark>
            </Desc>
          </StepSection>
          <StepSection>
            <Title>add a starter “mink”</Title>
            <Desc>
              a team security question allowing only insiders to speak — <mark>anonymously</mark>
            </Desc>
          </StepSection>
          <StepSection>
            <Title>rate your workplace</Title>
            <Desc>
              staying 100% <mark>anonymous</mark> without logins or emails
            </Desc>
          </StepSection>
          <StepSection>
            <Title>
              share with your team
              <PaperPlan icon="paper-plane" size={1.5} color="text" />
            </Title>
            <Desc>
              yup, <mark>anonymously</mark>
            </Desc>
          </StepSection>
          <StepSection>
            <Title>let leadership hear you</Title>
            <Desc>
              safely, <mark>anonymously</mark> and in-consensus — for the first time ever
            </Desc>
          </StepSection>
        </Steps>
      </Layout>
    </>
  );
};
