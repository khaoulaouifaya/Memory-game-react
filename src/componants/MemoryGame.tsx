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

  const [selectedCardsIndex,setSelectedCardsIndex] = useState<Number[]>([]);
  const [selectedCardsContent,setSelectedCardsContent] = useState<String[]>([]);
  const [result,setResult]=useState(0);


  const clickCard = (index: number, cardContent: String) => {
    setCountClick(countClick + 1);
    setSelectedCardsIndex(prevState => [...prevState, index]);
    setSelectedCardsContent(prevState => [...prevState, cardContent]);
    selectedCardsContent.map(card => {
      if(cardContent === card){
          setResult(result+1);
      }
    });
  };

  const displayListCards = (cards: String[]) => {
    return cards.map((card, index) => (
      <div key={index} className="col mb-2">
        <div
          className="card large-card shadow-sm d-flex align-items-center justify-content-center"
          onClick={() => clickCard(index, card)}
          style={selectedCardsIndex.includes(index) ? {background: "white"} : {background: "black"}}>
          {selectedCardsIndex.includes(index) && <span>{card}</span>}
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
        <span> {countClick} moves | time: {time} sec</span> | Resultat : {result}
      </div>
      <div className="container">
        <div className="row row-cols-6 g-2">{displayListCards(cardsList)}</div>
      </div>
    </div>
  );
}

export default MemoryGame;
