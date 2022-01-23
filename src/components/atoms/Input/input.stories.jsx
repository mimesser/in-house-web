import React, { useState } from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import Input from './_index';

const Container = styled.div`
  display: grid;
  gap: 20px;

  > div > div {
    display: grid;
    gap: 20px;
  }
`;

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

storiesOf('New Input', module)
  .add('Input', () => {
    const [values, setValues] = useState({});

    const handleChange = (e) => setValues({ ...values, [e.target.name]: e.target.value });

    console.log(values);

    return (
      <Container>
        <Input name="default" onChange={handleChange} value={values?.default} />
        <Input name="search" type="search" placeholder="search here..." onChange={handleChange} value={values?.search} />
        <Input.Select
          name="select-dark"
          placeholder="how did you hear about us?"
          options={options}
          onChange={handleChange}
          value={values?.select}
        />
        <Input
          name="input"
          placeholder="placeholder"
          onChange={handleChange}
          value={values?.input}
          helpText="something is up"
          maxChars={{ strict: true, maxChars: 20 }}
        />
        <Input placeholder="Clearable" name="clearable" clearable onChange={handleChange} />
        <Input
          name="disabled_input"
          disabled
          onChange={handleChange}
          value={values?.disabled_input}
        />
        <Input
          name="input_with_strike"
          strike
          onChange={handleChange}
          value={values?.input_with_strike}
        />
        <Input name="input_with_error" onChange={handleChange} value="Yeah" />
        <Input
          name="input_with_error"
          error
          onChange={handleChange}
          value={values?.input_with_error}
        />
        <div style={{ background: '#333333', padding: 10 }}>
          <Input variant="light"  name="name_1"/>
          <Input.Select
            name="select1"
            options={options}
            onChange={handleChange}
            value={values?.select}
            variant="light"
            error
            helpText="hello"
          />
          <Input.Select
            name="select-dark"
            variant="light"
            options={options}
            onChange={handleChange}
            value={values?.select}
            disabled
          />
          <Input variant="light" placeholder="placeholder"  name="name_2"/>
          <Input variant="light" value="some value"  name="name_3"/>
          <Input variant="light" value="disabled" disabled  name="name_4"/>
          <Input variant="light" value="strike wrong" strike  name="name_5"/>
          <Input variant="light" value="error" error  name="name_6"/>
        </div>
      </Container>
    );
  })
  .add('Textarea', () => (
    <Container>
      <Input.TextArea />
      <Input.TextArea placeholder="placeholder" clearable />
      <Input.TextArea value="some value" maxChars={50} />
      <Input.TextArea value="disabled" disabled />
      <Input.TextArea value="strike wrong" />
      <Input.TextArea value="error" error />
      <div style={{ background: '#333333', padding: 10 }}>
        <Input.TextArea variant="light" clearable />
        <Input.TextArea variant="light" placeholder="placeholder" />
        <Input.TextArea variant="light" value="some value" />
        <Input.TextArea variant="light" value="disabled" disabled />
        <Input.TextArea variant="light" value="strike wrong" strike />
        <Input.TextArea variant="light" value="error" error />
      </div>
    </Container>
  ));
