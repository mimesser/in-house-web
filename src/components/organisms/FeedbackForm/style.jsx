import styled from 'styled-components';

import {
  spacing,
  breakpoints,
  fontSize,
  device,
  calcRem,
  mobileWidth,
  desktopWidth,
} from '../../../style';
import { Button, H2 } from '../../atoms';
import { Icon } from '../../atoms/Icon';
import { CustomSelect } from '../../atoms/Dropdown';

export const FormGroup = styled.div`
  margin: ${spacing.md} 0;
`;

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 80px 0 129px;
  row-gap: 30px;

  @media (min-width: ${mobileWidth.lg}) {
    row-gap: 60px;
    max-width: 500px;
  }

  @media (min-width: ${desktopWidth.sm}) {
    max-width: 732px;
  }
`;

export const FieldsGroup = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  row-gap: 30px;
`;

export const Commands = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const SubmitButton = styled(Button).attrs({
  type: 'submit',
})`
  margin: auto 0 ${spacing.md} auto;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const BackButton = styled(Button).attrs({
  type: 'submit',
})`
  margin: auto 0 ${spacing.md} 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const LeftArrowIcon = styled(Icon).attrs({})`
  margin-right: 2rem;
  margin-left: auto !important;
`;
