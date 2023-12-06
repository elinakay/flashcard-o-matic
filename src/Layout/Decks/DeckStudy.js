import React, { useEffect, useState } from "react";
import { readDeck } from "../../utils/api";
import { useParams, Link } from "react-router-dom";
import NotEnoughCards from "../Cards/NotEnoughCards";
import Card from "../Cards/Card";

function DeckStudy() {
  const [deck, setDeck] = useState([]);
  const [error, setError] = useState(undefined);
  const { deckId } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal).then(setDeck).catch(setError);

    return () => abortController.abort();
  }, [deckId]);

  console.log(useParams());

  return (
    <div className="deck-study">
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
      {deck?.cards?.length >= 3 ? (
        <Card deck={deck} />
      ) : (
        <NotEnoughCards deck={deck} />
      )}
    </div>
  );
}

export default DeckStudy;
