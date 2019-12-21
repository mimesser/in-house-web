import styled from 'styled-components';
import { calcRem, palette, spacing } from '../../../../style';
import { IconButton } from '../../../atoms/Button';
import { HouseNameLarge } from '../../../atoms';
import { Votes } from '../Votes';

export const Back = styled(IconButton)`
  margin-right: auto;
  color: ${palette.white};
`;

export const Header = styled.header`
  position: relative;
  height: ${calcRem('270px')};
  padding: ${spacing.lg};
  color: ${palette.white};
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  > div {
    display: flex;
    flex: 1;
  }

  > * {
    ${({ showHelp }) => !showHelp && 'z-index: 1'};
  }

  background-image: url("${({ imageUrl }) => imageUrl}");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;

  :after {
    position: absolute;
    top:0;
    bottom: 0;
    right: 0;
    left: 0;
    content: '';
    background-color: rgba(85,116,128,0.5);
    background: linear-gradient(180deg, rgba(129,149,156,0.5) 0%, rgba(0,0,0,0.5) 100%);
  }
`;
export const About = styled.div`
  margin: auto 0;
  ${HouseNameLarge} {
    margin-bottom: ${spacing.xl};
  }
`;
export const Ratings = styled(Number)`
  margin: ${spacing.lg} 0 auto auto;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;

  ${Votes} {
    margin: ${spacing.lg} auto 0 auto;
  }
`;
export const Score = styled.div`
  font-size: ${calcRem('80px')};
  display: flex;
  align-items: center;
  sup {
    font-size: 50%;
    top: 0;
    left: -${calcRem('10px')};
  }
`;
export const Industry = styled.div`
  text-transform: uppercase;
`;
