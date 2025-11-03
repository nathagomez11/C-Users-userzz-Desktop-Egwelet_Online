// frontend/src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Welcome to Egwelet Online</h1>
      <p>Discover amazing products across categories.</p>
      <div>
        <Link to="/cart">
          <button>Go to Cart</button>
        </Link>
        <Link to="/admin">
          <button>Admin Dashboard</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
