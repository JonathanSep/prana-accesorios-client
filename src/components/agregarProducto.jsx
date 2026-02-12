import { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { createProduct } from '../services/productService';

const AgregarProducto = ({ onProductAdded }) => {
  
  // 1. ESTADO UNIFICADO PARA TEXTOS (Borré las variables sueltas)
  const [data, setData] = useState({
    name: '',
    price: '',
    category: '',
    description: ''
  });

  // 2. ESTADO SOLO PARA EL ARCHIVO
  const [file, setFile] = useState(null);
  
  const [mensaje, setMensaje] = useState(null);

  // Maneja los inputs de texto
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    });
  };

  // Maneja el input de archivo
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 3. CREAMOS EL PAQUETE DE DATOS
    const formDataToSend = new FormData();
    
    // Usamos 'data' (el estado unificado) en lugar de variables sueltas
    formDataToSend.append('name', data.name);
    formDataToSend.append('price', data.price);
    formDataToSend.append('category', data.category);
    formDataToSend.append('description', data.description);
    
    // Agregamos el archivo si existe
    if (file) {
        formDataToSend.append('image', file); 
    }

    try {
      await createProduct(formDataToSend);
      setMensaje({ tipo: 'success', texto: '¡Producto creado con éxito!' });
      
      // 4. LIMPIEZA CORRECTA
      setData({ name: '', price: '', category: '', description: '' });
      setFile(null); // Limpiamos el estado del archivo
      
      // Truco para limpiar visualmente el input type="file"
      document.getElementById('fileInput').value = ""; 

      if (onProductAdded) onProductAdded();

    } catch (error) {
      console.error(error);
      setMensaje({ tipo: 'danger', texto: 'Error al subir. Revisa la consola.' });
    }
  };

  return (
    <Container 
      className="mt-5 mb-5 p-4 border rounded shadow-sm bg-white text-dark" 
      style={{ color: 'black', textAlign: 'left' }}
    >
      <h3>Agregar Nuevo Producto</h3>
      
      {mensaje && <Alert variant={mensaje.tipo}>{mensaje.texto}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre del Producto</Form.Label>
          <Form.Control 
            type="text" 
            name="name" 
            value={data.name} 
            onChange={handleChange} 
            required 
            placeholder="Ej: Aros de Plata"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Precio</Form.Label>
          <Form.Control 
            type="number" 
            name="price" 
            value={data.price} 
            onChange={handleChange} 
            required 
            placeholder="Ej: 15000"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Imagen del Producto</Form.Label>
          <Form.Control 
            id="fileInput" // Agregué este ID para poder limpiarlo al enviar
            type="file" 
            onChange={handleFileChange} 
            accept="image/*"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Categoría</Form.Label>
          <Form.Control 
            type="text" 
            name="category" 
            value={data.category} 
            onChange={handleChange} 
            placeholder="Ej: Aros, Collares..."
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Descripción / Detalle</Form.Label>
          <Form.Control 
            as="textarea" 
            rows={3}      
            name="description" 
            value={data.description} 
            onChange={handleChange} 
            placeholder="Ej: Aros de plata 925..."
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Guardar Producto
        </Button>
      </Form>
    </Container>
  );
};

export default AgregarProducto;