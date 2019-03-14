function Home() {
  console.log(process.env);
  return (
    <main>
      <div className="container">
        {JSON.stringify(process.env)}
        <h1><strong>In</strong>House</h1>
        <h3>Coming soon...</h3>
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

export default Home;
