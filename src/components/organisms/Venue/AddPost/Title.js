import React from 'react';

import { Heading } from '../../../atoms';
import { Name } from './style';

export const Title = ({ houseName, verb }) => (
   <>
      <Name>{houseName}</Name>
      <Heading>new post</Heading>
   </>
);
