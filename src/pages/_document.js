import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import { hotjar } from '../external-tools/hotjar';

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
          <title>In-House | Speak as a Team | Remain Untraceable</title>
          <meta name="title" key="title" content="In-House | Speak as a Team | Remain Untraceable" />
          <meta
            name="description"
            content="Challenge favoritism and politics. Promote the best ideas and people. Are you an Insider?"
          />

          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://in-house.com/" />
          <meta property="og:title" content="In-House | Speak as a Team | Remain Untraceable" />
          <meta
            property="og:description"
            content="Challenge favoritism and politics. Promote the best ideas and people. Are you an Insider?"
          />
          <meta property="og:image" content="https://in-house.azureedge.net/webstatic/in-house-meta.png" />

          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://in-house.com/" />
          <meta property="twitter:title" content="In-House | Speak as a Team | Remain Untraceable" />
          <meta
            property="twitter:description"
            content="Challenge favoritism and politics. Promote the best ideas and people. Are you an Insider?"
          />
          <meta property="twitter:image" content="https://in-house.azureedge.net/webstatic/in-house-meta.png" />

          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

          <link
            href="https://fonts.googleapis.com/css?family=Roboto:300|Nunito+Sans:600|Source+Sans+Pro:300,400&display=swap"
            rel="stylesheet"
          />
          <link rel="icon" type="image/x-icon" href="/static/favicon.ico" />
          <script dangerouslySetInnerHTML={hotjar} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
