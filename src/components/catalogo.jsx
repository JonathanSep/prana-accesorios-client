import { useEffect, useState } from 'react';
import { Container } from "react-bootstrap";
import { ProductoCard } from './productoCard'; // Importación correcta (misma carpeta)
import { getProducts } from '../services/productService'; // Importación correcta (subir un nivel y entrar a services)

function Catalogo() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error cargando el catálogo:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCatalog();
  }, []);

  return (
    <Container>
      <h1>Catalogo</h1>

      {loading ? (
        <div className="text-center p-5">
          {/* poner spinner */}
          <p>Cargando productos de Prana...</p>
        </div>
      ) : (
        <div className="catalogo-grid">
          {products.length > 0 ? (
            products.map((prod) => (
              <ProductoCard 
                key={prod._id}             
                titulo={prod.name}         
                precio={`$${prod.price}`}  
                imagen={prod.imageUrl}     
                descripcion={prod.description || "Descripción no disponible por el momento."}
              />
            ))
          ) : (
            <p>No hay productos disponibles aún.</p>
          )}
        </div>
      )}
    </Container>
  );
}

export default Catalogo;