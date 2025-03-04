import React, { useState } from "react";

function Calculadora() {
  const [peso, setPeso] = useState("");
  const [dosis, setDosis] = useState(null);

  const calcularDosis = () => {
    if (!peso) return;
    const resultado = peso * 0.1; // Suponiendo que la dosis es 10% del peso
    setDosis(resultado);
  };

  return (
    <div>
      <h2>Calculadora de Dosis</h2>
      <input
        type="number"
        placeholder="Peso del animal (kg)"
        value={peso}
        onChange={(e) => setPeso(e.target.value)}
      />
      <button onClick={calcularDosis}>Calcular</button>
      {dosis !== null && <p>Dosis recomendada: {dosis} ml</p>}
    </div>
  );
}

export default Calculadora;
