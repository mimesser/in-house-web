import styled from 'styled-components';

const mobileMaxWidth = 480;

export const Container = styled.div`
   flex: 1;
   display: flex;
   flex-direction: column;
   align-items: center;
`;

export const Wrapper = styled.div`
   text-align: center;
   width: 100%;
   max-width: ${mobileMaxWidth}px;
   padding: 0 10px;
`;

export const Input = styled.input`
   font-size: 16px;
   padding: 10px 20px;
   border: none;
   border-radius: 4px;
   width: 100%;
   &::placeholder {
      color: rgba(104, 112, 137, 0.65);
   }
`;

export const Title = styled.h1`
   font-weight: normal;
   color: #1B2031;
   font-size: 22px;
`;

export const SubText = styled.p`
   font-size: 16px;
   color: rgba(104,112,137,0.65);
   margin-left: 20px;
   margin-right: 20px;
   text-align: center;
`;

export const FoundSubText = styled.p`
   font-size: 16px;
   color: rgba(104,112,137,0.65);
   margin-left: 0;
   margin-right: 20px;
   margin-bottom: 4px;
   text-align: left;
`;

export const Button = styled.button`
   font-size: 16px;
   width: 100%;
   padding: 10px;
   border: none;
   color: #fff;
   background-color: #0939CF;
   border-radius: 40px;
   margin: 20px 0 10px;
`;

export const List = styled.div`
   flex: 1;
   width: 100%;
   overflow-y: auto;
   display: flex;
   flex-wrap: wrap;
   align-content: baseline;
   @media (min-width: 481px) {
      padding: 0 10px;
   };
`;

export const Loader = styled.div`
   height: 100%;
   display: flex;
   align-items: center;
`;
