import React, { useEffect, useCallback, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled, { keyframes, css } from 'styled-components';
import Link from 'next/link';
import { debounce } from 'lodash';

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
import { palette, spacing, fontSize, font } from '../../../style';
import { Loader, Button, HelpTip, Patent, Card, Break, Icon, SlidingValue } from '../../atoms';
import { TabLayout, Main, ItemTitle, ItemTime, TabTitle } from './tabStyle';
import { formatDateTime, formatRating } from '../../../utils/format';
import VoteMink from './VoteMink';
import { NewMinkElected } from './NewMinkElected';
import PrivateShare from './PrivateShare';
import PrivateShareButton from './PrivateShareButton';
import { PokeButton, IconInput } from '../../molecules';
import { Votes } from './Votes';
import { VoteButton } from './openCardStyle';
import { Status, InputGroup } from './VoteMink/style';
import { FlagItem } from './FlagItem';
import { normalizeAnswer } from './normalizeAnswer';

const Dot = styled.span`
  &:before {
    content: '\\2022';
  }
  font-size: ${fontSize.sm};
  color: ${palette.primary};
  opacity: ${({ hide, topMink }) => (hide && !topMink ? 0 : 1)};
`;

const VoteWrap = styled.div`
  margin-top: ${spacing.xxl};
  display: flex;
  flex-direction: column;
  padding-right: ${spacing.lg};

  & ${Dot} {
    transition: opacity 0.2s ease-in;
    transition: opacity 0.25s ease-out;
  }
`;

const VoteRating = styled.span`
  visibility: ${({ hideRate, topMink }) => (hideRate && !topMink ? 'hidden' : 'visible')};
  font-size: ${fontSize.md};
  color: ${palette.primary};
  ${font.bold};
`;

const RatingWrap = styled.span`
  display: inline-flex;
  align-items: center;

  ${VoteRating} > div {
    & > div:nth-child(2) {
      order: 3;
    }
    & > span {
      align-self: flex-end;
    }
    & > div {
      padding: ${spacing.xxs};
    }
  }
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

const FlagItemWrap = styled.div``;

const transition = {
  in: '0.25s',
  out: '0.2s',
};

const defaultVoteAnimation = css`
  ${VoteWrap} > ${VoteButton} {
    svg {
      transition: transform ${transition.out} ease-in;

      circle {
        transition: ${transition.out} ease-in;
      }
      path:nth-child(2) {
        transition: ${transition.out} ease-in;
        opacity: 1;
      }
      path:nth-child(3) {
        transition: ${transition.out} ease-in;
      }
    }
  }

  ${VoteWrap} + ${Main} > ${InputGroup},
  ${VoteWrap} + ${Main} {
    transition: ${transition.out} ease-in;
    opacity: 1;
  }
`;

const activeVoteAnimation = (color, opacity) => css`
  ${VoteWrap} > ${VoteButton}:active {
    svg {
      transition: transform ${transition.in} ease-out;
      transform: scale(3);
      
      circle {
        transition: ${transition.in} ease-out;
        fill: ${color};
        opacity: ${opacity};
      }
      path:nth-child(2) {
        transition: ${transition.in} ease-out;
        opacity: 0;
      }
      path:nth-child(3) {
        transition: ${transition.in} ease-out;
        transform: translate(25%, 25%) scale(0.5);
        stroke: ${palette.primary};
        stroke-width: 5;
      }
    }
  }
`;

const hideInputOnVote = css`
  ${VoteWrap}:active + ${Main} ${InputGroup},
  ${VoteWrap}:active + ${Main} ${ShareWrap},
  ${VoteWrap}:active + ${Main} ${FlagItemWrap} {
    transition: ${transition.in} ease-out;
    opacity: 0;
  }
`;

const lowerOpacityOnVote = css`
  ${VoteWrap}:active + ${Main} {
    transition: ${transition.in} ease-out;
    opacity: 0.5;
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
  color: ${palette.mediumGray};
`;

const activeStyle = css`
  background-color: ${palette.lightGray};
`;

const MinkCard = styled(Card)`
  user-select: none;

  ${ShareWrap}, ${FlagItemWrap} {
    visibility: ${({ active, topMink }) => (active && !topMink ? 'hidden' : 'visible')};
  }
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

  ${({ active }) => active && activeStyle}
  ${defaultVoteAnimation}
  ${({ topMink }) => (topMink ? activeVoteAnimation(palette.lightGray, 1) : activeVoteAnimation(palette.gray, 0.7))}
  ${({ topMink }) => (topMink ? lowerOpacityOnVote : hideInputOnVote)}
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
    color: ${palette.lightGray};
    padding: 0;

    ${Patent} {
      color: ${palette.gray};
    }
  }
  ${Card} {
    background-color: ${palette.primary};
    border: none;
    padding: 0;
    margin-top: ${spacing.sm};

    * {
      color: ${palette.offWhite};
    }
    ${ItemTime} {
      color: ${palette.mediumGray};
    }
    ${PokeButton} {
      color: ${palette.white};
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
  const deselectMink = useCallback(() => setSelectedMink(undefined), [minkId]);
  const ref = useRef(null);
  const [vote, setVote] = useState(myVote);
  const upvoted = vote === 1;
  const downvoted = vote === -1;
  const active = selectedMink && selectedMink.id === minkId;
  const size = upvoted || downvoted ? 1.7 : 2.2;
  const [answer, setAnswer] = useState(myCorrectAnswer || '');
  const previouslyAnsweredCorrectly = !!myCorrectAnswer;
  const tryAnswer = useCallback((e) => {
    const value = normalizeAnswer(e.currentTarget.value);
    setAnswer(value);
    tryAnswerMink(houseId, minkId, value);
  }, []);
  const voteMink = useCallback(
    debounce((e, id, value) => {
      e.stopPropagation();
      setVote(value);
      if (value === 1) upvoteMink(id);
      if (value === -1) downvoteMink(id);
    }, 500),
    [],
  );

  useEffect(() => {
    if (isNew) {
      ref.current.scrollIntoView();
      setAddedMinkId(undefined);
    }
  }, [isNew, setAddedMinkId]);

  const card = (
    <MinkCard ref={ref} active={active} topMink={topMink}>
      <div>
        <VoteWrap>
          <VoteButton onClick={(e) => voteMink(e, minkId, 1)}>
            <Dot hide={!upvoted} />
            <Icon size={size} icon="arrow-up-circle" />
          </VoteButton>
          <VoteButton onClick={(e) => voteMink(e, minkId, -1)}>
            <Dot hide={!downvoted} />
            <Icon size={size} icon="arrow-down-circle" />
          </VoteButton>
        </VoteWrap>
        <Main onClick={active ? deselectMink : selectMink}>
          <TopWrap>
            <ItemTime dateTime={created}>{formatDateTime(created)}</ItemTime>
            <Push />
            <ShareWrap>
              <Votes count={voteCount} inverse={topMink} iconSize={1} />
              {myVote ? (
                <RatingWrap>
                  /
                  <VoteRating hideRate={active} topMink={topMink}>
                    <SlidingValue fontSize={fontSize.md} value={`${formatRating(voteRating) * 10}`} inverse={topMink}>
                      <Dot hide={active} topMink={topMink} />
                    </SlidingValue>
                  </VoteRating>
                </RatingWrap>
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
                onClick={(e) => e.stopPropagation()}
              />
              {active && renderStatusIcon(answerStatus)}
            </div>
            <AnswerStatus
              status={answerStatus}
              previouslyAnsweredCorrectly={previouslyAnsweredCorrectly}
              active={active}
            />
          </InputGroup>
          <FlagItemWrap>
            <FlagItem disabled={isActiveInsider} flagged={wasFlaggedByMe} toggleFlag={toggleMinkFlag} />
            <Push />
          </FlagItemWrap>
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
