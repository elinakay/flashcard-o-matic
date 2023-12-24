// Header.js: Component for rendering the application header
import React from "react";

function Header() {
  // Render the Header component
  return (
    <header className="jumbotron bg-dark">
      <div className="container text-white">
        <h1 className="display-4">Flashcard-o-matic</h1>
        <p className="lead">Discover The Flashcard Difference.</p>
      </div>
    </header>
  );
}

export default Header;

