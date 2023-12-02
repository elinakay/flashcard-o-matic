import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { deleteDeck } from "../../utils/api";

function ListDecks({ id, name, description, cards, updateCount }) {
  // Handler for the delete button click
  async function handleDeleteClick() {
    // Confirm deletion with a window prompt
    const confirmDelete = window.confirm(
      `Delete this deck? \n\nYou will not be able to recover it.`
    );

    // If user confirms deletion, proceed to delete the deck
    if (confirmDelete) {
      await deleteDeck(id);
      // Update deck count after successful deletion
      updateCount(-1);
    }
  }

  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex justify-content-between">
          {/* Deck title and card count */}
          <h3 className="card-title">{name}</h3>
          <p className="text-secondary">{cards.length} cards</p>
        </div>
        {/* Deck description */}
        <p className="card-text">{description}</p>
      </div>
      <div className="d-flex mb-2">
        {/* Link to view the deck */}
        <Link type="button" className="btn btn-secondary ml-2" to={`/decks/${id}`}>
          <i className="bi bi-eye"></i> View
        </Link>
        {/* Link to start studying the deck */}
        <Link type="button" className="btn btn-primary mx-2" to={`/decks/${id}/study`}>
          <i className="bi bi-journal-check"></i> Study
        </Link>
        {/* Button for deleting the deck with associated click handler */}
        <button
          type="button"
          className="btn btn-danger ml-auto mr-2"
          onClick={() => handleDeleteClick()}
        >
          <i className="bi-trash" role="img"></i> Delete
        </button>
      </div>
    </div>
  );
}

// Prop types for ensuring the correct type of props are passed
ListDecks.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  description: PropTypes.string,
  cards: PropTypes.array,
  updateCount: PropTypes.func,
};

export default ListDecks;
