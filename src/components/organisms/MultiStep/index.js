import React, { useState } from 'react';
import { Container, Flex } from '../../atoms';
import { RadioGroup, Radio } from '../../molecules';

export function MultiStep(props) {
   const [selectionValue, setSelectionValue] = useState(0);

   const handleChange = value => {
      if (typeof value === 'object') {
         if (selectionValue + 1 < props.steps.length) {
            return setSelectionValue(selectionValue + 1);
         }
         return null;
      }

      return setSelectionValue(value);
   };

   return (
      <Container onClick={handleChange}>
         {props.steps[selectionValue]}
         <Flex justifyAround>
            <RadioGroup selectedValue={selectionValue} onChange={handleChange}>
               {props.steps.map((step, index) => {
                  return <Radio type="radio" key={index} value={index} checked={selectionValue === index} />;
               })}
            </RadioGroup>
         </Flex>
      </Container>
   );
}
