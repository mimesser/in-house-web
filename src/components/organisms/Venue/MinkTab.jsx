import React, { useEffect, useCallback, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled, { css } from 'styled-components';
import Link from 'next/link';
import { useDebounce, useFreshRef } from 'rooks';
import {
  loadMinks,
  setSelectedMink,
  setVenueMinks,
  setAddedMinkId,
  selectSelectedMink,
  selectVoteMinkConfirmation,
  upvoteMink,
  downvoteMink,
  tryAnswerMink,
  selectAnswerMinkStatus,
  selectIsActiveInsider,
  selectPostFlagError,
  selectSelectedVenueTopMinkId,
  toggleMinkFlag,
} from '../../../store/venues';
import { palette, spacing, fontSize, font } from '../../../style';
import { Loader, Button, HelpTip, Patent, Card, Icon, SlidingValue, Input } from '../../atoms';
import { TabLayout, Main, ItemTitle, ItemTime, TabTitle } from './tabStyle';
import {
  formatDateTime,
  formatMovementURL,
  formatRating,
  pluralFormatVote,
} from '../../../utils/format';
import NewMinkElected from './NewMinkElected';
import PrivateShare from './PrivateShare';
import PrivateShareButton from './PrivateShareButton';
import { PokeButton, IconInput } from '../../molecules';
import { IconBadge } from './IconBadge';
import { VoteButton } from './openCardStyle';
import { Status, InputGroup } from './VoteMink/style';
import { FlagItem } from './FlagItem';
import { normalizeAnswer } from './normalizeAnswer';
import { RateConfirmation } from './RateConfirmation';

import { Modal } from '../Modal';

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
  color: ${palette.darkGray};
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
  color: ${palette.gray};

  & > *:not(:first-child) {
    margin-left: ${spacing.xs};
  }
  & > *:last-child {
    margin-left: ${spacing.lg};
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
  font-size: ${fontSize.sm};
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
  cursor: default;

  ${ShareWrap}, ${FlagItemWrap} {
    visibility: ${({ active, topMink }) => (active && !topMink ? 'hidden' : 'visible')};
  }
  ${IconBadge} > span:last-of-type {
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
    color: ${palette.gray};
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

  ${({ active, isShare }) => !isShare && active && activeStyle}
  ${defaultVoteAnimation}
  ${({ topMink }) =>
    topMink ? activeVoteAnimation(palette.lightGray, 1) : activeVoteAnimation(palette.gray, 0.7)}
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
    ${Input} {
      color: ${palette.primary};
    }
  }
`;

const RunnersTitle = styled(TabTitle)`
  border-bottom: 1px solid ${palette.lightGray};
`;

const SharePreviewWrap = styled.div`
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  padding: ${spacing.md};
`;

const TopMinkSharePreviewWrap = styled.div`
  ${TopMinkContainer} {
    padding: ${spacing.md};
  }
`;

const NewMinkButton = styled(Button)`
  margin: 0 !important;
  width: 100%;
  border: solid 2px white;
  position: sticky;
  z-index: 100;
  top: 46px;
`;

const AnswerStatus = ({ status, previouslyAnsweredCorrectly, active, isShare }) => {
  if (isShare) return null;

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

    return (
      <Icon
        icon={isAnswerCorrect ? 'winky-circle' : 'winky-circle-sad'}
        color="primaryLight"
        size={1.5}
      />
    );
  }

  if (previouslyAnsweredCorrectly)
    return <Icon icon="winky-circle" color="primaryLight" size={1.5} />;

  return null;
};

const StatusIcon = ({ answerStatus, answer, whiteLoader, clickEvent }) => {
  if (!answerStatus && !answer) return null;

  if (!answerStatus && answer)
    return (
      <span onClick={clickEvent}>
        <Icon size={1.5} icon="close" />
      </span>
    );

  const { loading, isAnswerCorrect } = answerStatus;
  if (loading) {
    if (whiteLoader) return <Loader white />;
    return <Loader />;
  }

  return (
    <span onClick={clickEvent}>
      <Icon size={1.5} icon={isAnswerCorrect ? 'check' : 'close'} />
    </span>
  );
};

const Mink = ({
  houseId,
  mink: {
    id: minkId,
    created,
    question,
    voteCount,
    voteRating,
    myVote,
    myCorrectAnswer,
    wasFlaggedByMe,
  },
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
  flagErrorMessage,
  isShare,
  update,
}) => {
  const size = 2.2;
  const upvoted = myVote === 1;
  const downvoted = myVote === -1;
  const active = selectedMink?.id === minkId;
  const [answer, setAnswer] = useState(myCorrectAnswer || '');
  const [previouslyAnsweredCorrectly, setPreviouslyAnsweredCorrectly] = useState(!!myCorrectAnswer);
  const selectMink = useCallback(() => setSelectedMink(minkId), [setSelectedMink, minkId]);
  const deselectMink = useCallback(() => setSelectedMink(undefined), [setSelectedMink]);
  const toggleFlag = () => {
    selectMink();
    toggleMinkFlag({ wasVotedByMe: +myVote === 1 || +myVote === -1 });
  };
  const ref = useRef(null);
  const answerRef = useRef(null);

  const tryAnswer = useCallback(
    (e) => {
      const value = normalizeAnswer(e?.currentTarget?.value);
      setAnswer(value);
      tryAnswerMink(houseId, minkId, value);
    },
    [setAnswer, tryAnswerMink, minkId],
  );

  const debouncedUpdateMinks = useDebounce(update.current, 3000, { trailing: true });

  const voteMink = useCallback(
    (vote, skipConfirmation = false) => {
      if (+vote === 1) upvoteMink(minkId);
      else if (+vote === -1) downvoteMink(minkId, !!skipConfirmation);

      debouncedUpdateMinks();
    },
    [minkId, upvoteMink, downvoteMink, debouncedUpdateMinks],
  );

  const clearAnswer = useCallback((e) => {
    e.stopPropagation();
    setAnswer('');
    answerRef.current.focus();
  }, []);

  useEffect(() => {
    if (isNew) {
      ref.current.scrollIntoView();
      setAddedMinkId(undefined);
    }
  }, [isNew, setAddedMinkId]);

  useEffect(() => {
    setAnswer(myCorrectAnswer || '');
    setPreviouslyAnsweredCorrectly(!!myCorrectAnswer);
  }, [myCorrectAnswer]);

  useEffect(() => deselectMink, [setSelectedMink]);

  const card = (
    <MinkCard ref={ref} active={active} topMink={topMink} isShare={isShare}>
      <div>
        <VoteWrap>
          <VoteButton
            onClick={(e) => {
              if (upvoted) {
                e.stopPropagation();

                return;
              }

              selectMink();
              voteMink(1);
            }}
            selected={upvoted}
            disabled={myVote === 1 || active}
          >
            <Dot hide={myVote !== 1} />
            <Icon size={size} icon="arrow-up-circle" />
          </VoteButton>
          <VoteButton
            onClick={(e) => {
              if (downvoted) {
                e.stopPropagation();

                return;
              }

              selectMink();
              voteMink(-1);
            }}
            selected={downvoted}
            disabled={myVote === -1 || active}
          >
            <Dot hide={myVote !== -1} />
            <Icon size={size} icon="arrow-down-circle" />
          </VoteButton>
        </VoteWrap>
        <Main>
          <TopWrap>
            <ItemTime dateTime={created}>{formatDateTime(created)}</ItemTime>
            <Push />
            <ShareWrap>
              <IconBadge count={voteCount} inverse={topMink} iconSize={1} />
              {myVote ? (
                <RatingWrap>
                  /
                  {/* TODO: Check if pluraFormat is needed for this and if it should have the same behaviour as PostTab and RateTab */}
                  <VoteRating hideRate={false} topMink={topMink}>
                    <SlidingValue
                      fontSize={fontSize.md}
                      value={`${formatRating(voteRating) * 10}`}
                      inverse={topMink}
                    >
                      <Dot hide={false} topMink={topMink} />
                    </SlidingValue>
                  </VoteRating>
                </RatingWrap>
              ) : (
                <InsiderText>{pluralFormatVote(voteCount)}</InsiderText>
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
                maxLength={25}
                value={answer}
                onChange={tryAnswer}
                readOnly={previouslyAnsweredCorrectly}
                icon={renderInputIcon(answerStatus, previouslyAnsweredCorrectly, active)}
                onFocus={!previouslyAnsweredCorrectly ? selectMink : undefined}
                onBlur={deselectMink}
                onClick={(e) => e.stopPropagation()}
                ref={answerRef}
              />
              {active && !previouslyAnsweredCorrectly && (
                <StatusIcon
                  answerStatus={answerStatus}
                  answer={answer}
                  whiteLoader={topMink}
                  clickEvent={clearAnswer}
                />
              )}
            </div>
            {active && flagErrorMessage?.length ? (
              <Status>{flagErrorMessage}</Status>
            ) : (
              <AnswerStatus
                status={answerStatus}
                previouslyAnsweredCorrectly={previouslyAnsweredCorrectly}
                active={active}
                isShare={isShare}
              />
            )}
          </InputGroup>
          {!isShare && (
            <FlagItemWrap>
              <FlagItem
                disabled={isActiveInsider}
                flagged={wasFlaggedByMe}
                toggleFlag={toggleFlag}
                color={palette.gray2}
              />
            </FlagItemWrap>
          )}
        </Main>
      </div>
    </MinkCard>
  );
  return topMink ? (
    <HelpTip
      placement="top"
      tip={
        'your team votes to select the TOP MINK, ' +
        'which all teammates must answer to get in your house'
      }
    >
      {card}
    </HelpTip>
  ) : (
    card
  );
};

const MinkTab = ({
  venue: {
    id: houseId,
    name: venueName,
    industry: { lite },
    minks,
    addedMinkId,
  },
  loading,
  setSelectedMink,
  setAddedMinkId,
  selectedMink,
  upvoteMink,
  downvoteMink,
  tryAnswerMink,
  answerStatus,
  flagErrorMessage,
  toggleMinkFlag,
  topMinkId,
  voteConfirmation,
}) => {
  const ref = useRef(null);
  const [initialTopMink, setInitialTopMink] = useState(true);
  const [initialMinksRendering, setInitialMinksRendering] = useState(true);

  useEffect(() => setInitialMinksRendering(true), [loading]);
  useEffect(() => {
    if (!topMinkId) {
      return;
    }

    if (!initialTopMink) {
      ref.current.scrollIntoView();
    } else {
      setInitialTopMink(false);
    }
  }, [topMinkId]);

  const renderSharePreview = useCallback(
    (id) => {
      const previewMink = minks.find((m) => m.id === id);
      const isTopMink = minks.find((m) => m.isTopMink)?.id === id;

      return isTopMink ? (
        <TopMinkSharePreviewWrap>
          <TopMinkContainer>
            <Mink
              mink={previewMink}
              upvoteMink={upvoteMink}
              downvoteMink={downvoteMink}
              answerStatus={answerStatus}
              topMink
              isShare
            />
          </TopMinkContainer>
        </TopMinkSharePreviewWrap>
      ) : (
        <SharePreviewWrap>
          <Mink
            mink={previewMink}
            upvoteMink={upvoteMink}
            downvoteMink={downvoteMink}
            answerStatus={answerStatus}
            isShare
          />
        </SharePreviewWrap>
      );
    },
    [minks],
  );
  const getTitleForShare = (id) => minks.find((m) => m.id === id)?.question;
  const movementName = formatMovementURL(venueName);

  const updateMinks = useFreshRef(() => {
    const sortedMinks = minks.sort((a, b) => {
      if (+a.voteCount > 9 && +b.voteCount < 10) return -1;
      if (+a.voteCount < 10 && +b.voteCount > 9) return 1;
      if (+a.voteRating > +b.voteRating) return -1;
      if (+a.voteRating < +b.voteRating) return 1;

      return new Date(b.created).getTime() - new Date(a.created).getTime();
    });
    setVenueMinks(sortedMinks);
  }, [minks, setVenueMinks]);

  useEffect(() => {
    if (minks && initialMinksRendering) {
      updateMinks.current();

      setInitialMinksRendering(false);
    }
  }, [minks]);

  return (
    <TabLayout ref={ref}>
      {!minks?.length || loading ? (
        <Loader big />
      ) : (
        <>
          {minks.find((m) => m.isTopMink) && (
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
                mink={minks.find((m) => m.isTopMink)}
                setSelectedMink={setSelectedMink}
                selectedMink={selectedMink}
                upvoteMink={upvoteMink}
                downvoteMink={downvoteMink}
                tryAnswerMink={tryAnswerMink}
                answerStatus={answerStatus}
                toggleMinkFlag={toggleMinkFlag}
                flagErrorMessage={flagErrorMessage}
                topMink
                update={updateMinks}
              />
            </TopMinkContainer>
          )}
          <Link
            href={`/houses?id=${houseId}&tab=mink&new`}
            as={lite ? `/movement/${movementName}/mink/new` : `/houses/${houseId}/mink/new`}
            passHref
          >
            <NewMinkButton icon="arrow-right">new mink</NewMinkButton>
          </Link>
          {minks.length > 1 && (
            <>
              <RunnersTitle>Runners up</RunnersTitle>
              {minks
                .filter((m) => !m.isTopMink || m.id !== minks.find((_m) => _m.isTopMink)?.id)
                .map((m) => (
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
                    flagErrorMessage={flagErrorMessage}
                    update={updateMinks}
                  />
                ))}
            </>
          )}
        </>
      )}
      <NewMinkElected />
      {voteConfirmation && (
        <Modal title={venueName} inverse>
          <RateConfirmation title={selectedMink.question} {...voteConfirmation} />
        </Modal>
      )}

      <PrivateShare type="mink" renderItem={renderSharePreview} getItemTitle={getTitleForShare} />
    </TabLayout>
  );
};

const mapsState = createStructuredSelector({
  selectedMink: selectSelectedMink,
  answerStatus: selectAnswerMinkStatus,
  flagErrorMessage: selectPostFlagError,
  isActiveInsider: selectIsActiveInsider,
  topMinkId: selectSelectedVenueTopMinkId,
  voteConfirmation: selectVoteMinkConfirmation,
});

const mapDispatch = {
  loadMinks,
  setSelectedMink,
  setVenueMinks,
  setAddedMinkId,
  upvoteMink,
  downvoteMink,
  tryAnswerMink,
  toggleMinkFlag,
};

export default connect(mapsState, mapDispatch)(MinkTab);
