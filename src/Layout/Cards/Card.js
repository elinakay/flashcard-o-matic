// Card.js: Component for displaying and navigating flashcards
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function Card({ deck }) {
  const [cardSide, setCardSide] = useState(true);
  const [index, setIndex] = useState(0);
  const history = useHistory();

  // Handle advancing to the next card or restarting the deck
  const handleNext = () => {
    if (index !== deck.cards.length - 1) {
      setIndex(index + 1);
      setCardSide(true);
    } else {
      const result = window.confirm(
        "Restart cards?\n\n\nClick 'cancel to return to the home page."
      );
      if (result) {
        setIndex(0);
        setCardSide(true);
      } else {
        history.push("/");
      }
    }
  };

  // Handle flipping the flashcard to the other side
  const handleFlip = () => {
    setCardSide(!cardSide);
  };

  // Render the Card component
  return (
    <div className="row">
      <div className="col-sm-6">
        <div className="card">
          <div className="card-body">
            <h4 className="study-card-length">
              Card {index + 1} of {deck?.cards?.length}
            </h4>
            <span className="card-buttons d-flex justify-content-between">
              <p className="card-text my-1">
                {cardSide ? deck?.cards[index].front : deck?.cards[index].back}
              </p>
            </span>
            <button
              className="btn btn-secondary my-2 mr-2"
              onClick={handleFlip}
            >
              Flip
            </button>
            {!cardSide && (
              <button className="btn btn-primary" onClick={handleNext}>
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;

