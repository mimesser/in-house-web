import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { Footer } from '../components/organisms/Footer';
import { Page } from '../components/organisms';
import { appColors } from '../style';
import FlashMink from '../components/atoms/flashMink';

const Thanks = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push('/');
    }, 2000);
  }, [router]);

  return (
    <Page whiteHead noPadd style={{ backgroundColor: appColors.gray600 }}>
      <Styling>
        <div className="thanks">
          <FlashMink color={appColors.gray400} textColor={appColors.gray200} textSize={32} />
        </div>
        <Footer variant="transparent" />
      </Styling>
    </Page>
  );
};

const Styling = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  min-height: 100%;
  .thanks {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p {
      text-align: center;
    }
  }
`;

export default Thanks;
