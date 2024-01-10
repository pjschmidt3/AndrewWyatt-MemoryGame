import React from "react";

const Card = ({ card, userSelect }) => {

  return (
    <div className="card">
      {card.flipped ? (
        <img className="front" src={card.public} alt="card front" />
      ) : (
        <img
          className="back"
          src="/images/TCLogo.png"
          onClick={userSelect}
          alt="card back"
        />
      )}
    </div>
  );
};

export default Card;

// ":" If card's flipped property is equal to true then show the front IMG otherwise show the back IMG.
//The colon means otherwise *ternary operator*
