import React, { useState } from 'react';
import './App.css';

function App() {
  const [step, setStep] = useState(1);
  const [playerChoice, setPlayerChoice] = useState(null);
  const [goatDoor, setGoatDoor] = useState(null);
  const [prizeDoor, setPrizeDoor] = useState(Math.floor(Math.random() * 3));
  const [finalChoice, setFinalChoice] = useState(null);
  const [gameResult, setGameResult] = useState(null);

  const chooseDoor = (door) => {
    setPlayerChoice(door);

    // Determine a door to reveal with a goat (not the player's choice and not the prize)
    const doors = [0, 1, 2];
    const remainingDoors = doors.filter((d) => d !== door && d !== prizeDoor);
    const revealedGoatDoor = remainingDoors[Math.floor(Math.random() * remainingDoors.length)];
    setGoatDoor(revealedGoatDoor);
    setStep(2);
  };

  const makeFinalChoice = (door) => {
    setFinalChoice(door);
    setGameResult(door === prizeDoor ? 'You Win!' : 'You Lose.');
    setStep(3);
  };

  const resetGame = () => {
    setStep(1);
    setPlayerChoice(null);
    setGoatDoor(null);
    setPrizeDoor(Math.floor(Math.random() * 3));
    setFinalChoice(null);
    setGameResult(null);
  };

  return (
    <div className="App">
      <h1>Monty Hall Game</h1>
      {step === 1 && (
        <>
          <h2>Choose a door</h2>
          <div className="doors">
            {[0, 1, 2].map((door) => (
              <button key={door} className="door" onClick={() => chooseDoor(door)}>
                Door {door + 1}
              </button>
            ))}
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <h2>Goat revealed behind Door {goatDoor + 1}</h2>
          <h3>Do you want to switch your choice?</h3>
          <div className="doors">
            {[0, 1, 2].map((door) => (
              <button
                key={door}
                className={`door ${door === playerChoice ? 'selected' : ''}`}
                onClick={() => makeFinalChoice(door)}
                disabled={door === goatDoor}
              >
                {door === goatDoor ? `Goat` : `Door ${door + 1}`}
              </button>
            ))}
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <h2>{gameResult}</h2>
          <h3>Prize was behind Door {prizeDoor + 1}</h3>
          <button onClick={resetGame}>Play Again</button>
        </>
      )}
    </div>
  );
}

export default App;
