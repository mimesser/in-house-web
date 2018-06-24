import React from 'react';
import styled from 'styled-components';
import { Input, Button, Icon, Typography } from 'components';
import Section from './Section';
import { SearchInput, Select } from '../../components';

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
const FooterMenu = styled.div`
   ${props => props.theme.H_3};
   padding: 20px;
`;
const FooterCopyright = styled.div`
   ${props => props.theme.S3};
   padding: 20px;
`;
const ButtonContainer = styled.div`
   display: flex;
   :not(:last-child) {
      margin-bottom: 20px;
   }
   button + button {
      margin-left: 10px;
   }
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
         <Section header="SECTION F (search fields)">
            <Flex>
               <TextField>
                  <SearchInput F_1 placeholder="F-1" />
               </TextField>
               <TextField>
                  <SearchInput F_2 placeholder="F-2" />
               </TextField>
            </Flex>
         </Section>
         <Section header="SECTION G (dropdown menu)">
            <Flex>
               <TextField>
                  <Select
                     G_1
                     options={[
                        { id: 'american', name: 'american' },
                        { id: 'aphgani', name: 'aphgani' },
                        { id: 'armenian', name: 'armenian' },
                     ]}
                     placeholder="menu"
                  />
               </TextField>
            </Flex>
         </Section>
         <Section header="SECTION H (headers/footer)">
            <Flex>
               <FooterMenu>about us</FooterMenu>
               <FooterMenu>faq</FooterMenu>
               <FooterMenu>add my job</FooterMenu>
               <FooterMenu>terms</FooterMenu>
               <FooterMenu>privacy</FooterMenu>
               <FooterMenu>contact us</FooterMenu>
            </Flex>
            <FooterCopyright>
               © 2016 Minklist Digital, LLC - all rights reserved. Insider Password Questions: US
               Patent No. 8,904,502
            </FooterCopyright>
         </Section>
         <Section header="SECTION I (buttons)">
            <ButtonContainer>
               <Button I_1>I-1</Button>
               <Button I_1 previouslyRated>5</Button>
            </ButtonContainer>
            <ButtonContainer>
               <Button I_2>I-2</Button>
            </ButtonContainer>
            <ButtonContainer>
               <Button I_3>I-3</Button>
               <Button I_3 disabled>disabled</Button>
            </ButtonContainer>
            <ButtonContainer>
               <Button I_4><Icon size={40}>thumb_up</Icon></Button>
               <Button I_4 prevSelected><Icon size={40}>thumb_up</Icon></Button>
               <Button I_4 unselected><Icon size={40}>thumb_up</Icon></Button>
            </ButtonContainer>
         </Section>
         <Section header="SECTION J (links)">
            <ButtonContainer>
               <Button J_1>J-1</Button>
               <Button J_1 selected>selected</Button>
               <Button J_1 inactive>inactive</Button>
            </ButtonContainer>
            <ButtonContainer>
               <Button J_2>J-2</Button>
               <Button J_2 selected>selected</Button>
               <Button J_2 inactive>inactive</Button>
            </ButtonContainer>
         </Section>
         <Section header="SECTION K (outline buttons)">
            <ButtonContainer>
               <Button K_1>K-1</Button>
            </ButtonContainer>
         </Section>
         <Section header="H (HEADER TAGS)">
            <Typography H1>H1 - VENUE light</Typography>
            <Typography H2>H2 - PARAGRAPH light</Typography>
         </Section>
         <Section header="S (SMALL)">
            <Typography S1>S1 - SMALL normal</Typography>
            <Typography S2>S2 - SMALL light</Typography>
            <Typography S3>S3 - SMALL dim</Typography>
            <Typography S4>S4 - SMALL bright</Typography>
         </Section>
         <Section header="P (PARAGRAPH)">
            <Typography P1>P1 - PARAGRAPH normal</Typography>
            <Typography P2>P2 - PARAGRAPH light</Typography>
            <Typography P3>P3 - PARAGRAPH dim</Typography>
            <Typography P4>P4 - PARAGRAPH bright</Typography>
         </Section>
         <Section header="T (TITLE)">
            <Typography T1>T1 - TITLE normal</Typography>
            <Typography T2>T2 - TITLE light</Typography>
            <Typography T3>T3 - TITLE dim</Typography>
            <Typography T4>T4 - TITLE bright</Typography>
         </Section>
         <Section header="C (CATEGORIES)">
            <Typography C1>C1 - CATEGORY normal</Typography>
            <Typography C2>C2 - CATEGORY light</Typography>
            <Typography C3>C3 - CATEGORY dim</Typography>
            <Typography C4>C4 - CATEGORY bright</Typography>
         </Section>
         <Section header="M (MINKS)">
            <Typography M1>M1 - MINKS normal</Typography>
            <Typography M2>M2 - MINKS light</Typography>
            <Typography M3>M3 - MINKS dim</Typography>
            <Typography M4>M4 - MINKS bright</Typography>
         </Section>
         <Section header="V (VENUE)">
            <Typography V1>V1 - VENUE normal</Typography>
            <Typography V2>V2 - VENUE light</Typography>
            <Typography V3>V3 - VENUE dim</Typography>
            <Typography V4>V4 - VENUE bright</Typography>
         </Section>
         <Section header="N (NUMBERS)">
            <Typography N1>N1 - SMALL# normal</Typography>
            <Typography N2>N2 - SMALL# light</Typography>
            <Typography N3>N3 - MEDIUM# light</Typography>
            <Typography N4>N4 - MEDIUM# bright</Typography>
            <Typography N7>N7 - BIG# light</Typography>
            <Typography N8>N8 - BIG# bright</Typography>
         </Section>
         <Section header="L (LANDING)">
            <Typography L1>L1 - SMALL fine normal</Typography>
            <Typography L2>L2 - SMALL fine bright</Typography>
            <Typography L3>L3 - MEDIUM fine normal</Typography>
            <Typography L4>L4 - LARGE bold light</Typography>
            <Typography L5>L5 - BIG bold light</Typography>
         </Section>
      </Wrapper>
   );
}
