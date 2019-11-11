import styled from 'styled-components';

import { calcRem, fontSize, spacing, palette } from '../../../style';
import { Button, Heading, IconButton, Input, Strong } from '../../atoms';
import { Patent } from '../../molecules';

export const QuestionForm = styled.div`
  padding: ${calcRem('50px')} 0;
  display: flex;
  flex-direction: column;
  flex: 1;

  ${Heading} {
    margin-bottom: ${spacing.small};
    color: ${palette.white};
  }
`;

export const ExplainMink = styled.div`
  margin-bottom: ${calcRem('80px')};

  ${Patent} {
    color: ${palette.textLight};
  }
  z-index: 1000;
  > span {
    > div {
      padding-bottom: ${spacing.xxLarge};
    }
  }
`;

export const Question = styled.div`
  font-size: 2rem;
  margin-bottom: ${spacing.xLarge};
`;
export const Answer = styled.form`
  > div {
    display: flex;
  }
  margin-bottom: ${spacing.xLarge};
`;
export const SubmitButton = styled(IconButton).attrs({
  type: 'submit',
})`
  transition: opacity 0.5s;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  margin-left: ${spacing.medium};
`;

export const ChangeButtonWrapper = styled.div`
  margin: auto;
  padding-top: 1rem;
`;

export const ChangeButton = styled(Button)`
  border-color: ${palette.secondary};
  color: inherit;
  background-color: transparent;
  // margin: auto;
  padding-left: ${spacing.xxxLarge};
  padding-right: ${spacing.xxxLarge};
`;

export const InputHelp = styled.span`
  font-size: ${fontSize.small};
  margin-top: ${spacing.tiny};
  margin-left: ${spacing.medium};
  color: ${({ highlight }) => (highlight ? palette.white : 'inherit')};
`;

export const AnswerInput = styled(Input)`
  max-width: calc(100% - ${calcRem('60px')});
  border-color: ${palette.secondaryDark};
  color: inherit;
  background-color: transparent;
  :hover:not(:disabled),
  :active:not(:disabled),
  :focus:not(:disabled) {
    color: inherit;
    border-color: ${({ strike }) => (strike ? palette.white : 'inherit')};
    outline: none;
  }

  ::placeholder {
    color: ${palette.secondaryDark};
  }
`;

export const Try = styled.div`
  font-size: ${fontSize.medium};

  > ${Strong} {
    color: ${palette.white};
  }
`;
