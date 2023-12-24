// CreateDeck.js: Component for creating a new deck
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createDeck } from "../../utils/api";

const CreateDeck = () => {
  const history = useHistory();
  const [newDeck, setNewDeck] = useState();

  // Handle form submission to create a new deck
  async function handleSubmit(e) {
    e.preventDefault();
    const res = await createDeck(newDeck);
    history.push(`/decks/${res.id}`);
  }

  // Handle input change for deck name
  const handleNameChange = (e) => {
    setNewDeck({ ...newDeck, name: e.target.value });
  };

  // Handle input change for deck description
  const handleDescriptionChange = (e) => {
    setNewDeck({ ...newDeck, description: e.target.value });
  };

  // Handle cancel button click
  const handleCancel = (e) => {
    e.preventDefault();
    history.push("/");
  };

  // Render the CreateDeck component
  return (
    <div className="create-deck">
      {/* Breadcrumb navigation */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>
      <h2 className="create-card-title m-1">Create Deck</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="deck-name m-1">Name</label>
          <input
            className="form-control"
            id="deck-name"
            rows="1"
            type="text"
            required
            placeholder="Deck Name"
            onChange={handleNameChange}
          />
          <label className="deck-description m-1">Description</label>
          <textarea
            className="form-control"
            id="deck-description"
            type="text"
            required
            rows="3"
            placeholder="Brief description of the deck"
            onChange={handleDescriptionChange}
          />
        </div>
        <button
          type="submit"
          className="btn btn-secondary mb-2 mx-1"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-primary mb-2 mx-1">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateDeck;

