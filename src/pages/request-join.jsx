import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { H1, Icon } from '../components/atoms';
import { Page } from '../components/organisms';
import { appColors, calcRem } from '../style';
import Button from "../components/atoms/Button/_index";

const PageStyling = styled(Page)`
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
    .btn-actions {
      grid-template-columns: minmax(auto, 350px) minmax(auto, 350px);
    }

    .btn-bottom {
      max-width: 350px;
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
    <PageStyling
      defaultHeader={false}
      title="In-House - List your House | Speak as a Team | Remain Untraceable"
    >
      <IconStyling>
        <Icon size={2} icon="x" onClick={() => router.back()} />
      </IconStyling>
      <H1 className="heading">the in-house beta trial</H1>
      <div className="btn-actions">
        <Link href="/list-workplace">
          <Button variant="light" text="need this at my job right now" />
        </Link>
				<Link href="/join-us">
					<Button variant="light" text="join / support the movement" />
				</Link>
      </div>
			<Link href={`/contact-us`}>
      	<Button outlined className="btn-bottom" variant="light" text="notify me when full live"/>
			</Link>
    </PageStyling>
  );
};

export default RequestJoin;
