import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import GlobalStyle from '../components/GlobalStyle';

class MyDocument extends Document {
   static async getInitialProps(ctx) {
      const sheet = new ServerStyleSheet();
      const originalRenderPage = ctx.renderPage;

      try {
         ctx.renderPage = () =>
            originalRenderPage({
               enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
            });

         const initialProps = await Document.getInitialProps(ctx);
         return {
            ...initialProps,
            styles: (
               <>
                  {initialProps.styles}
                  {sheet.getStyleElement()}
               </>
            ),
         };
      } finally {
         sheet.seal();
      }
   }

   render() {
      return (
         <Html>
            <Head>
               <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
               <link href="https://fonts.googleapis.com/css?family=Montserrat|Poppins|Roboto" rel="stylesheet" />
               <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
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
