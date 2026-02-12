const API_URL = import.meta.env.VITE_API_URL;

export const getProducts = async () => {
  try {
    const response = await fetch(`${API_URL}/products`);
    
    if (!response.ok) {
      throw new Error('Error al conectar con el servidor');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error obteniendo productos:", error);
    throw error; 
  }
};

export const createProduct = async (productData) => {
  try {    
    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      body: productData, // Enviamos el FormData directo
    });

    if (!response.ok) {
      throw new Error('Error al crear el producto');
    }

    return await response.json();
  } catch (error) {
    console.error("Error en createProduct:", error);
    throw error;
  }
};