// App.js: Main application component
import React from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "./Layout";
import "./App.css";


function App() {
  // Render the main application component (Layout)
  return (
    <div className="app-routes">
      <Switch>
        <Route path="/">
          <Layout />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

