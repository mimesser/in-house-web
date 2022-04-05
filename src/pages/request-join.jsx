import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { H1, Icon } from '../components/atoms';
import { Modal } from '../components/organisms';
import { Dialog, Overlay } from '../components/organisms/Modal/style';
import { appColors, calcRem, device } from '../style';
import Button from '../components/atoms/Button/_index';

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
    background-color: ${appColors.midnight};
    color: white;

    .heading {
      margin-top: 85px;
    }

    .btn-actions {
      display: grid;
      gap: 30px;
      margin: 88px 0;
    }

    @media all and (min-width: ${calcRem(500)}) {
      .btn-bottom {
        bottom: 30px;
        position: absolute;
        width: 95%;
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

const RequestJoin = () => {
  const router = useRouter();

  return (
    <StyledModal
      defaultHeader={false}  
      closeModal={() => !hasListed ? router.back() : router.push('/')}      
      canClose={false}
      inverse={true}
    >
      <IconStyling>
        <Icon size={2} icon="x" onClick={() => router.back()} />
      </IconStyling>
      <H1 className="heading">the in-house beta trial</H1>
      <div className="btn-actions">
        <Link href="/list-workplace">
          <Button variant="dark" text="need this at my job right now"
            style={{ backgroundColor: appColors.gray500 }} />
        </Link>
				<Link href="/join-us">
					<Button variant="dark" text="join / support the movement" 
            style={{ backgroundColor: appColors.gray500 }}/>
				</Link>      
        <Link href={`/contact-us`} >
          <Button outlined className="btn-bottom" variant="light" text="notify me when full live" style={{ marginTop: '90%'}}/>
        </Link>
      </div>
    </StyledModal>
  );
};

export default RequestJoin;
