import React from "react";
import Calculadora from "./components/Calculadora";
import Recordatorio from "./components/Recordatorio";
import ListaAnimales from "./components/ListaAnimales";
import FormularioAnimal from "./components/FormularioAnimal";
import Login from "./components/login";
import Register from "./components/Register";


function App() {
  return (
    <div>
      <div>
      <h1>Bienvenido a la Calculadora y Recordatorio de Medicamentos</h1>
      <Calculadora />
      <Recordatorio />
      </div>
      <div>
            <h1>Registro de Animales</h1>
            <ListaAnimales />
    </div>

            <div>
        <h1>Gestión de Animales</h1>
        <FormularioAnimal />
    </div>
    <div>
        <Login />
        </div>

        <div>
          <Register />

        </div>

       </div>
       
  );
}






export default App;
