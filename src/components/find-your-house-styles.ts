import styled from 'styled-components';

export const Header = styled.header`
   height: 48px;
   background-color: #0939CF;
   display: flex;
   align-items: center;
   justify-content: center;
   color: #fff;
   font-size: 20px;
`;

export const Container = styled.div`
   display: flex;
   flex-direction: column;
   height: 100vh;
`;

export const Content = styled.div`
   flex: 1;
   display: flex;
   flex-direction: column;
   align-items: center;
   padding: 0 10px 10px;
   max-width: 480px;
   margin: 0 auto;
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

export const Button = styled.button`
   font-size: 16px;
   width: 100%;
   padding: 10px;
   border: none;
   color: #fff;
   background-color: #0939CF;
   border-radius: 40px;
`;

export const List = styled.div`
   flex: 1;
`;
