import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          // eslint-disable-next-line react/jsx-props-no-spreading
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
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
          {/* <title>In-House | Speak as a Team | Remain Untraceable</title> */}
          <link rel="icon" type="image/x-icon" href="/static/favicon.ico" />
          <meta name="title" content="In-House | Speak as a Team | Remain Untraceable" />
          <meta
            name="description"
            content="Challenge favoritism and politics. Promote the best ideas and people. Are you an Insider?"
          />

          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://in-house.com/" />
          {/* <meta property="og:title" content="In-House | Speak as a Team | Remain Untraceable" /> */}
          <meta
            property="og:description"
            content="Challenge favoritism and politics. Promote the best ideas and people. Are you an Insider?"
          />
          <meta property="og:image" content="https://in-house.azureedge.net/webstatic/in-house-meta.png" />

          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://in-house.com/" />
          {/* <meta property="twitter:title" content="In-House | Speak as a Team | Remain Untraceable" /> */}
          <meta
            property="twitter:description"
            content="Challenge favoritism and politics. Promote the best ideas and people. Are you an Insider?"
          />
          <meta property="twitter:image" content="https://in-house.azureedge.net/webstatic/in-house-meta.png" />

          <meta name="theme-color" content="#333333" />
          <script src={`https://www.googleoptimize.com/optimize.js?id=${process.env.NEXT_PUBLIC_G_OPTIMIZE_KEY}`} />
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
