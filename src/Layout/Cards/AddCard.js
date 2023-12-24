// AddCard.js: Component for adding a new card to a deck
import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readDeck, createCard } from "../../utils/api";
import CardForm from "./CardForm";

function AddCard({ deck, setDeck, card, setCard }) {
  const history = useHistory();
  const { deckId } = useParams();

  // Load the deck data when the component mounts
  useEffect(() => {
    async function loadDecks() {
      const loadedDeck = await readDeck(deckId);
      setDeck(loadedDeck);
    }
    loadDecks();
  }, [deckId, setDeck]);

  // Update the card's front value on input change
  function changeFront(e) {
    setCard({ ...card, front: e.target.value });
  }

  // Update the card's back value on input change
  function changeBack(e) {
    setCard({ ...card, back: e.target.value });
  }

  // Redirect to the deck view page after adding a card
  function handleDone() {
    history.push(`/decks/${deck.id}`);
  }

  // Save the card to the deck and reset the card state
  function handleSave(e) {
    e.preventDefault();
    async function updateCard() {
      await createCard(deckId, card);
    }
    updateCard();
    setCard({
      front: "",
      back: "",
      deckId: deckId,
    });
  }

  // Render the AddCard component
  return (
    <div>
      {/* Breadcrumb navigation */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href={`/decks/${deck.id}`}>{deck.name}</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Add Card
          </li>
        </ol>
      </nav>
      {/* Form for adding a new card */}
      <div>
        <h1>{deck.name}: Add Card</h1>
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

export default AddCard;

