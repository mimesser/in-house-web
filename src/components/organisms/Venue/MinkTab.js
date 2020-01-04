import React, { useEffect, useCallback, useRef } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import Link from 'next/link';

import { loadMinks, setSelectedMink, setAddedMinkId, selectSelectedMink } from '../../../store/venues';
import { Loader, Button, HelpTip, Patent, Card } from '../../atoms';
import { TabLayout, Main, ItemTitle, ItemTime, TabTitle } from './tabStyle';
import { formatDate } from '../../../utils/format';
import VoteMink from './VoteMink';
import NewMinkElected from './NewMinkElected';
import PrivateShare from './PrivateShare';
import PrivateShareButton from './PrivateShareButton';
import { ScoreAndVoters } from './ScoreAndVoters';
import { SharePreviewCard } from './sharePreviewStyle';

const MinkCard = styled(Card)``;

const Mink = ({
  mink: { id, created, question, voteCount, voteRating, myVote },
  isNew,
  setSelectedMink,
  setAddedMinkId,
  withHelp,
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
      <ScoreAndVoters voteCount={voteCount} voteRating={myVote && voteRating} sliderSize={65} />
      <Main>
        <ItemTime dateTime={created}>{formatDate(created)}</ItemTime>
        <ItemTitle>{question}</ItemTitle>
      </Main>
      <PrivateShareButton id={id} />
    </MinkCard>
  );
  return withHelp ? (
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

const renderMinks = (minks, setSelectedMink, addedMinkId, setAddedMinkId, selectedMink) =>
  !selectedMink && (
    <>
      {minks.length > 0 && (
        <>
          <TabTitle>
            Top MINK<sup>©</sup>
            <Patent />
          </TabTitle>
          <Mink mink={minks[0]} setSelectedMink={setSelectedMink} withHelp />
        </>
      )}
      {minks.length > 1 && (
        <>
          <TabTitle>Runners up:</TabTitle>
          {minks.slice(1).map(m => (
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
  const mink = minks.find(t => t.id === id);
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
    id => {
      const { created, question, voteCount, voteRating, myVote } = findMink(id, minks);

      return (
        <SharePreviewCard>
          <ScoreAndVoters voteCount={voteCount} voteRating={myVote && voteRating} sliderSize={70} />
          <Main>
            <ItemTime>{formatDate(created)}</ItemTime>
            <ItemTitle>{question}</ItemTitle>
          </Main>
        </SharePreviewCard>
      );
    },
    [minks],
  );
  const getTitleForShare = useCallback(id => findMink(id, minks).question, [minks]);

  return (
    <TabLayout>
      {minks ? renderMinks(minks, setSelectedMink, addedMinkId, setAddedMinkId, selectedMink) : <Loader big />}
      <Link href={`/houses?id=${id}&tab=mink&new`} as={`/houses/${id}/mink/new`} passHref>
        <Button>new mink</Button>
      </Link>
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

export default connect(
  mapsState,
  mapDispatch,
)(MinkTab);
