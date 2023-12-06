import React, { Fragment, useState } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Route, Switch } from "react-router-dom";
import DeckList from "./Decks/DeckList";
import CreateDeck from "./Decks/CreateDeck";
import DeckStudy from "./Decks/DeckStudy";
import DeckView from "./Decks/DeckView";
import DeckEdit from "./Decks/DeckEdit";
import AddCard from "./Cards/AddCard";
import EditCard from "./Cards/EditCard";
import Home from "./Home";

function Layout() {
  const [decks, setDecks] = useState([]);
  const [deck, setDeck] = useState({});
  const [card, setCard] = useState([]);

  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home decks={decks} setDecks={setDecks} />
            <DeckList decks={decks} setDecks={setDecks} />
          </Route>
          <Route path="/decks/new">
            <CreateDeck />
          </Route>
          <Route exact path="/decks/:deckId">
            <DeckView />
          </Route>
          <Route path="/decks/:deckId/study">
            <DeckStudy />
          </Route>
          <Route path="/decks/:deckId/edit">
            <DeckEdit deck={deck} setDeck={setDeck} />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <AddCard
              card={card}
              setCard={setCard}
              deck={deck}
              setDeck={setDeck}
            />
          </Route>
          <Route exact path="/decks/:deckId/cards/:cardId/edit">
            <EditCard
              deck={deck}
              setDeck={setDeck}
              card={card}
              setCard={setCard}
            />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
