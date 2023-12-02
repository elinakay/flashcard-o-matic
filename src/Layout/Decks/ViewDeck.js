import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, useHistory, useParams } from "react-router-dom";
import { deleteDeck, readDeck } from "../../utils/api";

import ListCards from "./ListCards.js";

function ViewDeck({ updateCount }) {
  // Extracting deckId from route parameters
  const { deckId } = useParams();

  // State to manage deck and card count
  const [deck, setDeck] = useState({});
  const [cardCount, setCardCount] = useState(0);

  // Access to browser history
  const history = useHistory();

  // Update card count function to refresh the component
  const updateCardCount = (val) => {
    setCardCount((prevCount) => prevCount + val);
  };

  // Fetch deck data on component mount
  useEffect(() => {
    const abortController = new AbortController();

    async function getDeck() {
      try {
        const response = await readDeck(deckId, abortController.signal);
        setDeck({ ...response });
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Aborted getDeck() in ViewDeck");
        } else {
          throw err;
        }
      }
    }

    getDeck();

    // Cleanup function for aborting the fetch if the component unmounts
    return () => abortController.abort();
  }, [cardCount]);

  // Handler for deck deletion
  async function handleDeleteClick() {
    const confirmDelete = window.confirm(
      `Delete this deck? \n\nYou will not be able to recover it.`
    );

    if (confirmDelete) {
      await deleteDeck(deckId);
      updateCount(-1);
      history.push("/");
    }
  }

  // Display message if there are no cards in the deck
  function NoCards() {
    return !deck.cards.length ? (
      <li className="list-group-item">There are no cards in this deck.</li>
    ) : null;
  }

  // Render deck information and card list
  if (deck.id) {
    return (
      <Fragment>
        {/* Breadcrumb navigation */}
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">
                <i className="bi bi-house-door-fill"></i> Home
              </Link>
            </li>
            <li className="breadcrumb-item active">{deck.name}</li>
          </ol>
        </nav>
        {/* Deck details */}
        <div>
          <h2>{deck.name}</h2>
          <p>{deck.description}</p>
        </div>
        {/* Deck action buttons */}
        <div className="d-flex mb-3">
          <Link
            to={`/decks/${deckId}/edit`}
            type="button"
            className="btn btn-secondary"
          >
            <i className="bi bi-pencil-fill"></i> Edit
          </Link>
          <Link
            type="button"
            className="btn btn-primary mx-2"
            to={`/decks/${deckId}/study`}
          >
            <i className="bi bi-journal-check"></i> Study
          </Link>
          <Link
            type="button"
            className="btn btn-primary"
            to={`/decks/${deckId}/cards/new`}
          >
            <i className="bi bi-plus"></i> Add Cards
          </Link>
          <button
            type="button"
            className="btn btn-danger ml-auto mr-2"
            onClick={() => handleDeleteClick()}
          >
            <i className="bi-trash" role="img"></i> Delete
          </button>
        </div>
        {/* Card list */}
        <div>
          <h3>Cards</h3>
          <ul className="list-group">
            <NoCards />
            {deck.cards.map(({ id, front, back, deckId }) => (
              <ListCards
                key={id}
                id={id}
                front={front}
                back={back}
                deckId={deckId}
                updateCardCount={updateCardCount}
              />
            ))}
          </ul>
        </div>
      </Fragment>
    );
  } else {
    // Display loading message while waiting for deck data
    return (
      <p>
        <i className="bi bi-hourglass-split"></i>Fetching data...
      </p>
    );
  }
}

ViewDeck.propTypes = {
  updateCount: PropTypes.func,
};

export default ViewDeck;
