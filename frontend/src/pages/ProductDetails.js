// frontend/src/pages/ProductDetails.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(err => console.log(err));
  }, [id]);

  if (!product) return <p>Loading product details...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <Link to="/products">
        <button style={{ marginBottom: '20px' }}>← Back to Products</button>
      </Link>
      <div style={{ display: 'flex', gap: '30px' }}>
        <img
          src={product.image}
          alt={product.name}
          style={{ width: '300px', borderRadius: '10px' }}
        />
        <div>
          <h1>{product.name}</h1>
          <h3 style={{ color: '#ff6600' }}>${product.price}</h3>
          <p>{product.description}</p>
          <button style={{
            backgroundColor: '#ff6600',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
