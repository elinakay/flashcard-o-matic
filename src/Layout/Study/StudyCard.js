import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, useHistory, useParams } from "react-router-dom";

function StudyCard({ cards }) {
  // Extracting deckId from route parameters
  const { deckId } = useParams();
  // State to manage study-related information (flipped state and current card index)
  const [study, setStudy] = useState({ isFlipped: false, cardIndex: 0 });
  // React Router history object for navigation
  const history = useHistory();

  // Next button handler
  const handleNextClick = () => {
    // Check if there are more cards to display
    if (study.cardIndex < cards.length - 1) {
      // If more cards, move to the next card
      setStudy({
        ...study,
        isFlipped: false,
        cardIndex: study.cardIndex + 1,
      });
    } else {
      // If no more cards, ask user if they want to restart or return to the home page
      window.confirm(
        "Restart cards?\n\nClick 'cancel' to return to the home page."
      )
        ? setStudy({ isFlipped: false, cardIndex: 0 })
        : history.push("/");
    }
  };

  // Check for the number of cards in the deck
  if (cards.length > 2) {
    return (
      <div className="card">
        <div className="card-body">
          {/* Display current card index and total number of cards */}
          <h5 className="card-title">
            Card {study.cardIndex + 1} of {cards.length}
          </h5>
          {/* Display card content (front or back) based on flipped state */}
          <p className="card-text">
            {study.isFlipped
              ? cards[study.cardIndex].back
              : cards[study.cardIndex].front}
          </p>
          {/* Button to flip the card */}
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setStudy({ ...study, isFlipped: !study.isFlipped })}
          >
            Flip
          </button>
          {/* Button to proceed to the next card (visible only when the card is flipped) */}
          {study.isFlipped && (
            <button
              type="button"
              className="btn btn-primary ml-2"
              onClick={handleNextClick}
            >
              Next
            </button>
          )}
        </div>
      </div>
    );
  } else {
    // Display a message when there are not enough cards to study
    return (
      <div>
        <h3>Not enough cards.</h3>
        <p>
          You need at least 3 cards to study. There are {cards.length} cards in
          this deck.
        </p>
        {/* Link to add more cards to the deck */}
        <Link
          type="button"
          className="btn btn-primary"
          to={`/decks/${deckId}/cards/new`}
        >
          <i className="bi bi-plus"></i> Add Cards
        </Link>
      </div>
    );
  }
}

// Prop types for ensuring the correct type of props are passed
StudyCard.propTypes = {
  cards: PropTypes.array,
};

export default StudyCard;
