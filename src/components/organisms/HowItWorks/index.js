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
  font-size: ${calcRem('28px')};
  ${font.bold};
  margin-bottom: 9px;
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
  font-size: ${calcRem('25px')};
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
  margin-bottom: ${spacing.xl};

  padding: 24px;

  @media screen and (max-width: ${breakpoints.md}) {
    ${Title}:nth-child(2n + 1) {
      font-size: ${calcRem('14px')};
    }
    ${Desc}:nth-child(2n) {
      font-size: ${calcRem('12px')};
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
            <Icon icon={c.props.icon} size={4} color={themeColors.mediumGray} />
          </Wrapper>
          <div>{c}</div>
        </Step>
      );
    })}
  </div>
))`
  @media screen and (min-width: ${breakpoints.md}) {
    ${Step}:nth-child(2n + 1) {
      margin-left: -100px;
    }
    ${Step}:nth-child(2n) {
      margin-left: 100px;
    }
  }
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
  ${Steps} {
    max-width: ${breakpoints.md};
    margin: 0 auto;
  }
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
  width: 100%;
  text-align: center;
  font-size: ${calcRem('52px')};
  // margin: 10vh ${spacing.xl} ${spacing.sm} ${spacing.xl};
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
          <StepSection icon="marker">
            <Title>list your workplace</Title>
            <Desc>whithout anyone knowing it was you</Desc>
          </StepSection>
          <StepSection icon="winky-circle">
            <Title>create a team password question</Title>
            <Desc>
              so only them can speak <mark>anonymously</mark>
            </Desc>
          </StepSection>
          <StepSection icon="esg">
            <Title>rate everything from the inside</Title>
            <Desc>that affects people, planet and profits</Desc>
          </StepSection>
          <StepSection icon="paper-plane">
            <Title>
              share <mark>anonymously</mark>
            </Title>
            <Desc>get your team talking</Desc>
          </StepSection>
          <StepSection icon="pulse">
            <Title>watch what happens</Title>
            <Desc>when your company can see the truth</Desc>
          </StepSection>
        </Steps>
      </Layout>
    </>
  );
};
