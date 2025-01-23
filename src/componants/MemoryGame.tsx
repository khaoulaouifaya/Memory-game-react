import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import  Card  from './models/Card';

function MemoryGame() {
  const [countClick, setCountClick] = useState(0);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false); // Indicateur si le jeu est en cours

  const cardsList: Card[] = [
  new Card(1, "🌽"),
  new Card(2, "🍒"),
  new Card(3, "🍩"),
  new Card(4, "😎"),
  new Card(5, "🌼"),
  new Card(6, "🍉"),
  new Card(7, "🏠"),
  new Card(8, "⭐"),
  new Card(9, "🍎"),
  new Card(10, "🍒"),
  new Card(11, "🌽"),
  new Card(12, "🍉"),
  new Card(13, "🌼"),
  new Card(14, "🍩"),
  new Card(15, "⭐"),
  new Card(16, "🏠"),
  new Card(17, "🍎"),
  new Card(18, "😎"),
  ];

  const [selectedCards,setSelectedCards] = useState<Card[]>([]);
  const [result,setResult]=useState(0);

  const clickCard = (cardContent : Card) => {
    setCountClick(countClick + 1);
    const count = selectedCards.filter(item => item.content===cardContent.content).length;
    if(count <= 1 ){
      setSelectedCards(prevState => [...prevState, cardContent]);
      selectedCards.map(card => {
        if(cardContent.content === card.content){
          setResult(result+1);
        }else{
          setTimeout(() => {
            setSelectedCards([]);
      }, 1000);
        }
      });
    }
  };

  const displayListCards = (cards :Card[]) => {
    return cards.map(card => (
      <div key={card.index} className="col mb-2">
        <div
          className="card large-card shadow-sm d-flex align-items-center justify-content-center"
          onClick={() => clickCard(card)}
          style={selectedCards.some(c => c.index === card.index) ? {background: "white"} : {background: "black"}}>
          {selectedCards.some(c => c.index === card.index) && <span>{card.content}</span>}
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