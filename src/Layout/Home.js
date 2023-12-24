// Home.js: Component for rendering the home page
import React from "react";
import { useHistory } from "react-router-dom";

function Home() {
  let history = useHistory();

  // Navigate to the create deck page when the "+ Create" button is clicked
  function handleCreateDeck(event) {
    event.preventDefault();
    history.push("/decks/new");
  }

  // Render the Home component
  return (
    <div>
      <div>
        {/* Button to navigate to the create deck page */}
        <button
          type="button"
          className="btn btn-secondary m-2"
          onClick={handleCreateDeck}
        >
          + Create
        </button>
      </div>
    </div>
  );
}

export default Home;

