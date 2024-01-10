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
  const [pickOne, setPickOne] = useState(null);
  const [pickTwo, setPickTwo] = useState(null);
  console.log(pickOne);
  console.log(pickTwo);

  const handlePick = (selectedCard) => {
    if (isDisabled) {
      return;
    }

    if (!pickOne) {
      setPickOne(selectedCard);
    } else if (!pickTwo) {
      setPickTwo(selectedCard);
      
      // if no match, disable cards and set .5s timeout to flip them back and re-enable
      if (selectedCard.pairId !== pickOne.pairId) {
        setIsDisabled(true);

        setTimeout(() => {
          flipCard(pickOne);
          flipCard(selectedCard);
          setIsDisabled(false);
        }, 500);
      }
      
      
      // increment the turn only after the second selection
      nextTurn();
    }
  
    flipCard(selectedCard);
  };
  
  const incrementTurns =() => {
    setTurns((prevTurns) => prevTurns + 1);
  };

  const flipCard = (selectedCard) => {
    // make a copy of cards array
    const updatedCards = cards;
    
    // find the index of the card to update, then update it in place via splice()
    const idx = cards.findIndex(card => card.id === selectedCard.id);
    selectedCard.flipped = !selectedCard.flipped;
    updatedCards.splice(idx, 1, selectedCard);
    
    // update the state so changes take effect
    setCards(updatedCards);
  };
  
  const resetSelected = () => {
    setPickOne(null);
    setPickTwo(null);
  };
  
  const nextTurn = () => {
    resetSelected();
    incrementTurns();
  };
  
  const shuffleCards = () => {
    // "Read the "... spreads the Array"
    const shuffledCards = [...Object.values(frontCardImg)]
      .sort(() => Math.random() - 0.5) //might be good might be bad
      .map((card) => ({ ...card, flipped: card.flipped }));
    nextTurn();
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
}

export default GameBoard;
