import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import { Icon } from '../Icon';
import Button, { BackButton, CTAButton, IconButton, UploadButton } from './_index';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  > *,
  > div > * {
    margin-bottom: 1rem;
  }
`;

storiesOf('New Button', module)
  .add('dark variant', () => (
    <Container>
      <div>
        <h1>Dark Variant</h1>
        <Button text="default" noSuffix />
        <br />
        <Button text="default" noSuffix loading />
        <Button text="default text w/icon" wide />
        <Button text="default text w/icon" wide loading />
        <Button outlined text="default" noSuffix />
        <Button outlined text="default text w/icon" wide />
        <BackButton noBorder text="default" prefix={<Icon icon="arrow-left" />} noSuffix />
        <br />
        <Button noBorder text="default text w/icon" />
        <br />
        <IconButton icon="x" />
      </div>
    </Container>
  ))
  .add('light variant', () => (
    <div style={{ background: '#333333', padding: 10, width: '100%' }}>
      <h1 style={{ color: 'white' }}>Light Variant</h1>
      <Button text="light button" variant="light" onClick={() => console.log('clicked!')} />
      <br />
      <Button text="default" disabled variant="light" />
      <br />
      <Button noBorder outline text="light" variant="light" />
      <br />
      <BackButton text="default" variant="light" />
      <br />
      <Button outline text="default" variant="light" loading />
      <br />
      <Button outline text="default" variant="light" />
      <br />
      <Button outline text="default" variant="light" disabled />
      <br />
      <IconButton icon="x" variant="light" />
      <br />
      <CTAButton text="CTA Button" />
    </div>
  ))
  .add('upload button', () => <UploadButton />);
