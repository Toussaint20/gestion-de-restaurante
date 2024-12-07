import React from 'react';
import Login from './Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Home } from './Home';
import Inventario from './modulos/inventario/Inventario';



function App() {
  return (
    <div className="App">
      <Inventario /> {/* Aqui lo puse solamente para poeder verlo */}

    </div>
  );
}

export default App;