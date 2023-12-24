// NotEnoughCards.js: Component for displaying a message when there are not enough cards in a deck
import React from "react";
import { Link } from "react-router-dom";

const NotEnoughCards = ({ deck }) => {
  // Render a message indicating not enough cards and a link to add cards
  return (
    <div>
      <h4 className="not-enough-cards-h2">Not enough cards.</h4>
      <p>You need at least 3 cards to study. There are 2 cards in this deck.</p>
      <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary mx-1">
        Add Cards
      </Link>
    </div>
  );
};

export default NotEnoughCards;

