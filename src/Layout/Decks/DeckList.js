// DeckList.js: Component for rendering a list of decks
import React, { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { listDecks } from "../../utils/api";
import Deck from "../Decks/Deck";
import ErrorMessage from "../ErrorMessage";

export const DeckList = () => {
  const [error, setError] = useState(undefined);
  const [decks, setDecks] = useState([]);

  // Load the list of decks when the component mounts
  useEffect(() => {
    const abortController = new AbortController();
    listDecks(abortController.signal).then(setDecks).catch(setError);
    return () => abortController.abort();
  }, []);

  // Display an error message if loading decks fails
  if (error) {
    return (
      <ErrorMessage error={error}>
        <p>
          <Link to="/">Return Home</Link>
        </p>
      </ErrorMessage>
    );
  }

  // Map each deck to a Deck component
  const list = decks.map((deck) => <Deck key={deck.id} deck={deck} />);

  // Render the DeckList component
  return <>{list}</>;
};

export default DeckList;

