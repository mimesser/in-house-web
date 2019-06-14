import React from 'react';

import { Heading } from '../../../atoms';
import { Patent } from '../../../molecules';
import { Name } from './style';

export const Title = ({ houseName, verb }) => (
   <>
      <Heading noMargin>
         {verb} MINK<sup>©</sup>
      </Heading>
      <div>
         something only true insiders will know <Patent />
      </div>
      <Name>{houseName}</Name>
   </>
);
