import styled, { css } from 'styled-components';

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
  line-height: ${({ lineHeight }) => `${lineHeight}px`};

  @media (min-width: ${mobileWidth.lg}) {
    line-height: ${({ smLineHeight }) => `${smLineHeight}px`};
  }
  @media (min-width: ${desktopWidth.sm}) {
    line-height: ${({ mdLineHeight }) => `${mdLineHeight}px`};
  }
  @media (min-width: ${desktopWidth.md}) {
    line-height: ${({ lgLineHeight }) => `${lgLineHeight}px`};
  }
  @media (min-width: ${desktopWidth.lg}) {
    line-height: ${({ xlLineHeight }) => `${xlLineHeight}px`};
  }
`;

export const NumberedSectionBlock = ({ index, header, source, description, note, share }) => (
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
        <ResponsiveText
          text={header}
          color={appColors.gray300}
          variant="light"
          weight="bold"
          family="helvetica"
          size={32}
          lineHeight={39}
          smSize={24}
          smLineHeight={29}
          mdSize={36}
          mdLineHeight={44}
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
        <ResponsiveText
          text={source}
          color={appColors.gray400}
          variant="light"
          weight="reg"
          family="helvetica"
          size={16}
          lineHeight={19}
          mdSize={20}
          mdLineHeight={24}
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
        lineHeight={19}
        mdSize={20}
        mdLineHeight={24}
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
            lineHeight={19}
            mdSize={20}
            mdLineHeight={24}
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
  column-gap: ${({ smColumnGap = 20 }) => smColumnGap}px;
  row-gap: ${({ rowGap = 60 }) => rowGap}px;

  @media (min-width: ${mobileWidth.lg}) {
    column-gap: ${({ mdColumnGap = 20 }) => mdColumnGap}px;
  }
  @media (min-width: ${desktopWidth.sm}) {
    column-gap: ${({ lgColumnGap = 20 }) => lgColumnGap}px;
  }
`;

export const BottomSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 180px;

  @media (min-width: ${mobileWidth.lg}) {
    row-gap: 240px;
  }
`;

const flexBasisCalculation = css`
  flex-basis: calc(
    ${({ smCols = 1 }) => 100 / smCols}% -
      ${({ smCols = 1, smColumnGap = 20 }) => (smColumnGap * (smCols - 1)) / smCols}px
  );

  @media (min-width: ${mobileWidth.lg}) {
    flex-basis: calc(
      ${({ mdCols = 2 }) => 100 / mdCols}% -
        ${({ mdCols = 2, mdColumnGap = 20 }) => (mdColumnGap * (mdCols - 1)) / mdCols}px
    );
  }
  @media (min-width: ${desktopWidth.sm}) {
    flex-basis: calc(
      ${({ lgCols = 3 }) => 100 / lgCols}% -
        ${({ lgCols = 3, lgColumnGap = 20 }) => (lgColumnGap * (lgCols - 1)) / lgCols}px
    );
  }
`;

export const NumberedSectionBlockContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  row-gap: 15px;
  flex-grow: 0;
  ${flexBasisCalculation}
`;

const SpacingContainerStyling = styled.div`
  margin-top: ${({ marginTop }) => (marginTop ? `${marginTop}px` : null)};
  margin-bottom: ${({ marginBottom }) => (marginBottom ? `${marginBottom}px` : null)};
  background: ${({ background }) => background};
  padding: ${({ padding }) => padding};
  display: flex;
  flex-direction: column;
  row-gap: ${({ rowGap }) => (rowGap ? rowGap : '60px')};
  align-items: ${({ alignment }) => alignment};
  z-index: 1;
`;

export const SpacingContainer = ({ children, ...props }) => (
  <SpacingContainerStyling {...props}>{children}</SpacingContainerStyling>
);

const PercentSectionContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  row-gap: 15px;
  flex-grow: 0;
  ${flexBasisCalculation}
`;

export const PercentSection = ({
  percent,
  subtitle,
  description,
  note,
  smCols,
  mdCols,
  lgCols,
  smColumnGap,
  mdColumnGap,
  lgColumnGap,
}) => (
  <PercentSectionContainer {...{ smCols, mdCols, lgCols, smColumnGap, mdColumnGap, lgColumnGap }}>
    <HorizontallyCenteredContainer>
      <ResponsiveText
        text={percent}
        color={appColors.gray300}
        variant="light"
        weight="reg"
        family="helvetica"
        size={72}
        lineHeight={86}
      />
      <ResponsiveText
        text={subtitle}
        color={appColors.gray300}
        variant="light"
        weight="bold"
        family="helvetica"
        size={32}
        lineHeight={39}
      />
    </HorizontallyCenteredContainer>
    <HorizontallyCenteredContainer>
      <Text
        text={description}
        color={appColors.gray400}
        variant="light"
        weight="reg"
        family="helvetica"
        size={16}
        mdSize={20}
      />
    </HorizontallyCenteredContainer>
    <HorizontallyCenteredContainer>
      <Text
        text={note}
        color={appColors.gray400}
        variant="light"
        weight="reg"
        family="helvetica"
        size={12}
        mdSize={14}
      />
      {/* </div> */}
    </HorizontallyCenteredContainer>
  </PercentSectionContainer>
);

export const imageMargins = css`
  @media (min-width: ${mobileWidth.sm}) {
    margin-left: -12px;
    margin-right: -12px;
  }

  @media (min-width: ${mobileWidth.md}) {
    margin-left: -32px;
    margin-right: -32px;
  }

  @media (min-width: ${mobileWidth.lg}) {
    margin-left: -40px;
    margin-right: -40px;
  }

  @media (min-width: ${mobileWidth.xl}) {
    margin-left: -56px;
    margin-right: -56px;
  }

  @media (min-width: ${desktopWidth.sm}) {
    margin-left: -80px;
    margin-right: -80px;
  }

  @media (min-width: ${desktopWidth.md}) {
    margin-left: -123px;
    margin-right: -123px;
  }

  @media (min-width: ${desktopWidth.lg}) {
    margin-left: -277px;
    margin-right: -277px;
  }
`;

export const imagePaddings = css`
  @media (min-width: ${mobileWidth.sm}) {
    padding-left: 12px;
    padding-right: 12px;
  }

  @media (min-width: ${mobileWidth.md}) {
    padding-left: 32px;
    padding-right: 32px;
  }

  @media (min-width: ${mobileWidth.lg}) {
    padding-left: 40px;
    padding-right: 40px;
  }

  @media (min-width: ${mobileWidth.xl}) {
    padding-left: 56px;
    padding-right: 56px;
  }

  @media (min-width: ${desktopWidth.sm}) {
    padding-left: 80px;
    padding-right: 80px;
  }

  @media (min-width: ${desktopWidth.md}) {
    padding-left: 123px;
    padding-right: 123px;
  }

  @media (min-width: ${desktopWidth.lg}) {
    padding-left: 277px;
    padding-right: 277px;
  }
`;

export const imageOffset = css`
  ${imageMargins}
  ${imagePaddings}
`;
