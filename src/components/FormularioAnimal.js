import React, { useState } from "react";

const FormularioAnimal = () => {
    const [formData, setFormData] = useState({
        idAnimal: "",
        nombre: "",
        especie: "",
        dosis: "",
        fechaAplicacion: ""
    });
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token"); // Obtener el token del almacenamiento local
        if (!token) {
            alert("No estás autenticado. Inicia sesión primero.");
            return;
        }
        try {
            const response = await fetch("http://localhost:5000/animales/agregar", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` // Agregar el token en la cabecera
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            alert(data.mensaje || "Animal registrado con éxito");
        } catch (error) {
            console.error("Error al registrar el animal:", error);
            alert("Hubo un error al registrar el animal");
        }
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <label>ID:</label>
            <input type="text" name="idAnimal" value={formData.idAnimal} onChange={handleChange} required />
            
            <label>Nombre:</label>
            <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
            
            <label>Especie:</label>
            <input type="text" name="especie" value={formData.especie} onChange={handleChange} required />
            
            <label>Dosis:</label>
            <input type="text" name="dosis" value={formData.dosis} onChange={handleChange} required />
            
            <label>Fecha de Aplicación:</label>
            <input type="date" name="fechaAplicacion" value={formData.fechaAplicacion} onChange={handleChange} required />
            
            <button type="submit">Registrar Animal</button>
        </form>
    );
};

export default FormularioAnimal;
