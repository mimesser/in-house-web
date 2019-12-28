import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { Icon, ClearButton } from '../../atoms';
import { StepLayout } from './StepLayout';
import { fontWeight, palette, spacing, cover } from '../../../style';
import { selectLoading } from '../../../store/venues';
import { BackButton, NextButton } from '../../molecules';
import { Hint } from './Hint';

const Label = styled.div`
  color: ${palette.gray};
  text-transform: uppercase;
`;
const Value = styled.div`
  color: ${palette.darkGray};
  font-weight: ${fontWeight.bold};
  margin-bottom: ${spacing.xl};
  text-transform: lowercase;
`;

const ImgContainer = styled.div`
  position: relative;
  :after {
    content: '';
    display: block;
    margin-top: 75%;
  }
`;
const Img = styled.div`
  ${cover()};
  background-image: url(${({ url }) => url});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;
const EditButton = styled(ClearButton)`
  color: ${palette.black};
  margin-left: auto;
`;

const Row = styled(({ label, value, step, setStep, className }) => (
  <div className={className}>
    <div>
      <Label>{label}</Label>
      <EditButton onClick={() => setStep(step)}>edit</EditButton>
    </div>
    <Value>{value}</Value>
  </div>
))`
  > div:first-child {
    display: flex;
    align-items: center;
    margin-bottom: ${spacing.md};
  }
`;
const Check = styled(Icon).attrs(() => ({ icon: 'check', size: 8, color: 'lightGray' }))`
  margin: auto;
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

  const fullAddress = `${city}, ${address}, ${zip}`;

  return (
    <StepLayout
      head={loading ? 'submitted' : 'correct?'}
      main={
        loading ? (
          <>
            <Hint>thanks for submitting your house, you will be redirected in a moment.</Hint>
            <Check />
          </>
        ) : (
          <>
            <Row label="name" value={name} step={2} setStep={setStep} />
            <Row label="industry" value={industry.name} step={1} setStep={setStep} />
            <Row label="address" value={fullAddress} step={3} setStep={setStep} />
            <Row label="starter mink" value={question} step={4} setStep={setStep} />
            <Row label="mink secret answer" value={name} step={4} setStep={setStep} />
            <Row label="interior photo" step={5} setStep={setStep} />
            {!!image && (
              <>
                {validateSize(image) ? (
                  <ImgContainer>
                    <Img url={previewUrl} />
                  </ImgContainer>
                ) : (
                  <Value>image is too big</Value>
                )}
              </>
            )}
          </>
        )
      }
      commands={
        <>
          <BackButton disabled={loading} secondary onClick={() => setStep(5)} />
          <NextButton disabled={loading} onClick={confirm}>
            submit
          </NextButton>
        </>
      }
      step={6}
    />
  );
};
