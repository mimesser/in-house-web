import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Page } from '../components/organisms';
import { appColors, calcRem } from '../style';
import { Icon, Input, Textarea } from '../components/atoms';
import { postFeedback } from '../store/feedback';
import { isEmailValid } from '../utils';
import Button from '../components/atoms/Button/_index';
import Text from '../components/atoms/text/_index';

const PageStyling = styled(Page)`
  padding: 12px;
  background-color: ${appColors.gray600};
  color: white;
  font-family: 'Helvetica', sans-serif;

  p {
    margin: 0;
  }

  .heading {
    margin-top: ${calcRem('85px')};
    margin-bottom: ${calcRem('16px')};
  }

  .btn-actions {
    margin: 88px 0;
    button:first-child {
      margin-bottom: 30px;
    }
  }

  .list-workplace {
    &__text-body {
      margin-top: ${calcRem('16px')};
      margin-bottom: ${calcRem('30px')};

      > div {
        display: none;
      }
    }

    &__text-area {
      //background: none;
      min-height: 113px;
    }

    &__input {
      background: none;
    }

    &__form {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;

      > button {
        margin-top: ${calcRem(20)};
        margin-bottom: ${calcRem(40)};
      }
    }
  }
`;

const IconStyling = styled.div`
  display: flex;
  justify-content: flex-end;

  > span svg {
    padding: 5px;
  }
`;

const Listworkplace = () => {
  const router = useRouter();
  const [formState, setFormState] = useState({ description: '', email: '' });
  const [hasListed, setHasListed] = useState(false);
  const dispatch = useDispatch();
  const feedbackState = useSelector((state) => state.feedback);

  const handleInputChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value.substring(0, 500) });
  };

  const handleSubmit = () => {
    if (hasListed) {
      router.push('/request-join').then(() => setHasListed(false));
    } else {
      dispatch(
        postFeedback({
          email: formState.email,
          subject: 'list your workplace',
          message: formState.description,
          callback: () => setHasListed(true),
        }),
      );
    }
  };

  return (
    <PageStyling
      defaultHeader={false}
      title="In-House - List your House | Speak as a Team | Remain Untraceable"
    >
      <IconStyling>
        <Icon size={2} icon="x" onClick={() => router.back()} />
      </IconStyling>
      <Text.Heading
        weight="bold"
        color="white"
        size={32}
        variant="light"
        level={1}
        className="heading"
      >
        {!hasListed ? 'list my workplace' : 'thank you'}
      </Text.Heading>
      <Text variant="light" color="gray300" size={14}>
        {!hasListed
          ? `we are only able to list a small number of organizations
            during our beta trial so please send us your confidential reason
            for why you need this and we’ll prioritize those most in need.`
          : `we will reach out to you as soon as we can to confirm
            whether we will be able to list your workplace during our beta trial`}
      </Text>
      <div className="list-workplace__form">
        {!hasListed ? (
          <form>
            <Textarea
              variant="light"
              className="list-workplace__text-body list-workplace__text-area"
              name="description"
              value={formState.description}
              onChange={handleInputChange}
              max={500}
              placeholder="describe why you need this right now"
              rows={4}
            />
            <Input
              variant="light"
              name="email"
              className="list-workplace__input"
              value={formState.email}
              onChange={handleInputChange}
              placeholder="email (100% confidential)"
              type="email"
            />
          </form>
        ) : (
          <div />
        )}
        <Button
          outlined
          variant="light"
          className="btn-bottom"
          onClick={handleSubmit}
          loading={feedbackState?.loading}
          disabled={!hasListed && (!isEmailValid(formState.email) || !formState.description)}
          text={!hasListed ? 'send my request' : 'got it'}
        />
      </div>
    </PageStyling>
  );
};

export default Listworkplace;
