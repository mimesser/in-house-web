import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';

import { Button as OldBtn, ClearButton } from '.';
import { Icon } from '../Icon';
import Button, {BackButton, CTAButton, IconButton} from './_index';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  > *,
  > div > * {
    margin-bottom: 1rem;
  }
`;

storiesOf('Button', module).add('Button', () => (
  <Container>
    <OldBtn>primary</OldBtn>
    <OldBtn disabled>disabled</OldBtn>
    <OldBtn wide>wide</OldBtn>
    <OldBtn outline>outline</OldBtn>
    <OldBtn outline disabled>
      outline disabled
    </OldBtn>
    <OldBtn dashed>dashed</OldBtn>
    <OldBtn loading>loading</OldBtn>
    <ClearButton>
      clear button
      <Icon icon="arrow-right" />
    </ClearButton>
    <ClearButton>
      <Icon icon="arrow-right" />
    </ClearButton>
    <OldBtn>
      with, icon <Icon icon="arrow-right" />
    </OldBtn>
    <OldBtn wide icon="arrow-right">
      wide, with icon as a prop
    </OldBtn>
  </Container>
));

storiesOf('Button', module).add('New Buttons', () => (
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
      <br/>
      <IconButton icon="x"/>
    </div>
    <div style={{ background: '#333333', padding: 10, width: '100%' }}>
      <h1 style={{ color: 'white' }}>Light Variant</h1>
      <Button text="light button" variant="light" onClick={() => console.log('clicked!')} />
      <br />
      <Button text="default" disabled variant="light" />
      <br />
      <Button noBorder outline text="light" variant="light" />
      <br/>
      <BackButton text="default" variant="light" />
      <br />
      <Button outline text="default" variant="light" loading />
      <br />
      <Button outline text="default" variant="light" />
      <br />
      <Button outline text="default" variant="light" disabled />
      <br/>
      <IconButton icon="x" variant="light"/>
      <br/>
      <CTAButton text="CTA Button" />
    </div>
  </Container>
));
