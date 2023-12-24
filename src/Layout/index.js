// Layout.js: Main layout component containing the application routes
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
  // State variables for managing decks, a specific deck, and a card
  const [decks, setDecks] = useState([]);
  const [deck, setDeck] = useState({});
  const [card, setCard] = useState([]);

  // Render the layout of the application
  return (
    <>
      {/* Display the application header */}
      <Header />
      {/* Main container for rendering different components based on the route */}
      <div className="container">
        {/* Switch component for handling different routes */}
        <Switch>
          {/* Home route: Display the home page and deck list */}
          <Route exact path="/">
            <Home decks={decks} setDecks={setDecks} />
            <DeckList decks={decks} setDecks={setDecks} />
          </Route>
          {/* Create Deck route: Display the create deck form */}
          <Route path="/decks/new">
            <CreateDeck />
          </Route>
          {/* View Deck route: Display the details of a specific deck */}
          <Route exact path="/decks/:deckId">
            <DeckView />
          </Route>
          {/* Study Deck route: Display the study page for a specific deck */}
          <Route path="/decks/:deckId/study">
            <DeckStudy />
          </Route>
          {/* Edit Deck route: Display the edit form for a specific deck */}
          <Route path="/decks/:deckId/edit">
            <DeckEdit deck={deck} setDeck={setDeck} />
          </Route>
          {/* Add Card route: Display the form for adding a card to a deck */}
          <Route path="/decks/:deckId/cards/new">
            <AddCard
              card={card}
              setCard={setCard}
              deck={deck}
              setDeck={setDeck}
            />
          </Route>
          {/* Edit Card route: Display the form for editing a specific card */}
          <Route exact path="/decks/:deckId/cards/:cardId/edit">
            <EditCard
              deck={deck}
              setDeck={setDeck}
              card={card}
              setCard={setCard}
            />
          </Route>
          {/* Default route: Display the Not Found page for unrecognized routes */}
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;

