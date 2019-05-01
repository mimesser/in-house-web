import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import GlobalStyle from '../components/GlobalStyle';

class MyDocument extends Document {
   static async getInitialProps(ctx) {
      const initialProps = await Document.getInitialProps(ctx);
      return { ...initialProps };
   }

   render() {
      return (
         <Html>
            <Head>
               <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
               <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
               <link rel="stylesheet" type="text/css" href="/static/modern-normalize.css" />
               <link rel="stylesheet" type="text/css" href="/static/site.css" />
            </Head>
            <body>
               <GlobalStyle />
               <Main />
               <NextScript />
            </body>
         </Html>
      );
   }
}

export default MyDocument;
