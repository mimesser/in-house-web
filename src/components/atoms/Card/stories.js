import React from 'react';
import faker from 'faker';
import { storiesOf } from '@storybook/react';

import { Flex, Heading } from '..';
import { Card } from '.';

const randomCards = [];

// eslint-disable-next-line no-plusplus
for (let i = 0; i < 9; i++) {
   randomCards.push({
      title: faker.lorem.words(2),
      copy: faker.lorem.sentences(3),
   });
}

storiesOf('Card', module)
   .add('default', () => (
      <Card>
         <Heading h3>Normal Card</Heading>
         <p>Nullam quis risus eget urna mollis ornare vel eu leo. Donec id elit non mi porta gravida at eget metus. Donec sed odio dui.</p>
      </Card>
   ))
   .add('big', () => (
      <Card big>
         <Heading h3>Big Card</Heading>
         <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec id elit non mi porta gravida at eget metus.</p>
      </Card>
   ))
   .add('primary', () => (
      <Card primary delay={1500}>
         <Heading h3 style={{ color: '#fff' }}>
            Primary Delayed Card
         </Heading>
         <p>Nullam quis risus eget urna mollis ornare vel eu leo. Donec id elit non mi porta gravida at eget metus. Donec sed odio dui.</p>
      </Card>
   ))
   .add('Card List', () => (
      <Flex>
         {randomCards.map((el, index) => {
            return (
               // eslint-disable-next-line react/no-array-index-key
               <Card primary key={index} delay={index * 125} style={{ width: '25%' }}>
                  <Heading style={{ color: '#fff' }} h4>
                     {el.title}
                  </Heading>
                  <p>{el.copy}</p>
               </Card>
            );
         })}
      </Flex>
   ));
