import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readDeck, createCard } from "../../utils/api";
import CardForm from "./CardForm";

function AddCard({ deck, setDeck, card, setCard }) {
  const history = useHistory();
  const { deckId } = useParams();

  useEffect(() => {
    async function loadDecks() {
      const loadedDeck = await readDeck(deckId);
      setDeck(loadedDeck);
    }
    loadDecks();
  }, [deckId, setDeck]);

  function changeFront(e) {
    setCard({ ...card, front: e.target.value });
  }

  function changeBack(e) {
    setCard({ ...card, back: e.target.value });
  }

  function handleDone() {
    history.push(`/decks/${deck.id}`);
  }

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

  return (
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
            Add Card
          </li>
        </ol>
      </nav>
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
