import styled from "styled-components";

import { Icon } from '../../../atoms';
import { appColors } from '../../../../style';
import Text from '../../../atoms/text/_index';

export const NumberedSectionBlock = ({ index, header, source, description, note, share }) => (
  <NumberedSectionBlockContainer>
    <HorizontallyCenteredContainer style={{ marginBottom: '6px' }}>
      <Icon icon={`number-disc-${index + 1}`} size={6} color="none" />
    </HorizontallyCenteredContainer>

    <HorizontallyCenteredContainer style={{ marginBottom: '12px' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Text
          text={header}
          color={appColors.gray300}
          variant="light"
          weight="bold"
          family="helvetica"
          size={32}
        />

        <div>
          {share && (
            <HorizontallyCenteredContainer>
              <Icon icon="paper-plane" size={3} color={appColors.gray400} />
            </HorizontallyCenteredContainer>
          )}
        </div>
      </div>
    </HorizontallyCenteredContainer>

    <HorizontallyCenteredContainer style={{ maxWidth: '334px' }}>
      {source && (
        <Text
          text={source}
          color={appColors.gray400}
          variant="light"
          weight="reg"
          family="helvetica"
          size={16}
          style={{ marginBottom: '12px', textTransform: 'uppercase' }}
        />
      )}

      <Text
        text={description}
        color={appColors.gray400}
        variant="dark"
        weight="reg"
        family="helvetica"
        size={16}
      />

      {note && (
        <div style={{ marginTop: '8px' }}>
          <Text
            text={note}
            color={appColors.gray300}
            variant="dark"
            weight="reg"
            family="helvetica"
            size={16}
          />
        </div>
      )}
    </HorizontallyCenteredContainer>
  </NumberedSectionBlockContainer>
);

export const HorizontallyCenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  max-width: ${({ maxWidth }) => maxWidth || '333px'};
  margin: auto;
  text-align: ${({ align }) => (align ? 'center' : null)};
  flex-direction: column;

  span {
    margin: 0 auto;
  }
`;

export const NumberedSectionBlockContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;

  & div > p:last-child {
    margin-bottom: 60px;
  }
`;
