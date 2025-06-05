import React from "react";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => (
  <div className="text-center">
    <h1>Welcome to User & Car Management</h1>
    <p className="lead">Use the navigation above to manage users or cars.</p>
    <Link to="/users" className="btn btn-primary me-2">
      Manage Users
    </Link>
    <Link to="/cars" className="btn btn-secondary">
      Manage Cars
    </Link>
  </div>
);

export default HomePage;
