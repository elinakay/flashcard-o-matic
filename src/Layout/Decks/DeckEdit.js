// DeckEdit.js: Component for editing the details of a deck
import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readDeck, updateDeck } from "../../utils/api";

function DeckEdit() {
  const history = useHistory();
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});

  // Load deck data when the component mounts
  useEffect(() => {
    async function loadDecks() {
      const loadedDeck = await readDeck(deckId);
      setDeck(loadedDeck);
    }
    loadDecks();
  }, [deckId, setDeck]);

  // Handle input change for deck name
  function changeName(event) {
    setDeck({ ...deck, name: event.target.value });
  }

  // Handle input change for deck description
  function changeDesc(event) {
    setDeck({ ...deck, description: event.target.value });
  }

  // Save the updated deck and redirect to the deck view
  function saveHandler(event) {
    event.preventDefault();
    updateDeck(deck).then((response) => history.push(`/decks/${deck.id}`));
  }

  // Handle cancel button click
  function handleCancel() {
    history.push(`/decks/${deck.id}`);
  }

  // Render the DeckEdit component
  return (
    <div>
      <div>
        {/* Breadcrumb navigation */}
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li className="breadcrumb-item">
              <a href={`/decks/${deckId}`}>{deck.name}</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Edit Deck
            </li>
          </ol>
        </nav>
      </div>
      <div>
        <form>
          <h1>Edit Deck</h1>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <textarea
              type="text"
              className="form-control"
              id="front"
              value={deck.name}
              onChange={changeName}
              rows="3"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              id="back"
              value={deck.description}
              onChange={changeDesc}
              rows="3"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleCancel}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="btn btn-primary mx-1"
            onClick={saveHandler}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default DeckEdit;

