import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { Button, H1, Loader } from '../../atoms';
import { StepLayout } from './StepLayout';
import { fontSize, palette, spacing } from '../../../style';
import { selectLoading } from '../../../store/venues';

const Label = styled.div`
  color: ${palette.textLight};
  margin-top: ${spacing.large};
`;
const Value = styled.div`
  font-size: ${fontSize.large};
  color: ${palette.textDark};
`;
const Uppercase = styled.div`
  text-transform: uppercase;
`;
export const Img = styled.div`
  width: 5.8rem;
  height: 5.8rem;
  margin-top: ${spacing.small};
  background-image: url(${({ url }) => url});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

// max 10MB for now
const validateSize = image => image && image.size / 1000000 < 10;

export const Step6 = ({
  setStep,
  listHouse,
  name,
  industry,
  industryDesc,
  country,
  city,
  address,
  zip,
  question,
  answer,
  image,
}) => {
  const loading = useSelector(selectLoading);
  const [previewUrl, setPreviewUrl] = useState(undefined);
  useEffect(() => {
    if (!image || !validateSize(image)) {
      return undefined;
    }
    const reader = new FileReader();
    reader.onload = e => setPreviewUrl(e.target.result);
    try {
      reader.readAsDataURL(image);
    } catch (e) {
      // ignore for now
    }

    return () => reader.abort();
  }, [image]);

  const confirm = () =>
    listHouse({
      name,
      industry,
      industryDesc,
      country,
      city,
      address,
      zip,
      question,
      answer,
      image: validateSize(image) ? image : undefined,
    });

  return (
    <StepLayout
      main={
        loading ? (
          <Loader big />
        ) : (
          <>
            <H1>confirm</H1>
            <Label>house info</Label>
            <Value>{name}</Value>
            <Uppercase>{industry.name}</Uppercase>
            <div>
              {address}, {zip}
            </div>
            <Label>starter MINK</Label>
            <Value>{question}</Value>
            <Label>secret answer</Label>
            <Value>{answer}</Value>
            {!!image && (
              <>
                <Label>interior photo</Label>
                {validateSize(image) ? <Img url={previewUrl} /> : <Value>image is too big</Value>}
              </>
            )}
          </>
        )
      }
      commands={
        <>
          <Button disabled={loading} secondary onClick={() => setStep(1)}>
            edit
          </Button>
          <Button disabled={loading} onClick={confirm}>
            yes, confirm
          </Button>
        </>
      }
      step={6}
    />
  );
};
