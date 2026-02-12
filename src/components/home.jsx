import { useEffect, useState } from 'react';
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom"; // Para el botón de "Ver más"
import { Carruseles } from "./carousels";
import { ProductoCard } from './productoCard'; // Usamos la misma tarjeta del catálogo
import { getProducts } from '../services/productService';
import { Separador } from "./separador";

function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const data = await getProducts();
        setFeaturedProducts(data.slice(0, 3)); 
      } catch (error) {
        console.error("Error cargando destacados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  return (
    <Container className="home__div-container">
                  
      {/* Carrusel */}
      <Carruseles />
      
      <Separador />

      {/* Sección de Destacados */}
      <div className="my-5">
        <h2 className="text-center mb-4" style={{ fontFamily: 'var(--font-primary)' }}>
          Últimos Lanzamientos
        </h2>

        {loading ? (
          <p className="text-center">Cargando novedades...</p>
        ) : (
          <div className="catalogo-grid">
            {featuredProducts.length > 0 ? (
              featuredProducts.map((prod) => (
                <ProductoCard 
                  key={prod._id}
                  titulo={prod.name}
                  precio={`$${prod.price}`}
                  imagen={prod.imageUrl}
                  descripcion={prod.description || "Descripción no disponible por el momento."}  
                />
              ))
            ) : (
              <p className="text-center w-100">Pronto tendremos novedades para ti.</p>
            )}
          </div>
        )}

        {/* Botón para ver todo el catálogo */}
        <div className="text-center mt-5">
          <Link to="/catalogo">
            <Button variant="dark" size="lg" style={{ backgroundColor: 'var(--bg-panel)', border: 'none' }}>
              Ver Colección Completa
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
}

export default Home;