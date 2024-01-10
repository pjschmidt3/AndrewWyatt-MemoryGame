import React, { useEffect, useState } from "react";
import Card from "./Card.jsx";
import "./GameBoard.css";
import Points from "./Points.jsx";

const frontCardImg = {
  1: { id: 1, public: "/images/Array.png", pairId: 1, flipped: false },
  2: { id: 2, public: "/images/ArrayExp.png", pairId: 1, flipped: false },
  3: { id: 3, public: "/images/ForLoop.png", pairId: 2, flipped: false },
  4: { id: 4, public: "/images/ForLoopExp.png", pairId: 2, flipped: false },
  5: { id: 5, public: "/images/Object.png", pairId: 3, flipped: false },
  6: { id: 6, public: "/images/ObjectExp.png", pairId: 3, flipped: false },
  7: { id: 7, public: "/images/String.png", pairId: 4, flipped: false },
  8: { id: 8, public: "/images/StringExp.png", pairId: 4, flipped: false },
  9: { id: 9, public: "/images/Variable.png", pairId:5, flipped: false },
  10: { id: 10, public: "/images/VariableExp.png", pairId: 5, flipped: false },
};

function GameBoard({ cardInfo }) {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [flippedCards, setFlippedCards] = useState([]);
  const [pickOne, setPickOne] = useState(null);
  const [pickTwo, setPickTwo] = useState(null);
  console.log(pickOne);
  console.log(pickTwo);

  const handlePick = (selectedCard) => {
    if (isDisabled) {
      return;
    }

    if (!pickOne){
      setPickOne(selectedCard);
    }else if (!pickTwo){
      setPickTwo(selectedCard);

      if (selectedCard.pairId !== pickOne.pairId) {
        setIsDisabled(true);

        setTimeout(() => {
          setIsDisabled(false);
        }, 500);
      }
    }

  
   flipCard(selectedCard);
    setFlippedCards([...flippedCards, selectedCard]);
    incrementTurns();
  };
  const incrementTurns =() => {
    setTurns((prevTurns) => prevTurns +1 );
  };

  const flipCard = (selectedCard) => {
    //  const updatedCards = cards.map((card) =>
    //  card.id === selectedCard.id ? { ...card, flipped: !card.flipped } : card
    //);
    //setCards(updatedCards);

    //setState with the "updated/current version of state instead of the stuck version"
    setCards((prevCards) => {
      console.log(prevCards)
      const updatedCards = prevCards.map((card) => {
       return card.id == selectedCard.id ? {...card, flipped: !card.flipped } : card;
      });
      console.log(updatedCards)
      return updatedCards;
    })


  }

  // Need useffect to get this going
  useEffect(() => {
    // setTimeout(() => {
      if (pickOne && pickTwo){
        if (pickOne.pairId === pickTwo.pairId){
          console.log('we matched!');
        } else if (pickOne.pairId !== pickTwo.pairId) {

          console.log('these cards did not match');
          setTimeout(() => {
            flipCard(pickOne);
            flipCard(pickTwo);
            resetTurn();
          }, 500);
        }
      }
    // }, 1000)
   }, [pickOne, pickTwo]);
  
  const resetTurn = () => {
    setPickOne(null);
    setPickTwo(null);
    setTurns((prevTurns) => prevTurns +1)
  }


  const shuffleCards = () => {
    // "Read the "... spreads the Array"
    const shuffledCards = [...Object.values(frontCardImg)]
      .sort(() => Math.random() - 0.5) //might be good might be bad
      .map((card) => ({ ...card, flipped: card.flipped }));
    resetTurn();
    setCards(shuffledCards);
    setTurns(0);
  };
 

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <Card key={card.id} card={card} userSelect={() => handlePick(card)} />
        ))}
      </div>
      <Points turns={turns}/>
    </div>
  );
};

export default GameBoard;
