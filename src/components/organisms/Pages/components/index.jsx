import styled from 'styled-components';

import { Icon } from '../../../atoms';
import { appColors, desktopWidth, device, mobileWidth } from '../../../../style';
import Text from '../../../atoms/text/_index';

export const ResponsiveTextHeading = styled(Text)`
  font-size: 32px;
  line-height: 39px;

  @media ${device.mobile} {
    font-size: 32px;
    line-height: 39px;
  }
  @media ${device.tab} {
    font-size: 24px;
    line-height: 29px;
  }
  @media ${device.web} {
    font-size: 36px;
    line-height: 44px;
  }
  @media ${device.laptop} {
    font-size: 36px;
    line-height: 44px;
  }
  @media ${device.desktop} {
    font-size: 36px;
    line-height: 44px;
  }
`;

export const ResponsiveText = styled(Text)`
  font-size: 16px;
  line-height: 19px;

  @media ${device.mobile} {
    font-size: 16px;
    line-height: 19px;
  }
  @media ${device.tab} {
    font-size: 16px;
    line-height: 19px;
  }
  @media ${device.web} {
    font-size: 20px;
    line-height: 24px;
  }
  @media ${device.laptop} {
    font-size: 20px;
    line-height: 24px;
  }
  @media ${device.desktop} {
    font-size: 20px;
    line-height: 24px;
  }
`;

export const NumberedSectionBlock = ({
  index,
  header,
  source,
  description,
  note,
  share,
  headerMaxWidth,
  descriptionMaxWidth,
}) => (
  <NumberedSectionBlockContainer>
    <HorizontallyCenteredContainer>
      <Icon icon={`number-disc-${index + 1}`} size={6} color="none" />
    </HorizontallyCenteredContainer>

    <HorizontallyCenteredContainer minHeight="5rem">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <ResponsiveTextHeading
          text={header}
          color={appColors.gray300}
          variant="light"
          weight="bold"
          family="helvetica"
          size={32}
        />

        {share && (
          <HorizontallyCenteredContainer>
            <Icon icon="paper-plane" size={3} color={appColors.gray400} />
          </HorizontallyCenteredContainer>
        )}
      </div>
    </HorizontallyCenteredContainer>

    <HorizontallyCenteredContainer>
      {source && (
        <Text
          text={source}
          color={appColors.gray400}
          variant="light"
          weight="reg"
          family="helvetica"
          size={16}
          style={{ textTransform: 'uppercase' }}
        />
      )}

      <ResponsiveText
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
            variant="light"
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
  justify-content: flex-start;
  max-width: ${({ maxWidth }) => maxWidth};
  margin: auto;
  text-align: ${({ align }) => (align ? 'center' : null)};
  flex-direction: column;
  min-height: ${({ minHeight }) => minHeight}; 
  span {
    margin: 0 auto;
  }
`;
export const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  flex-wrap: wrap;
  column-gap: 20px;
  row-gap: 60px;
`;

export const BottomSectionWrapper = styled.div`
  @media ${device.desktop} {
    background: #111;
  }
`;
export const NumberedSectionBlockContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  row-gap: 15px;
  flex-grow: 0;
  flex-basis: 99%;
  
  @media(min-width: ${mobileWidth.lg}) {
		flex-basis: 48%;
	}
	@media (min-width: ${desktopWidth.sm}) {
		flex-basis: 32%;
  }
`;
