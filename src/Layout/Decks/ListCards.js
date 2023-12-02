import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { deleteCard } from "../../utils/api";

// Component for rendering individual cards in the list
function ListCards({ id, front, back, deckId, updateCardCount }) {
  // Handler for the delete button click
  async function handleDeleteClick() {
    // Confirm deletion with a window prompt
    const confirmDelete = window.confirm(
      `Delete this card? \n\nYou will not be able to recover it.`
    );

    // If the user confirms deletion, proceed to delete the card
    if (confirmDelete) {
      await deleteCard(id);
      // Update card count after successful deletion
      updateCardCount(-1);
    }
  }

  // Render each card item with front and back content
  return (
    <li className="list-group-item">
      <div className="d-flex justify-content-between">
        <p className="mb-2">{front}</p>
        <p className="mb-2">{back}</p>
      </div>
      <div className="d-flex justify-content-end">
        {/* Link to the card edit page */}
        <Link
          type="button"
          className="btn btn-secondary mx-2"
          to={`/decks/${deckId}/cards/${id}/edit`}
        >
          <i className="bi bi-pencil-fill"></i> Edit
        </Link>
        {/* Button for deleting the card with an improved delete icon */}
        <button
          type="button"
          className="btn btn-danger mr-2"
          onClick={() => handleDeleteClick()}
        >
          <i className="bi bi-trash"></i> Delete
        </button>
      </div>
    </li>
  );
}

// Prop types for ensuring the correct type of props are passed
ListCards.propTypes = {
  id: PropTypes.number,
  front: PropTypes.string,
  back: PropTypes.string,
  deckId: PropTypes.number,
  updateCardCount: PropTypes.func,
};

export default ListCards;

