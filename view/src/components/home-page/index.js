import { Link } from "react-router-dom";

const HomePage = () => (
  <>
    <h1>Welcome </h1>
    <ul>
      <li>
        <Link to="/compose">Compose</Link>
      </li>
      <li>
        <Link to="/list">View recent emails</Link>
      </li>
    </ul>
  </>
);

export default HomePage;
