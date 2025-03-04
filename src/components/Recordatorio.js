import React, { useState, useEffect } from "react";

function Recordatorio() {
  const [medicamento, setMedicamento] = useState("");
  const [fecha, setFecha] = useState("");
  const [recordatorios, setRecordatorios] = useState([]);

  // Cargar los recordatorios desde localStorage cuando la página carga
  useEffect(() => {
    const datosGuardados = localStorage.getItem("recordatorios");
    if (datosGuardados) {
      setRecordatorios(JSON.parse(datosGuardados));
    }
  }, []);

  // Guardar en localStorage cada vez que se actualicen los recordatorios
  useEffect(() => {
    localStorage.setItem("recordatorios", JSON.stringify(recordatorios));
  }, [recordatorios]);

  const agregarRecordatorio = () => {
    if (!medicamento || !fecha) return;

    const nuevoRecordatorio = { medicamento, fecha };
    const nuevosRecordatorios = [...recordatorios, nuevoRecordatorio];

    setRecordatorios(nuevosRecordatorios);
    localStorage.setItem("recordatorios", JSON.stringify(nuevosRecordatorios));

    // Limpiar los campos
    setMedicamento("");
    setFecha("");
  };

  const eliminarRecordatorio = (index) => {
    const nuevosRecordatorios = recordatorios.filter((_, i) => i !== index);
    setRecordatorios(nuevosRecordatorios);
    localStorage.setItem("recordatorios", JSON.stringify(nuevosRecordatorios));
  };

  return (
    <div>
      <h2>Recordatorio de Medicamentos</h2>
      <input
        type="text"
        placeholder="Nombre del medicamento"
        value={medicamento}
        onChange={(e) => setMedicamento(e.target.value)}
      />
      <input
        type="date"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
      />
      <button onClick={agregarRecordatorio}>Agregar Recordatorio</button>

      <ul>
        {recordatorios.map((rec, index) => (
          <li key={index}>
            {rec.medicamento} - {rec.fecha} 
            <button onClick={() => eliminarRecordatorio(index)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Recordatorio;
