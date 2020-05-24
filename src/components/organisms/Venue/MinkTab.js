import React, { useEffect, useCallback, useRef } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import Link from 'next/link';

import { loadMinks, setSelectedMink, setAddedMinkId, selectSelectedMink } from '../../../store/venues';
import { palette, spacing } from '../../../style';
import { Loader, Button, HelpTip, Patent, Card, Break } from '../../atoms';
import { TabLayout, Main, ItemTitle, ItemTime, TabTitle } from './tabStyle';
import { formatDate } from '../../../utils/format';
import VoteMink from './VoteMink';
import NewMinkElected from './NewMinkElected';
import PrivateShare from './PrivateShare';
import PrivateShareButton from './PrivateShareButton';
import { Dial, PokeButton } from '../../molecules';
import { Votes } from './Votes';

const MinkCard = styled(Card)``;

const TopMinkContainer = styled.div`
  background-color: ${palette.primary};
  margin-top: 1px;
  padding: ${spacing.xxxl} ${spacing.xxl};
  ${TabTitle} {
    display: flex;
    align-items: center;
    color: ${palette.lightGray};
    padding: 0;

    ${Patent} {
      margin-left: 22px;
      color: ${palette.gray};
    }
  }
  ${Card} {
    background-color: ${palette.primary};
    border: none;
    padding: 0;
    margin-top: ${spacing.sm};

    ${Main}, ${ItemTitle}, ${Break}, ${Dial}, ${Votes} {
      color: ${palette.white};
    }
    ${PokeButton} {
      margin-right: -2rem;
      top: -0.5em;
      color: #fff;
    }
  }
`;

const RunnersTitle = styled(TabTitle)`
  padding-top: 0;
  border-bottom: 1px solid ${palette.lightGray};
`;

const Mink = ({
  mink: { id, created, question, voteCount, voteRating, myVote },
  isNew,
  setSelectedMink,
  setAddedMinkId,
  topMink,
}) => {
  const open = useCallback(() => setSelectedMink(id), [id]);
  const ref = useRef(null);
  useEffect(() => {
    if (isNew) {
      ref.current.scrollIntoView();
      setAddedMinkId(undefined);
    }
  }, [isNew, setAddedMinkId]);

  const card = (
    <MinkCard onClick={open} ref={ref}>
      <div>
        <Dial size={65} readonly value={myVote && voteRating} inverse={topMink} />
        <Main>
          <ItemTitle>{question}</ItemTitle>
          <Break />
          <div>
            <Votes count={voteCount} inverse={topMink} />
            <ItemTime dateTime={created}>{formatDate(created)}</ItemTime>
          </div>
        </Main>
      </div>
      <PrivateShareButton id={id} />
    </MinkCard>
  );
  return topMink ? (
    <HelpTip
      placement="top"
      tip="your team votes to select the TOP MINK, which all teammates must answer to get in your house"
    >
      {card}
    </HelpTip>
  ) : (
    card
  );
};

const renderMinks = (minks, setSelectedMink, addedMinkId, setAddedMinkId, selectedMink, houseId) =>
  !selectedMink && (
    <>
      {minks.length > 0 && (
        <>
          <TopMinkContainer>
            <TabTitle>
              Top MINK
              <Patent />
              {/* <PrivateShareButton id="2" /> */}
            </TabTitle>
            <Mink mink={minks[0]} setSelectedMink={setSelectedMink} topMink />
          </TopMinkContainer>
          <Link href={`/houses?id=${houseId}&tab=mink&new`} as={`/houses/${houseId}/mink/new`} passHref>
            <Button icon="arrow-right">new</Button>
          </Link>
        </>
      )}
      {minks.length > 1 && (
        <>
          <RunnersTitle>Runners up</RunnersTitle>
          {minks.slice(1).map((m) => (
            <Mink
              mink={m}
              key={m.id}
              setSelectedMink={setSelectedMink}
              isNew={m.id === addedMinkId}
              setAddedMinkId={setAddedMinkId}
            />
          ))}
        </>
      )}
    </>
  );

const findMink = (id, minks) => {
  const mink = minks.find((t) => t.id === id);
  if (!mink) {
    throw new Error(`Can't find mink ${id}`);
  }
  return mink;
};

const MinkTab = ({ venue: { id, minks, addedMinkId }, loadMinks, setSelectedMink, setAddedMinkId, selectedMink }) => {
  useEffect(() => {
    loadMinks();
  }, []);
  const renderSharePreview = useCallback(
    (id) => {
      const { created, question, voteCount, voteRating, myVote } = findMink(id, minks);

      return (
        <MinkCard>
          <div>
            <Dial size={65} readonly value={myVote && voteRating} />
            <Main>
              <ItemTitle>{question}</ItemTitle>
              <Break />
              <div>
                <Votes count={voteCount} />
                <ItemTime dateTime={created}>{formatDate(created)}</ItemTime>
              </div>
            </Main>
          </div>
        </MinkCard>
      );
    },
    [minks],
  );
  const getTitleForShare = useCallback((id) => findMink(id, minks).question, [minks]);

  console.log({ minks });
  return (
    <TabLayout>
      {minks ? renderMinks(minks, setSelectedMink, addedMinkId, setAddedMinkId, selectedMink, id) : <Loader big />}
      <VoteMink />
      <NewMinkElected />
      <PrivateShare type="mink" renderItem={renderSharePreview} getItemTitle={getTitleForShare} />
    </TabLayout>
  );
};

const mapsState = createStructuredSelector({
  selectedMink: selectSelectedMink,
});

const mapDispatch = {
  loadMinks,
  setSelectedMink,
  setAddedMinkId,
};

export default connect(mapsState, mapDispatch)(MinkTab);
