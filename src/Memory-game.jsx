import { useEffect, useState } from "react";

import diavolo from "./assets/diavolo.png";
import gyro from "./assets/gyro.jpg";
import johnny from "./assets/johnny.jpg";
import josuke from "./assets/josuke.png";
import giorno from "./assets/giorno.jpg";
import joseph from "./assets/joseph.webp";
import kira from "./assets/kira.webp";
import Speedwagon from "./assets/Speedwagon.webp";
import valentine from "./assets/valentine.png";
import jonathan from "./assets/jonathan.jpg";

export default function MemoryCard() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [userGameState, setUserGameState] = useState([]);
  const baseState = [diavolo, kira, johnny, joseph, josuke, valentine, gyro, Speedwagon, jonathan, giorno];

  function Nav() {
    return (
      <>
        <div className="navbar">
        <div className="nav-left">
          <h2>Memory Card</h2>
          <p>
            The rule of the game is simple: you must not click on the same image
            twice.
          </p>
        </div>
        <div className="nav-right">
          <h3 className="n-h3">
            <strong>Score: </strong>
            {score}
          </h3>
          <h3>
            <strong>Best Score: </strong>
            {bestScore}
          </h3>
        </div>
      </div>
      </>
    )
  }

  function handleImageClick(name) {
    // console.log(`Clicked ${name}`);
    let repeated = false;
    for (let i = 0; i < userGameState.length; i++) {
      if (userGameState[i] === name) {
        repeated = true;
      }
    }

    if (repeated) {
      setBestScore(Math.max(bestScore, score));
      setScore(0);
      setUserGameState([]);
    }
    else {
      setScore(prevScore => prevScore + 1);
      setUserGameState(prevState => [ ...prevState, name ]);
    }
  }

  function extractName(imagePath) {
    const match = imagePath.match(/([\w-]+)\.\w+$/);
    return match ? match[1] : "Unknown";
  }

  function Main() {
    baseState.sort( () => .5 - Math.random() );
    return (
      <div className="images">
        {baseState.map( (image, index) => (
          <div key={index} onClick={() => handleImageClick(extractName(image))}>
            <img src={image} alt={`Character ${index}`} />
            <p>{extractName(image)}</p>
           </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <Nav />
      <Main />
    </>
  );
}
