import { useState, useEffect } from "react";
import "./Api.css";

function Api({ onBack }) {
  // Estados: lista de productos, texto de búsqueda, carga y error
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // useEffect con [] se ejecuta una sola vez, al mostrar el componente
  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=30")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Respuesta no válida");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch(() => {
        setError("No se pudieron cargar los productos. Revisa tu conexión.");
        setLoading(false);
      });
  }, []);

  // Filtramos por título sin distinguir mayúsculas y minúsculas
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  // Decidimos qué mostrar con if/else
  let content;
  if (loading) {
    content = <p className="api-message">Cargando...</p>;
  } else if (error !== "") {
    content = <p className="api-message api-error">{error}</p>;
  } else if (filteredProducts.length === 0) {
    content = <p className="api-message">No hay productos que coincidan.</p>;
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
        placeholder="Buscar..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      {content}
    </div>
  );
}

export default Api;
