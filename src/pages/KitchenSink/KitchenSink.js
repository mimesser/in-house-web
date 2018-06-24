import React from 'react';
import styled from 'styled-components';
import { Input } from 'components';
import Section from './Section';
import { SearchInput } from '../../components';

const Wrapper = styled.div`
   max-width: 800px;
   margin: 60px auto;
`;
const ABlock = styled.div`
   background-color: ${props => props.theme[props.themeKey]};
   color: ${props => props.fontColor};
   border: 1px solid #444;
   margin-right: 10px;
   padding: 10px;
`;
const BBlock = styled.div`
   border: 1px solid #444;
   margin-right: 10px;
   padding: 10px;
   color: #ddd;
   ${props => props.theme[props.themeKey]};
`;
const Line = styled.div`
   flex: 1;
   ${props => props.theme[props.themeKey]};
   border-width: 0;
   border-bottom-width: 1px;
   margin-right: 10px;
   padding: 5px 0;
   color: #ddd;
`;
const TextField = styled.div`
   margin-right: 10px;
`;
const Flex = styled.div`
   display: flex;
`;

export default function KitchenSink() {
   return (
      <Wrapper>
         <Section header="SECTION A (colors)">
            <Flex>
               <ABlock fontColor="#333" themeKey="A_1">A-1</ABlock>
               <ABlock fontColor="#333" themeKey="A_2">A-2</ABlock>
               <ABlock fontColor="#ddd" themeKey="A_3">A-3</ABlock>
               <ABlock fontColor="#ddd" themeKey="A_4">A-4</ABlock>
               <ABlock fontColor="#ddd" themeKey="A_5">A-5</ABlock>
               <ABlock fontColor="#ddd" themeKey="A_6">A-6</ABlock>
               <ABlock fontColor="#ddd" themeKey="A_7">A-7</ABlock>
               <ABlock fontColor="#ddd" themeKey="A_8">A-8</ABlock>
            </Flex>
         </Section>
         <Section header="SECTION B (transparencies)">
            <Flex>
               <BBlock themeKey="B_1">B-1</BBlock>
               <BBlock themeKey="B_2">B-2</BBlock>
               <BBlock themeKey="B_3">B-3</BBlock>
               <BBlock themeKey="B_4">B-4</BBlock>
               <BBlock themeKey="B_5">B-5</BBlock>
               <BBlock themeKey="B_6">B-6</BBlock>
               <BBlock themeKey="B_7">B-7</BBlock>
            </Flex>
         </Section>
         <Section header="SECTION C (lines)">
            <Flex>
               <Line themeKey="C_1">C-1</Line>
               <Line themeKey="C_2">C-2</Line>
               <Line themeKey="C_3">C-3</Line>
               <Line themeKey="C_4">C-4</Line>
            </Flex>
         </Section>
         <Section header="SECTION E (text fields)">
            <Flex>
               <TextField>
                  <Input E_1 placeholder="hint text" />
               </TextField>
               <TextField>
                  <Input E_1 error placeholder="error" />
               </TextField>
               <TextField>
                  <Input E_1 disabled placeholder="disabled" />
               </TextField>
            </Flex>
         </Section>
         <Section header="SECTION E (text fields)">
            <Flex>
               <TextField>
                  <SearchInput F_1 placeholder="F-1" />
               </TextField>
               <TextField>
                  <SearchInput F_2 placeholder="F-2" />
               </TextField>
            </Flex>
         </Section>
      </Wrapper>
   );
}
