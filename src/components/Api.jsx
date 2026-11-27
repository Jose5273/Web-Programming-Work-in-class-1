import { useState, useEffect } from "react";
import "./Api.css";

function Api({ onBack }) {
  // State: product list, search text, loading flag and error message
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // useEffect with [] runs only once, when the component is shown
  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=30")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Invalid response");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch(() => {
        setError("Could not load the products. Check your connection.");
        setLoading(false);
      });
  }, []);

  // Filter by title, ignoring uppercase and lowercase
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  // Decide what to show using if/else
  let content;
  if (loading) {
    content = <p className="api-message">Loading...</p>;
  } else if (error !== "") {
    content = <p className="api-message api-error">{error}</p>;
  } else if (filteredProducts.length === 0) {
    content = <p className="api-message">No products match your search.</p>;
  } else {
    content = (
      <div className="api-grid">
        {filteredProducts.map((product) => (
          <div className="api-card" key={product.id}>
            <img src={product.thumbnail} alt={product.title} />
            <h3>{product.title}</h3>
            <p>{product.description}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="api-panel">
      <button className="api-back" onClick={() => onBack()}>
        Back
      </button>

      <input
        className="api-search"
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      {content}
    </div>
  );
}

export default Api;
