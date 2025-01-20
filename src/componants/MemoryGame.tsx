import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';

function MemoryGame() {
  const [countClick, setCountClick] = useState(0);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false); // Indicateur si le jeu est en cours

  const cardsList: String[] = [
    "🌽", "🍒", "🍩", "😎", "🌼", "🍉", "🏠", "⭐", "🍎",
    "🍒", "🌽", "🍉", "🌼", "🍩", "⭐", "🏠", "🍎", "😎",
  ];

  const clickCard = (index: number, cardContent: String) => {
    setCountClick(countClick + 1);
  };

  const displayListCards = (cards: String[]) => {
    return cards.map((card, index) => (
      <div key={index} className="col mb-2">
        <div
          className="card large-card shadow-sm d-flex align-items-center justify-content-center"
          onClick={() => clickCard(index, card)}
        >
          <span>{card}</span>
        </div>
      </div>
    ));
  };

  const handleStart = () => {
    setIsRunning(true);
    setCountClick(0);
    setTime(0);
  };

  useEffect(() => {
    let timer: number;
    if (isRunning) {
      timer = window.setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(timer); 
  }, [isRunning]);

  return (
    <div className="text-center">
      <div>
        <button className="btn btn-dark mb-3" onClick={handleStart}>
          Start
        </button>
        <span> {countClick} moves | time: {time} sec</span>
      </div>

      <div className="container">
        <div className="row row-cols-6 g-2">{displayListCards(cardsList)}</div>
      </div>
    </div>
  );
}

export default MemoryGame;
