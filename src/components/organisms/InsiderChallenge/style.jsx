import styled from 'styled-components';

import { calcRem, fontSize, spacing, palette } from '../../../style';
import { Button, H1 } from '../../atoms';
import { IconInput } from '../../molecules';

export const QuestionForm = styled.div`
  padding: ${calcRem('50px')} 0;
  display: flex;
  flex-direction: column;
  flex: 1;

  ${H1} {
    margin-top: ${calcRem('100px')};
    margin-bottom: ${spacing.sm};
    color: ${palette.white};
  }
`;

export const Answer = styled.form`
  margin-bottom: ${spacing.xxl};
`;

export const SubmitButton = styled(Button).attrs(() => ({
  type: 'submit',
  outline: true,
  icon: 'arrow-right',
  wide: true,
}))`
  background-color: transparent;
  color: ${palette.white};
  border-color: ${palette.white};
  transition: all 0.3s linear;
  &[disabled] {
    color: ${palette.darkGray};
    border-color: ${palette.darkGray};
  }
`;

export const ChangeButton = styled(Button)`
  border: none;
  color: inherit;
  background-color: transparent;
`;

export const InputHelp = styled.div`
  margin: ${spacing.sm} 0;
  color: ${palette.gray};
`;

export const AnswerInput = styled(IconInput)`
  color: ${palette.primary};
  background-color: ${palette.white};
`;

export const Try = styled.div`
  font-size: ${fontSize.md};

  > b {
    color: ${palette.white};
  }
`;
