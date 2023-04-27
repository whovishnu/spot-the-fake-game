function HomePage({ handleStart }) {
    return (
      <div className="HomePage">
          <h1>Welcome Spot the Fake Game</h1>
          <button onClick={handleStart}>Play Game</button>
      </div>
    );
  }
  
  export default HomePage;
  