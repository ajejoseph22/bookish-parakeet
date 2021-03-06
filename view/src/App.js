import ComposeEmail from "./components/compose-email";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./components/home-page";

import "./App.css";
import EmailList from "./components/email-list";

function App() {
  return (
    <Router>
      <div className="app">
        <Route path="/compose" render={() => <ComposeEmail />} />
        <Route path="/list" render={() => <EmailList />} />
        <Route path="/" exact render={() => <HomePage />} />
      </div>
    </Router>
  );
}

export default App;
