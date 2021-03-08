import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Router from 'next/router';
import { rgba } from 'polished';
import { Button, Brand, TransparentLinkStyle, Icon } from '../../atoms';
import { Modal } from '../Modal';
import {
  fontSize,
  font,
  palette,
  spacing,
  breakpoints,
  deskPadRem,
  onDesktop,
  appColors,
  themeColors,
  calcRem,
} from '../../../style';

const OpenLink = styled(Button)`
  ${TransparentLinkStyle};
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
  font-size: ${fontSize.sm};
  ${font.bold};
  position: relative;
  color: white;
  mark {
    text-decoration: underline;
    background: none;
    color: currentColor;
  }
`;

const Desc = styled.div`
  color: ${appColors.grey7};
  font-size: ${fontSize.sm};
  mark {
    text-decoration: underline;
    background: none;
    color: currentColor;
    ${font.bold};
  }
`;
const Step = styled.div`
  color: ${palette.offWhite};
  display: flex;

  &:not(:last-child) {
    padding-bottom: ${spacing.xxxl};
  }

  @media (min-width: ${breakpoints.md}) {
    ${Title}:nth-child(2n + 1) {
      font-size: ${fontSize.md};
    }
    ${Desc} {
      font-size: ${fontSize.md};
    }
  }

  @media (min-width: ${breakpoints.lg}) {
    &:not(:last-child) {
      padding-bottom: 64px;
    }
  }
`;

const Wrapper = styled.div`
  margin-right: 24px;
`;

const Steps = styled(({ children, className }) => (
  <div className={className}>
    {React.Children.map(children, ({ ...c }, i) => {
      return (
        <Step key={i}>
          <Wrapper>
            <Icon icon={c.props.icon} size={2.5} color={themeColors.mediumGray} />
          </Wrapper>
          <div>{c}</div>
        </Step>
      );
    })}
  </div>
))`
  @media (min-width: ${breakpoints.lg}) {
    ${Step}:nth-child(odd) {
      margin-left: 50px;
    }
    ${Step}:nth-child(even) {
      margin-left: 230px;
    }
  }

  ${Step} > div {
    display: flex;
    align-items: center;
  }
`;

const NotifyLink = styled(Button)`
  margin-bottom: ${spacing.xxxl};

  padding: ${spacing.xl};
  min-height: ${spacing.xxxl};
  height: ${spacing.xxxl};
`;

const Layout = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  background: ${appColors.midnight};
  justify-content: space-evenly;

  @media (min-width: ${breakpoints.lg}) {
    align-items: center;
    padding: ${spacing.xl} 0;
  }
`;
const PaperPlan = styled(Icon)`
  position: absolute;
  margin-left: 10px;
  bottom: 0px;
  color: white;
`;

const PageTitle = styled(Title)`
  width: 100%;
  font-size: 24px;
  padding: ${spacing.xxl} 0;

  @media (min-width: ${breakpoints.md}) {
    display: flex;
    font-size: 28px;
  }

  @media (min-width: ${breakpoints.lg}) {
    font-size: 32px;
    justify-content: center;
  }
`;

const StepSection = styled.div`
  ${Title} {
    padding-bottom: ${spacing.xs};
  }
`;

export const HowItWorks = () => {
  return (
    <>
      <Layout>
        <PageTitle>how it works</PageTitle>
        <Steps>
          <StepSection icon="marker">
            <Title>list your workplace</Title>
            <Desc>without anyone knowing it was you</Desc>
          </StepSection>
          <StepSection icon="winky-circle">
            <Title>create a team password question</Title>
            <Desc>so only your team can speak safely</Desc>
          </StepSection>
          <StepSection icon="rate">
            <Title>rate everything from the inside</Title>
            <Desc>that affect people, planet & profits</Desc>
          </StepSection>
          <StepSection icon="paper-plane">
            <Title>get your team talking</Title>
            <Desc>share anonymously so no one knows it's you</Desc>
          </StepSection>
          <StepSection icon="seewhathappens">
            <Title>watch what happens</Title>
            <Desc>when your company can see the truth</Desc>
          </StepSection>
        </Steps>
      </Layout>
    </>
  );
};
