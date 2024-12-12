import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Inventario from './modulos/inventario/Inventario';
import Menu from './modulos/menu/Menu';
import Mesas from './modulos/mesas/Mesas';
import Pedidos from './modulos/pedidos/Pedidos';
import Home from './modulos/Home/Home';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inventario" element={<Inventario />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/mesas" element={<Mesas />} />
        <Route path="/pedidos" element={<Pedidos />} />
      </Routes>
    </Router>
  );
};

export default App;
