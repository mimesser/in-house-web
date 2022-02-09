import React from 'react';
import styled from 'styled-components';
import { Icon } from '../Icon';
import { appColors } from '../../../style';
const AngleDown = styled(Icon).attrs(() => ({
  icon: 'angle-down',
}))`
  width: 32px;
  height: 32px;
  color: ${appColors.grey400};
  :hover {
    color: ${appColors.grey100};
  }
`;

const scrollToId = (id) => () => {
  const element = document.getElementById(id);
  let elementPosition = element.getBoundingClientRect().top;
  let headerOffset = 90;
  let offsetPosition = elementPosition + headerOffset;
  window.scrollTo({
    behavior: 'smooth',
    top: window.scrollY + offsetPosition - headerOffset * 2,
  });
};

export const HasMoreContentIndicator = ({ scrollTo }) => {
  return (
    <HasMoreStyling onClick={scrollTo && scrollToId(scrollTo)} role="presentation">
      <AngleDown />
    </HasMoreStyling>
  );
};

const HasMoreStyling = styled.div`
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  animation: 0.8s ease 0s infinite alternate none running scroll;
  @keyframes scroll {
    from {
      bottom: 10px;
    }
    to {
      bottom: 5px;
    }
  }
`;

