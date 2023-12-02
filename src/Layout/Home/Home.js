import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { listDecks } from "../../utils/api";

import ListDecks from "./ListDecks.js";

function Home({ deckCount, updateCount }) {
  // State to manage the list of decks
  const [decks, setDecks] = useState([]);

  // Fetch and update the list of decks on component mount or when deckCount changes
  useEffect(() => {
    const abortController = new AbortController();

    async function getDecks() {
      try {
        const response = await listDecks(abortController.signal);
        setDecks(response);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Aborted getDecks() in Home");
        } else {
          throw err;
        }
      }
    }

    // Fetch decks and clean up the abort controller on unmount or when deckCount changes
    getDecks();
    return () => abortController.abort();
  }, [deckCount]);

  // Conditional rendering based on the availability of deck data
  if (decks.length > 0) {
    return (
      <Fragment>
        {/* Link to create a new deck */}
        <Link type="button" className="btn btn-secondary mb-2" to="/decks/new">
          <i className="bi bi-plus-square"></i> Create Deck
        </Link>
        {/* Render each deck using the ListDecks component */}
        {decks.map(({ id, name, description, cards }) => (
          <ListDecks
            key={id}
            id={id}
            name={name}
            description={description}
            cards={cards}
            updateCount={updateCount}
          />
        ))}
      </Fragment>
    );
  } else {
    // Display a loading message while fetching data
    return (
      <p>
        <i className="bi bi-hourglass-split"></i>Fetching data...
      </p>
    );
  }
}

// Prop types for ensuring the correct type of props are passed
Home.propTypes = {
  deckCount: PropTypes.number,
  updateCount: PropTypes.func,
};

export default Home;
