import ComposeEmail from "./components/compose-email";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./components/home-page";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <Route path="/compose" render={() => <ComposeEmail />} />
        <Route path="/list" render={() => <h1>List emails </h1>} />
        <Route path="/" exact render={() => <HomePage />} />
      </div>
    </Router>
  );
}

export default App;
