import React, { useEffect, useState } from "react";

const ListaAnimales = () => {
    const [animales, setAnimales] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/animales") // Asegúrate de que esta URL sea correcta
            .then((response) => response.json())
            .then((data) => setAnimales(data))
            .catch((error) => console.error("Error al obtener los animales:", error));
    }, []);

    return (
        <div>
            <h2>Lista de Animales</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Especie</th>
                        <th>Dosis</th>
                    </tr>
                </thead>
                <tbody>
                    {animales.map((animal) => (
                        <tr key={animal._id}>
                            <td>{animal.idAnimal}</td>
                            <td>{animal.nombre}</td>
                            <td>{animal.especie}</td>
                            <td>{animal.dosis}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListaAnimales;
