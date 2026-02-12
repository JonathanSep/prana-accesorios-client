import { useState } from 'react';
import { Modal, Row, Col, Button } from 'react-bootstrap'; 

export function ProductoCard({ imagen, titulo, precio, descripcion }) {
  const [show, setShow] = useState(false);

  const handleOpen = () => setShow(true);
  const handleClose = (e) => {
    e?.stopPropagation();
    setShow(false);
  };

  return (
    <>
      <div className="producto-card" onClick={handleOpen}>
        <div className="producto-card__img-container">
            <img src={imagen} alt={titulo} className="producto-card__img" />
        </div>
        
        <div className="producto-card__info">
          <div className="producto-card__text-content">
            <h3 className="producto-card__titulo">{titulo}</h3>
            <p className="producto-card__precio">{precio}</p>
          </div>
          <button className="producto-card__boton">
            Ver detalles
          </button>
        </div>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        size="lg" 
        centered
        dialogClassName="modal-producto-detalle"
      >
        <Modal.Header closeButton style={{ borderBottom: 'none' }}>
        </Modal.Header>
        
        <Modal.Body className="p-4">
          <Row>
            <Col md={6} className="d-flex align-items-center justify-content-center mb-3 mb-md-0">
              <img
                src={imagen}
                alt={titulo}
                style={{ 
                    width: '100%', 
                    borderRadius: '8px', 
                    objectFit: 'cover',
                    maxHeight: '400px'
                }}
              />
            </Col>

            <Col md={6}>
              <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--color-wine-700)' }}>
                {titulo}
              </h2>
              
              <h4 className="my-3" style={{ fontFamily: 'var(--font-primary)', fontWeight: 'bold' }}>
                {precio}
              </h4>

              <hr />

              <p style={{ fontFamily: 'var(--font-primary)', lineHeight: '1.6', color: '#555' }}>
                {descripcion}
              </p>

              <div className="mt-4">
                 <Button 
                    variant="dark" 
                    style={{ backgroundColor: 'var(--bg-panel)', border: 'none', width: '100%' }}
                    onClick={() => alert("¡Función de agregar al carrito pendiente!")}
                 >
                    Añadir al Carrito
                 </Button>
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
}