import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { WinkConfirmation } from '../components/molecules';
import { Modal, Page } from '../components/organisms';
import { Dialog, Overlay } from '../components/organisms/Modal/style';
import { appColors, calcRem, device } from '../style';
import { Icon, Input, Textarea } from '../components/atoms';
import { postFeedback } from '../store/feedback';
import { isEmailValid } from '../utils';
import Button from '../components/atoms/Button/_index';
import Text from '../components/atoms/text/_index';

const StyledModal = styled(Modal)`
  ${Overlay} {    
    background-image:url('https://in-house.azureedge.net/webstatic/beta_trail/request-join-1920.jpg');
    @media ${device.tab} {		
      background-image:url('https://in-house.azureedge.net/webstatic/beta_trail/request-join-768.jpg');
    }
    @media ${device.web} {
      background-image:url('https://in-house.azureedge.net/webstatic/beta_trail/request-join-1280.jpg');
    }
    @media ${device.laptop} {
      background-image:url('https://in-house.azureedge.net/webstatic/beta_trail/request-join-1920.jpg');
    }
    @media ${device.desktop} {
      background-image:url('https://in-house.azureedge.net/webstatic/beta_trail/request-join-1920.jpg');
    }
  }
  ${Dialog} {
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
      router.push('/').then(() => setHasListed(false));
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
      <StyledModal
        defaultHeader={false}  
        closeModal={() => !hasListed ? router.back() : router.push('/')}      
        canClose={false}
        inverse={true}
      >
        <IconStyling>
          <Icon size={2} icon="x" onClick={() => !hasListed ? router.back() : router.push('/')} />
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
            <div>
              {/* <WinkConfirmation size ={20} style={{background: 'none'}} /> */}
            </div>
          )}
          {!hasListed? 
          
          <Button
            outlined
            variant="light"
            className="btn-bottom"
            onClick={handleSubmit}
            loading={feedbackState?.loading}
            disabled={!isEmailValid(formState.email) || !formState.description}
            text={'send my request'}
          /> :
          
          <Button
            className="btn-bottom"
            onClick={handleSubmit}
            text={'got it'}
            style={{ backgroundColor: appColors.gray500 }}
          />
          }
        </div>
      </StyledModal>
  );
};

export default Listworkplace;
