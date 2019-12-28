import styled from 'styled-components';

import { calcRem, fontSize, spacing, palette } from '../../../style';
import { Button, H1, ClearButton, Input, Patent } from '../../atoms';

export const QuestionForm = styled.div`
  padding: ${calcRem('50px')} 0;
  display: flex;
  flex-direction: column;
  flex: 1;

  ${H1} {
    margin-bottom: ${spacing.sm};
    color: ${palette.white};
  }
`;

export const ExplainMink = styled.div`
  margin-bottom: ${calcRem('80px')};

  ${Patent} {
    color: ${palette.gray};
  }
  z-index: 1000;
  > span {
    > div {
      padding-bottom: ${spacing.xxl};
    }
  }
`;

export const Question = styled.div`
  font-size: 2rem;
  margin-bottom: ${spacing.xl};
`;
export const Answer = styled.form`
  > div {
    display: flex;
  }
  margin-bottom: ${spacing.xl};
`;
export const SubmitButton = styled(ClearButton).attrs({
  type: 'submit',
})`
  transition: opacity 0.5s;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  margin-left: ${spacing.md};
`;

export const ChangeButtonWrapper = styled.div`
  margin: auto;
  padding-top: 1rem;
`;

export const ChangeButton = styled(Button)`
  border-color: ${palette.gray};
  color: inherit;
  background-color: transparent;
  // margin: auto;
  padding-left: ${spacing.xxxl};
  padding-right: ${spacing.xxxl};
`;

export const InputHelp = styled.span`
  font-size: ${fontSize.sm};
  margin-top: ${spacing.xs};
  margin-left: ${spacing.md};
  color: ${({ highlight }) => (highlight ? palette.white : 'inherit')};
`;

export const AnswerInput = styled(Input)`
  max-width: calc(100% - ${calcRem('60px')});
  border-color: ${palette.darkGray};
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
    color: ${palette.darkGray};
  }
`;

export const Try = styled.div`
  font-size: ${fontSize.md};

  > b {
    color: ${palette.white};
  }
`;
