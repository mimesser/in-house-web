import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import { Button, Brand, TransparentLinkStyle, Icon } from '../../atoms';
import { Modal } from '../Modal';
import { fontSize, font, palette, spacing, breakpoints, deskPadRem, onDesktop } from '../../../style';

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
  margin-top: ${spacing.xxxl};
  ${onDesktop(`margin-top: auto`)};
  margin-bottom: auto;
`;

const NotifyLink = styled(Button)`
  margin-bottom: ${spacing.xxxl};
`;

const Layout = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: ${breakpoints.sm};
  margin: 0 auto;
  ${onDesktop(`margin-left: ${deskPadRem}`)};
`;
const PaperPlan = styled(Icon)`
  position: absolute;
  margin-left: 10px;
  bottom: 0px;
  color: white;
`;

export const HowItWorks = () => {
  const [show, setShow] = useState(false);
  const open = useCallback(() => setShow(true), []);
  const close = useCallback(() => setShow(false), []);

  return (
    <>
      <OpenLink icon="arrow-right" onClick={open}>
        how it works
      </OpenLink>
      {show && (
        <Modal closeModal={close} inverse title={<Brand />}>
          <Layout>
            <Steps>
              <>
                <Title>list your workplace</Title>
                <Desc>
                  free & <mark>anonymous</mark>
                </Desc>
              </>
              <>
                <Title>add a starter “mink”</Title>
                <Desc>
                  a team security question allowing only insiders to speak — <mark>anonymously</mark>
                </Desc>
              </>
              <>
                <Title>rate your workplace</Title>
                <Desc>
                  staying 100% <mark>anonymous</mark> without logins or emails
                </Desc>
              </>
              <>
                <Title>
                  share with your team
                  <PaperPlan icon="paper-plane" size={1.5} color="text" />
                </Title>
                <Desc>
                  yup, <mark>anonymously</mark>
                </Desc>
              </>
              <>
                <Title>let leadership hear you</Title>
                <Desc>
                  safely, <mark>anonymously</mark> and in-consensus — for the first time ever
                </Desc>
              </>
            </Steps>
            <Link href="/feedback" passHref>
              <NotifyLink icon="arrow-right" wide outline>
                get notified when live
              </NotifyLink>
            </Link>
          </Layout>
        </Modal>
      )}
    </>
  );
};
