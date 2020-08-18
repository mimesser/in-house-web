import React, { useEffect, useCallback, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import Link from 'next/link';

import {
  loadMinks,
  setSelectedMink,
  setAddedMinkId,
  selectSelectedMink,
  upvoteMink,
  downvoteMink,
  tryAnswerMink,
  selectAnswerMinkStatus,
  selectIsActiveInsider,
  toggleMinkFlag,
} from '../../../store/venues';
import { palette, spacing, fontSize, font, theme } from '../../../style';
import { Loader, Button, HelpTip, Patent, Card, Break, Icon } from '../../atoms';
import { TabLayout, Main, ItemTitle, ItemTime, TabTitle } from './tabStyle';
import { formatDateTime, formatRating } from '../../../utils/format';
import VoteMink from './VoteMink';
import { NewMinkElected } from './NewMinkElected';
import PrivateShare from './PrivateShare';
import PrivateShareButton from './PrivateShareButton';
import { Dial, PokeButton, IconInput } from '../../molecules';
import { Votes } from './Votes';
import { VoteButton } from './openCardStyle';
import { Status, InputGroup } from './VoteMink/style';
import { FlagItem } from './FlagItem';
import { normalizeAnswer } from './normalizeAnswer';

const active = {
  opacity: 1,
  backgroundColor: theme.colors.lightGray,
};

const MinkCard = styled(Card)`
  ${Votes} > span:last-of-type {
    position: static;
  }
  ${ItemTime} {
    align-self: center;
    color: ${palette.mediumGray};
  }
  ${Icon} {
    padding-left: ${spacing.xs};
  }
  ${PokeButton} {
    color: ${palette.darkGray};
    // to be removed if implemented
    // in all tabs
    position: static !important;
  }
  ${ItemTitle} {
    padding-bottom: ${spacing.md};
  }
  ${InputGroup} {
    padding-bottom: ${spacing.xxl};
  }
  transition: all 0.2s ease-in-out;
  opacity: 0.8;
  ${(props) => props.active && active}
`;

const VoteWrap = styled.div`
  margin-top: ${spacing.xxl};
  display: flex;
  flex-direction: column;
  // align-self: center;
  padding-right: ${spacing.lg};
`;

const VoteRating = styled.span`
  font-size: ${fontSize.md};
  color: ${palette.primary};
  ${font.bold};
`;

const Dot = styled.span`
  &:before {
    content: '\\2022';
  }
  visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
  font-size: ${fontSize.sm};
`;

const ShareWrap = styled.div`
  display: inline-flex;
  align-items: center;
  color: ${palette.darkGray};

  & > *:not(:first-child) {
    margin-left: ${spacing.xs};
  }
  & > *:last-child {
    margin-left: ${spacing.xl};
  }

  ${VoteRating} {
    margin-left: ${spacing.md};
  }
`;

const InsiderText = styled.span`
  font-size: ${fontSize.xs};
`;

const Push = styled.span`
  margin-left: auto;
`;

const TopWrap = styled.div`
  display: flex;
  align-items: flex-end;
`;

const Subtitle = styled.div`
  padding: ${spacing.sm} 0 ${spacing.xl};
  font-size: ${fontSize.xs};
`;

const TopMinkContainer = styled.div`
  background-color: ${palette.primary};
  margin-top: 1px;
  padding: ${spacing.xl};
  hr {
    margin: 0 -${spacing.xl};
  }
  ${TabTitle} {
    display: flex;
    align-items: center;
    color: ${palette.white};
    padding: 0;

    ${Patent} {
      color: ${palette.gray};
    }
  }
  ${Subtitle} {
    color: ${palette.gray};
  }
  ${Card} {
    background-color: ${palette.primary};
    border: none;
    padding: 0;
    margin-top: ${spacing.sm};

    * {
      color: ${palette.lightGray};
    }
    ${ItemTime} {
      color: ${palette.gray};
    }
    ${PokeButton} {
      color: #fff;
    }
  }
`;

const RunnersTitle = styled(TabTitle)`
  padding-top: 0;
  border-bottom: 1px solid ${palette.lightGray};
`;

const AnswerStatus = ({ status, previouslyAnsweredCorrectly, active }) => {
  if (status && active) {
    const { loading, isAnswerCorrect } = status;
    if (loading) return null;

    return <Status>{isAnswerCorrect ? 'correct answer!' : 'wrong answer'}</Status>;
  }

  if (previouslyAnsweredCorrectly) return <Status>previously answered</Status>;

  return null;
};

const renderInputIcon = (status, previouslyAnsweredCorrectly, active) => {
  if (status && active) {
    const { loading, isAnswerCorrect } = status;
    if (loading) return null;

    return <Icon icon={isAnswerCorrect ? 'winky-circle' : 'winky-circle-sad'} color="primaryLight" size={1.5} />;
  }

  if (previouslyAnsweredCorrectly) return <Icon icon="winky-circle" color="primaryLight" size={1.5} />;

  return null;
};

const renderStatusIcon = (answerStatus) => {
  if (!answerStatus) return null;

  const { loading, isAnswerCorrect } = answerStatus;
  if (loading) return <Loader />;

  return <Icon size={1.5} icon={isAnswerCorrect ? 'check' : 'close'} />;
};

const Mink = ({
  houseId,
  mink: { id: minkId, created, question, voteCount, voteRating, myVote, myCorrectAnswer, wasFlaggedByMe },
  isNew,
  setSelectedMink,
  selectedMink,
  setAddedMinkId,
  topMink,
  upvoteMink,
  downvoteMink,
  tryAnswerMink,
  answerStatus,
  isActiveInsider,
  toggleMinkFlag,
}) => {
  const selectMink = useCallback(() => setSelectedMink(minkId), [minkId]);
  const ref = useRef(null);
  const upvoted = myVote === 1;
  const downvoted = myVote === -1;
  const active = selectedMink && selectedMink.id === minkId;
  const size = upvoted || downvoted ? 1.7 : 2.2;
  const [answer, setAnswer] = useState(myCorrectAnswer || '');
  const previouslyAnsweredCorrectly = !!myCorrectAnswer;
  const tryAnswer = useCallback((e) => {
    const value = normalizeAnswer(e.currentTarget.value);
    setAnswer(value);
    tryAnswerMink(houseId, minkId, value);
  }, []);

  useEffect(() => {
    if (isNew) {
      ref.current.scrollIntoView();
      setAddedMinkId(undefined);
    }
  }, [isNew, setAddedMinkId]);

  const card = (
    <MinkCard onClick={!active ? selectMink : undefined} ref={ref} active={active}>
      <div>
        <VoteWrap>
          <VoteButton onClick={() => upvoteMink()} disabled={!active}>
            <Dot show={upvoted} />
            <Icon size={size} icon="arrow-up-circle" />
          </VoteButton>
          <VoteButton onClick={() => downvoteMink()} disabled={!active}>
            <Dot show={downvoted} />
            <Icon size={size} icon="arrow-down-circle" />
          </VoteButton>
        </VoteWrap>
        <Main>
          <TopWrap>
            <ItemTime dateTime={created}>{formatDateTime(created)}</ItemTime>
            <Push />
            <ShareWrap>
              <Votes count={voteCount} inverse={topMink} iconSize={1} />
              {myVote ? (
                <span>
                  /<VoteRating>{formatRating(voteRating)}</VoteRating>
                </span>
              ) : (
                <InsiderText>Insider(s)</InsiderText>
              )}
              <PrivateShareButton id={minkId} type="mink" />
            </ShareWrap>
          </TopWrap>
          <ItemTitle>{question}</ItemTitle>
          <InputGroup>
            <div>
              <IconInput
                placeholder="one word / no spaces"
                autocomplete="off"
                spellcheck="false"
                value={answer}
                onChange={tryAnswer}
                readOnly={previouslyAnsweredCorrectly}
                icon={renderInputIcon(answerStatus, previouslyAnsweredCorrectly, active)}
                onFocus={selectMink}
              />
              {active && renderStatusIcon(answerStatus)}
            </div>
            <AnswerStatus
              status={answerStatus}
              previouslyAnsweredCorrectly={previouslyAnsweredCorrectly}
              active={active}
            />
          </InputGroup>
          <div>
            <FlagItem disabled={isActiveInsider || !active} flagged={wasFlaggedByMe} toggleFlag={toggleMinkFlag} />
            <Push />
          </div>
        </Main>
      </div>
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

const renderMinks = (
  minks,
  setSelectedMink,
  addedMinkId,
  setAddedMinkId,
  selectedMink,
  houseId,
  upvoteMink,
  downvoteMink,
  tryAnswerMink,
  answerStatus,
  toggleMinkFlag,
) => (
  <>
    {minks.length > 0 && (
      <>
        <TopMinkContainer>
          <TabTitle>
            Top MINK
            <Push />
            <Patent />
            {/* <PrivateShareButton id="2" /> */}
          </TabTitle>
          <Subtitle>the top mink at any time verifies insiders</Subtitle>
          <hr />
          <Mink
            houseId={houseId}
            mink={minks[0]}
            setSelectedMink={setSelectedMink}
            selectedMink={selectedMink}
            upvoteMink={upvoteMink}
            downvoteMink={downvoteMink}
            tryAnswerMink={tryAnswerMink}
            answerStatus={answerStatus}
            toggleMinkFlag={toggleMinkFlag}
            topMink
          />
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
            houseId={houseId}
            mink={m}
            key={m.id}
            setSelectedMink={setSelectedMink}
            selectedMink={selectedMink}
            isNew={m.id === addedMinkId}
            setAddedMinkId={setAddedMinkId}
            upvoteMink={upvoteMink}
            downvoteMink={downvoteMink}
            tryAnswerMink={tryAnswerMink}
            answerStatus={answerStatus}
            toggleMinkFlag={toggleMinkFlag}
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

const MinkTab = ({
  venue: { id, minks, addedMinkId },
  loadMinks,
  setSelectedMink,
  setAddedMinkId,
  selectedMink,
  upvoteMink,
  downvoteMink,
  tryAnswerMink,
  answerStatus,
  toggleMinkFlag,
}) => {
  useEffect(() => {
    loadMinks();
  }, []);
  const renderSharePreview = useCallback(
    (id) => {
      const { created, question, voteCount, voteRating, myVote } = findMink(id, minks);

      return (
        <MinkCard>
          <div>
            <Main>
              <ItemTitle>{question}</ItemTitle>
              <Break />
              <div>
                <Votes count={voteCount} />
                <ItemTime dateTime={created}>{formatDateTime(created)}</ItemTime>
              </div>
            </Main>
          </div>
        </MinkCard>
      );
    },
    [minks],
  );
  const getTitleForShare = useCallback((id) => findMink(id, minks).question, [minks]);

  return (
    <TabLayout>
      {minks ? (
        renderMinks(
          minks,
          setSelectedMink,
          addedMinkId,
          setAddedMinkId,
          selectedMink,
          id,
          upvoteMink,
          downvoteMink,
          tryAnswerMink,
          answerStatus,
          toggleMinkFlag,
        )
      ) : (
        <Loader big />
      )}
      {/* uncomment this for old implementation */}
      {/* <VoteMink /> */}
      <NewMinkElected />
      <PrivateShare type="mink" renderItem={renderSharePreview} getItemTitle={getTitleForShare} />
    </TabLayout>
  );
};

const mapsState = createStructuredSelector({
  selectedMink: selectSelectedMink,
  answerStatus: selectAnswerMinkStatus,
  isActiveInsider: selectIsActiveInsider,
});

const mapDispatch = {
  loadMinks,
  setSelectedMink,
  setAddedMinkId,
  upvoteMink,
  downvoteMink,
  tryAnswerMink,
  toggleMinkFlag,
};

export default connect(mapsState, mapDispatch)(MinkTab);
