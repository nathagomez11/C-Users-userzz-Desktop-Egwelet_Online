// frontend/src/pages/Product.js
import React, { useEffect, useState } from 'react';

function Product() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {products.map(p => (
          <div key={p.id} style={{ border: '1px solid #ccc', padding: '10px', width: '200px' }}>
            <img src={p.image} alt={p.name} style={{ width: '100%' }} />
            <h3>{p.name}</h3>
            <p>${p.price}</p>
            <p>{p.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Product;
