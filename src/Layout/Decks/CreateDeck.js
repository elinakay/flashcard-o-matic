import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createDeck } from "../../utils/api";

const CreateDeck = () => {
  const history = useHistory();
  const [newDeck, setNewDeck] = useState();

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await createDeck(newDeck);
    history.push(`/decks/${res.id}`);
  }

  const handleNameChange = (e) => {
    setNewDeck({ ...newDeck, name: e.target.value });
  };

  const handleDescriptionChange = (e) => {
    setNewDeck({ ...newDeck, description: e.target.value });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    history.push("/");
  };

  return (
    <div className="create-deck">
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
