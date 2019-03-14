function Home({ mode }) {
  return (
    <main>
      <div className="container">
        <h1><strong>In</strong>House</h1>
        <h3>Coming soon...</h3>
        <h5>{mode}</h5>
      </div>
      
      <style global jsx>{`
        body {
          font-family: sans-serif;
          margin: 0;
        }
        main {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background-color: rgb(250, 250, 250);
        }
        h1, h3 {
          font-weight: 100;
        }
        h1 {
          color: #aaa;
        }
        h1 strong {
          color: #333;
        }
        h3 {
          color: #333;
        }
      `}</style>
    </main>
  );
}

Home.getInitialProps = () => {
  // TODO: save in redux.
  if (process.browser) {
    return {};
  }
  return { mode: process.env.MODE };
};

export default Home;
