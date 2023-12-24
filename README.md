# Flashcard-o-matic

Welcome to Flashcard-o-matic! This is a web application that allows you to create, view, study, and manage decks of flashcards. You can add cards to your decks, study them, edit their content, and more.

## Table of Contents

- [AddCard Component](#addcard-component)
- [Card Component](#card-component)
- [CardForm Component](#cardform-component)
- [EditCard Component](#editcard-component)
- [NotEnoughCards Component](#notenoughcards-component)
- [CreateDeck Component](#createdeck-component)
- [Deck Component](#deck-component)
- [DeckEdit Component](#deckedit-component)
- [DeckList Component](#decklist-component)
- [DeckStudy Component](#deckstudy-component)
- [DeckView Component](#deckview-component)
- [ErrorMessage Component](#errormessage-component)
- [Header Component](#header-component)
- [Home Component](#home-component)
- [NotFound Component](#notfound-component)
- [Layout Component](#layout-component)
- [App Component](#app-component)

---

## AddCard Component

The `AddCard` component is responsible for adding new cards to a specific deck. It uses the `CardForm` component to capture input for the front and back sides of the card. It also provides breadcrumb navigation and allows users to navigate back to the deck.

### Usage

```javascript
// Import the AddCard component
import AddCard from "./Cards/AddCard";

// Example usage within a route
<Route path="/decks/:deckId/cards/new">
  <AddCard card={card} setCard={setCard} deck={deck} setDeck={setDeck} />
</Route>
```

---

## Card Component

The `Card` component is used to study cards within a deck. It displays the front and back sides of a card, allows flipping between them, and provides a "Next" button to move to the next card. If the last card is reached, it prompts the user to restart or return to the home page.

### Usage

```javascript
// Import the Card component
import Card from "./Cards/Card";

// Example usage within a route
<Route path="/decks/:deckId/study">
  <Card deck={deck} />
</Route>
```

---

## CardForm Component

The `CardForm` component is a form used to capture input for the front and back sides of a flashcard. It includes input fields for the user to enter the content of the card and buttons for saving or canceling the card creation.

### Usage

```javascript
// Import the CardForm component
import CardForm from "./Cards/CardForm";

// Example usage within a component
<CardForm
  changeFront={changeFront}
  changeBack={changeBack}
  handleSave={handleSave}
  handleDoneCancel={handleDone}
  cardValueFront={card.front}
  cardValueBack={card.back}
/>
```

---

## EditCard Component

The `EditCard` component allows users to edit the content of an existing flashcard within a deck. It uses the `CardForm` component for capturing the updated card content and provides breadcrumb navigation.

### Usage

```javascript
// Import the EditCard component
import EditCard from "./Cards/EditCard";

// Example usage within a route
<Route path="/decks/:deckId/cards/:cardId/edit">
  <EditCard deck={deck} setDeck={setDeck} card={card} setCard={setCard} />
</Route>
```

---

## NotEnoughCards Component

The `NotEnoughCards` component is displayed when there are fewer than three cards in a deck, making it insufficient for studying. It prompts the user to add more cards to the deck.

### Usage

```javascript
// Import the NotEnoughCards component
import NotEnoughCards from "./Cards/NotEnoughCards";

// Example usage within a component
<NotEnoughCards deck={deck} />
```

---

## CreateDeck Component

The `CreateDeck` component allows users to create a new deck by providing a name and description. It includes form input fields for capturing the deck details and buttons for submitting, canceling, and navigating back to the home page.

### Usage

```javascript
// Import the CreateDeck component
import CreateDeck from "./Decks/CreateDeck";

// Example usage within a route
<Route path="/decks/new">
  <CreateDeck />
</Route>
```

---

## Deck Component

The `Deck` component represents a deck of flashcards. It displays the deck name, description, and the number of cards it contains. Users can view, study, or delete the deck. It uses breadcrumb navigation for easy navigation.

### Usage

```javascript
// Import the Deck component
import Deck from "./Decks/Deck";

// Example usage within a component
<Deck deck={deck} />
```

---

## DeckEdit Component

The `DeckEdit` component allows users to edit the name and description of an existing deck. It uses form input fields for capturing the updated deck details and includes buttons for saving changes or canceling the edit.

### Usage

```javascript
// Import the DeckEdit component
import DeckEdit from "./Decks/DeckEdit";

// Example usage within a route
<Route path="/decks/:deckId/edit">
  <DeckEdit deck={deck} setDeck={setDeck} />
</Route>
```

---

## DeckList Component

The `DeckList` component displays a list of decks. It fetches and lists all available decks, and users can click on individual decks to view or study them. If there's an error loading the decks, it displays an error message.

### Usage

```javascript
// Import the DeckList component
import DeckList from "./Decks/DeckList";

// Example usage within a component
<DeckList />
```

---

## DeckStudy Component

The `DeckStudy` component allows users to study the cards within a deck. It displays breadcrumb navigation, the deck name, and either the flashcards for studying or a message indicating that there are not enough cards to study.

### Usage

```javascript
// Import the DeckStudy component
import DeckStudy from "./Decks/DeckStudy";

// Example usage within a route
<Route path="/decks/:deckId/study">
  <DeckStudy />
</Route>
```

---

## DeckView Component

The `DeckView` component displays detailed information about a deck, including its name, description, and a list of cards. Users can edit the deck, study its cards, add new cards, or delete the entire deck.

### Usage

```javascript
// Import the DeckView component
import DeckView from "./Decks/DeckView";

// Example usage within a route
<Route path="/decks/:deckId">
  <DeckView />
</Route>
```

---

## ErrorMessage Component

The `ErrorMessage` component is a generic component for displaying error messages. It takes an `error` prop and an optional `children` prop for additional content or actions.

### Usage

```javascript
// Import the ErrorMessage component
import ErrorMessage from "./ErrorMessage";

// Example usage within a component
<ErrorMessage error={error}>
  <p>
    <Link to="/">Return Home</Link>
  </p>
</ErrorMessage>
```

---

## Header Component

The `Header` component displays the header of the application, including the title and

 a brief description.

### Usage

```javascript
// Import the Header component
import Header from "./Header";

// Example usage within a component
<Header />
```

---

## Home Component

The `Home` component represents the home page of the application. It includes a button to create a new deck.

### Usage

```javascript
// Import the Home component
import Home from "./Home";

// Example usage within a component
<Home />
```

---

## NotFound Component

The `NotFound` component is displayed when a route is not found. It simply shows a "Not Found" message.

### Usage

```javascript
// Import the NotFound component
import NotFound from "./NotFound";

// Example usage within a component
<NotFound />
```

---

## Layout Component

The `Layout` component serves as a wrapper for the main content of the application. It includes the `Header` and handles routing based on the current URL path.

### Usage

```javascript
// Import the Layout component
import Layout from "./Layout";

// Example usage within a component
<Layout />
```

---

## App Component

The `App` component is the top-level component that wraps the entire application. It uses the `BrowserRouter` to handle routing.

### Usage

```javascript
// Import the App component
import App from "./App";

// Example usage within a component
<App />
```

---

Thank you for exploring the Flashcard-o-matic application! If you have any questions or feedback, feel free to reach out. Happy studying!
