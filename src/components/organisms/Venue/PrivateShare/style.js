import styled from 'styled-components';

import { Button } from '../../../atoms';

export const SubmitButton = styled(Button).attrs({
   type: 'submit',
})`
   transition: opacity 0.5s;
   opacity: ${({ visible }) => (visible ? 1 : 0)};
   margin: 0 auto;
`;
