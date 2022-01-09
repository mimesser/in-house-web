import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import Text from './_index';

const Styling = styled.div`
  font-family: 'Helvetica Neue', serif;

  .dark {
    background: #333333;
  }
`;

storiesOf('Text', module).add('New Text', () => (
  <Styling>
    <Text.Heading text="Heading 1" />
    <Text.Heading level={2} text="Heading 2" />
    <Text.Heading level={3} text="Heading 3" />
    <Text.Heading level={4} text="Heading 4" />
    <Text.Heading level={5} text="Heading 5" />
    <Text.Heading level={6} text="Heading 6" />
    <br />
    <Text text="Paragraph" />
    <br />
    <Text.Heading family="helvetica" text="helvetica neue 96px light" size={96} weight="light" />
    <Text text="helvetica neue 96px reg" size={96} weight="reg" />
    <Text.Heading text="helvetica neue 96px med" size={96} weight="med" />
    <Text size={96} weight="bold">
      helvetica neue 96px bold
    </Text>
    <br />
    <Text text="Paragraph" size={10} />
    <Text text="Paragraph" size={12} />
    <Text text="Paragraph" size={14} />
    <Text text="Paragraph" size={16} />
    <Text text="Paragraph" size={18} />
    <Text text="Paragraph" size={20} />
    <Text text="Paragraph" size={24} />
    <Text text="Paragraph" size={32} />
    <Text text="Paragraph" size={36} />
    <Text text="Paragraph" size={72} />
    <br />
    <Text.Heading family="roboto" text="roboto 80px light" size={80} weight="light" />
    <div className="dark">
      <Text.Heading
        variant="light"
        family="roboto"
        text="roboto 80px light"
        size={80}
        weight="light"
      />
      <Text.Heading
        variant="light"
        family="roboto"
        text="roboto 80px light"
        size={80}
        weight="reg"
      />
      <Text.Heading
        variant="light"
        family="roboto"
        text="roboto 80px light"
        size={80}
        weight="med"
      />
      <Text.Heading
        variant="light"
        family="roboto"
        text="roboto 80px light"
        size={80}
        weight="bold"
      />
      <br />
      <Text.Heading
        variant="light"
        family="roboto"
        text="roboto 80px light"
        size={22}
        weight="bold"
      />
      <Text.Heading
        variant="light"
        family="roboto"
        text="roboto 80px light"
        size={38}
        weight="bold"
      />
      <Text.Heading
        variant="light"
        family="roboto"
        text="roboto 80px light"
        size={40}
        weight="bold"
      />
    </div>
  </Styling>
));
