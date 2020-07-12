import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FormGroup } from '../../../atoms';
import { BackButton, NextButton } from '../../../molecules';
import { StepLayout } from './StepLayout';
import { font, palette, spacing, cover } from '../../../../style';

const PostImage = styled.div`
  ${cover()};
  background-image: url(${({ imageUrl }) => imageUrl});

  min-height: 128px;
  max-width: 228px;

  background-repeat: no-repeat;
  background-size: contain;
  background-position: left;
`;

const ImageContainer = styled.div`
  position: relative;
  :after {
    content: '';
    display: block;
    margin-top: ${spacing.md};
    height: 128px;
  }
`;

// max 10MB for now
const validateSize = (image) => image && image.size / 1000000 < 10;

export const Step2 = ({ title, message, image, edit, setStep }) => {
  const [previewUrl, setPreviewUrl] = useState(undefined);
  useEffect(() => {
    if (!image || !validateSize(image)) {
      return undefined;
    }
    const reader = new FileReader();
    reader.onload = (e) => setPreviewUrl(e.target.result);
    try {
      reader.readAsDataURL(image);
    } catch (e) {
      // ignore for now
    }

    return () => reader.abort();
  }, [image]);

  return (
    <StepLayout
      head="confirm"
      main={
        <>
          <FormGroup>
            <label>title</label>
            <p>{title}</p>
          </FormGroup>
          <FormGroup>
            <label>comment</label>
            <p>{message}</p>
          </FormGroup>
          <FormGroup>
            <label>photo</label>
            <ImageContainer>
              <PostImage imageUrl={previewUrl} alt="post image" />
            </ImageContainer>
          </FormGroup>
        </>
      }
      commands={
        <>
          <BackButton onClick={edit} />
          <NextButton onClick={() => setStep(3)} />
        </>
      }
      step={2}
    />
  );
};
