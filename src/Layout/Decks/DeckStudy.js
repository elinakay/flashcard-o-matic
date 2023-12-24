// DeckStudy.js: Component for studying a deck
import React, { useEffect, useState } from "react";
import { readDeck } from "../../utils/api";
import { useParams, Link } from "react-router-dom";
import NotEnoughCards from "../Cards/NotEnoughCards";
import Card from "../Cards/Card";

function DeckStudy() {
  const [deck, setDeck] = useState([]);
  const [error, setError] = useState(undefined);
  const { deckId } = useParams();

  // Load deck data when the component mounts
  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal).then(setDeck).catch(setError);

    return () => abortController.abort();
  }, [deckId]);

  // Render the DeckStudy component
  return (
    <div className="deck-study">
      {/* Breadcrumb navigation */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>
      </nav>
      <h2>{deck.name}: Study</h2>
      {/* Render the Card component if there are enough cards, otherwise render NotEnoughCards component */}
      {deck?.cards?.length >= 3 ? (
        <Card deck={deck} />
      ) : (
        <NotEnoughCards deck={deck} />
      )}
    </div>
  );
}

export default DeckStudy;

