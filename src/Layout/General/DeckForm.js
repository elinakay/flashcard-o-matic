import React, { Fragment, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { createDeck, readDeck, updateDeck } from "../../utils/api";

function DeckForm() {
  // Extracting deckId from route parameters
  const { deckId } = useParams();

  // State to manage deck data and a copy for breadcrumb navigation
  const [deck, setDeck] = useState({ name: "", description: "" });
  const [deckCopy, setDeckCopy] = useState({});

  // Access to browser history
  const history = useHistory();

  // Fetch deck data on component mount if editing a deck
  useEffect(() => {
    const abortController = new AbortController();

    async function getDeck() {
      try {
        const response = await readDeck(deckId, abortController.signal);
        setDeck({ ...response });
        setDeckCopy({ ...response });
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Aborted getDeck() in DeckForm");
        } else {
          throw err;
        }
      }
    }

    if (deckId) {
      getDeck();
    }

    return () => abortController.abort();
  }, []);

  // Conditional rendering of an additional breadcrumb for existing deck
  function CrumbCheck() {
    return deckId ? (
      <li className="breadcrumb-item">
        <Link to={`/decks/${deckId}`}>{deckCopy.name}</Link>
      </li>
    ) : null;
  }

  // Handle text changes in the form fields
  const handleChange = ({ target }) => {
    const { id, value } = target;
    setDeck((prevDeck) => ({
      ...prevDeck,
      [id]: value,
    }));
  };

  // Cancel click handler
  const handleCancelClick = () => {
    const destination = deckId ? `/decks/${deckId}` : "/";
    history.push(destination);
  };

  // Form submit handler
  const handleSubmitClick = async (e) => {
    e.preventDefault();

    if (deckId) {
      await updateDeck(deck);
      history.push(`/decks/${deckId}`);
    } else {
      const response = await createDeck(deck);
      setDeck({ name: "", description: "" });
      history.push(`/decks/${response.id}`);
    }
  };

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
          <CrumbCheck />
          <li className="breadcrumb-item">
            {deckId ? "Edit Deck" : "Create Deck"}
          </li>
        </ol>
      </nav>
      {/* Form header */}
      <h2>{deckId ? "Edit Deck" : "Create Deck"}</h2>
      {/* Deck form */}
      <form onSubmit={handleSubmitClick}>
        {/* Name input field */}
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            className="form-control"
            placeholder="Deck Name"
            value={deck.name}
            onChange={handleChange}
            required
          ></input>
        </div>
        {/* Description input field */}
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            className="form-control"
            placeholder="Brief description of the deck"
            value={deck.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        {/* Action buttons */}
        <div className="d-flex">
          <button
            type="button"
            className="btn btn-secondary mr-2"
            onClick={handleCancelClick}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </Fragment>
  );
}

export default DeckForm;
