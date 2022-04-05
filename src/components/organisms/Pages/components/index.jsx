import styled from "styled-components";

import { Icon } from '../../../atoms';
import { appColors, device } from '../../../../style';
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
`

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
`

export const NumberedSectionBlock = ({
	index,
	header,
	source,
	description,
	note,
	share,
	headerMaxWidth,
	descriptionMaxWidth
}) => (
  <NumberedSectionBlockContainer>
    <HorizontallyCenteredContainer style={{ marginBottom: '6px' }}>
      <Icon icon={`number-disc-${index + 1}`} size={6} color="none" />
    </HorizontallyCenteredContainer>

    <HorizontallyCenteredContainer
			style={{
				marginBottom: '12px',
				maxWidth: '306px'
			}}
		>
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

        <div>
          {share && (
            <HorizontallyCenteredContainer>
              <Icon icon="paper-plane" size={3} color={appColors.gray400} />
            </HorizontallyCenteredContainer>
          )}
        </div>
      </div>
    </HorizontallyCenteredContainer>

    <HorizontallyCenteredContainer style={{ maxWidth: '306px' }}>
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
  justify-content: center;
  max-width: ${({ maxWidth }) => maxWidth || '333px'};
  margin: auto;
  text-align: ${({ align }) => (align ? 'center' : null)};
  flex-direction: column;

  span {
    margin: 0 auto;
  }
`;
export const FlexContainer = styled.div`
	display: flex;
	justify-content: space-evenly;
	align-items: start;
	flex-wrap: wrap;
  
	@media ${device.desktop} {
		padding-left: 177px;
		padding-right: 177px;
	}
`;

export const BottomSectionWrapper = styled.div`
  @media ${device.desktop} {
    background: #111;
    padding: 0 277px;

  }
`
export const NumberedSectionBlockContainer = styled.div`
  width: 320px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
	margin: 20px;
  
	@media ${device.mobile} {
    width: 306px;
    margin: 20px;
	}
	@media ${device.tab} {
    width: 300px;
    margin: 30px;
	}
	@media ${device.web} {
    width: 320px;
    margin: 40px;
	}
	@media ${device.laptop} {
    width: 320px;
    margin: 60px;
	}
	@media ${device.desktop} {
    width: 320px;
    margin: 100px;
	}

  & div > p:last-child {
    margin-bottom: 60px;
  }
`;
