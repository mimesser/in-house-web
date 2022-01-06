import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Page } from '../components/organisms';
import { appColors, calcRem } from '../style';
import { Button, H1, Icon, Input } from '../components/atoms';
import { CounterInput } from '../components/molecules';
import { postFeedback } from '../store/feedback';
import { isEmailValid } from '../utils';

const PageStyling = styled(Page)`
  padding: 12px;
  background-color: ${appColors.midnight};
  color: white;

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

  .list-workspace {
    &__text-body {
      margin-top: ${calcRem('18px')};
      margin-bottom: ${calcRem('30px')};

      > div {
        display: none;
      }
    }

    &__text-area {
      padding: 12px 8px;
      background: none;
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
        margin-bottom: ${calcRem(36 - 12)};
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

const ListWorkspace = () => {
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
          subject: 'list your workspace',
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
        <Icon size={2} icon="x" onClick={() => router.push("/")} />
      </IconStyling>
      <H1 className="heading">{!hasListed ? 'list my workplace' : 'thank you'}</H1>
      <p>
        {!hasListed
          ? `we are only able to list a small number of organizations
            during our beta trial so please send us your confidential reason
            for why you need this and we’ll prioritize those most in need.`
          : `we will reach out to you as soon as we can to confirm
            whether we will be able to list your workplace during our beta trial`}
      </p>
      <div className="list-workspace__form">
        {!hasListed ? (
          <form>
            <CounterInput
              parentClassName="list-workspace__text-body"
              className="list-workspace__text-area"
              multiline
              name="description"
              value={formState.description}
              onChangeEvent={handleInputChange}
              max={500}
              placeholder="describe why you need this right now"
              rows={4}
            />
            <Input
              name="email"
              className="list-workspace__input"
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
          type="button"
          outline
          className="btn-bottom"
          icon="arrow-right"
          onClick={handleSubmit}
          wide
          loading={feedbackState?.loading}
          disabled={!hasListed && (!isEmailValid(formState.email) || !formState.description)}
        >
          {!hasListed ? 'send my request' : 'got it'}
        </Button>
      </div>
    </PageStyling>
  );
};

export default ListWorkspace;
