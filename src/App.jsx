import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './components/index';
import Home from './components/home';
import Catalogo from './components/catalogo';
import Negocio from './components/negocio';
import AgregarProducto from './components/agregarProducto';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />}>          
          <Route index element={<Home />} /> 
          <Route path="home" element={<Home />} />
          <Route path="catalogo" element={<Catalogo />} />
          <Route path="agregarProducto" element={<AgregarProducto />} />
          <Route path="negocio" element={<Negocio />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;