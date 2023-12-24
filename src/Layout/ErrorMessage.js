// ErrorMessage.js: Component for displaying error messages
import React from "react";

export const ErrorMessage = ({ error, children }) => (
  <main className="container">
    {/* Display the error message in red */}
    <p style={{ color: "red" }}>ERROR: {error.message}</p>
    {children}
  </main>
);

export default ErrorMessage;

