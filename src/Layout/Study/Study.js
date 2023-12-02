import React, { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck } from "../../utils/api";
import StudyCard from "./StudyCard";

function Study() {
  // Extracting deckId from route parameters
  const { deckId } = useParams();
  // State to manage the deck data
  const [deck, setDeck] = useState({});

  // Fetch deck data on component mount
  useEffect(() => {
    // Creating an AbortController for handling fetch abortion
    const abortController = new AbortController();

    // Get deck information
    async function getDeck() {
      try {
        const response = await readDeck(deckId, abortController.signal);
        // Update the deck state with the fetched data
        await setDeck({ ...response });
      } catch (err) {
        // Handle AbortError or other errors
        if (err.name === "AbortError") {
          console.log("Aborted getDeck() in Study");
        } else {
          throw err;
        }
      }
    }

    // Trigger the getDeck function on mount
    getDeck();

    // Cleanup function to abort the fetch on component unmount
    return () => abortController.abort();
  }, []);

  // Conditional render/loading
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
            <li className="breadcrumb-item">
              <Link to={`/decks/${deckId}`}>{deck.name}</Link>
            </li>
            <li className="breadcrumb-item active">Study</li>
          </ol>
        </nav>
        {/* Study header */}
        <h2>Study: {deck.name}</h2>
        {/* Component to display study cards */}
        <StudyCard cards={deck.cards} />
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

export default Study;
