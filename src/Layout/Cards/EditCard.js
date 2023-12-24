// EditCard.js: Component for editing an existing flashcard
import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import CardForm from "./CardForm";
import { readDeck, readCard, updateCard } from "../../utils/api";

function EditCard({ deck, setDeck, card, setCard }) {
  const { deckId, cardId } = useParams();
  const history = useHistory();

  // Load the deck data when the component mounts
  useEffect(() => {
    async function loadDeck() {
      const loadedDeck = await readDeck(deckId);
      setDeck(loadedDeck);
    }
    loadDeck();
  }, [deckId, setDeck]);

  // Load the card data when the component mounts
  useEffect(() => {
    async function loadCard() {
      const cardRead = await readCard(cardId);
      setCard(cardRead);
    }
    loadCard();
  }, [cardId, setCard]);

  // Update the front value of the card on input change
  function changeFront(event) {
    setCard({ ...card, front: event.target.value });
  }

  // Update the back value of the card on input change
  function changeBack(event) {
    setCard({ ...card, back: event.target.value });
  }

  // Save the updated card and redirect to the deck view
  function handleSave(event) {
    event.preventDefault();
    updateCard(card).then((response) => history.push(`/decks/${deck.id}`));
  }

  // Redirect to the deck view without saving changes
  function handleDone() {
    history.push(`/decks/${deck.id}`);
  }

  // Render the EditCard component
  return (
    <div>
      {/* Breadcrumb navigation */}
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li className="breadcrumb-item">
              <a href={`/decks/${deck.id}`}>{deck.name}</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Edit Card {cardId}
            </li>
          </ol>
        </nav>
      </div>
      <div>
        <h1>Edit Card</h1>
        <CardForm
          changeFront={changeFront}
          changeBack={changeBack}
          handleSave={handleSave}
          handleDoneCancel={handleDone}
          cardValueFront={card.front}
          cardValueBack={card.back}
        />
      </div>
    </div>
  );
}

export default EditCard;

