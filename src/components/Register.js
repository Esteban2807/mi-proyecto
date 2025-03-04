import React, { useState } from "react";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            
            if (response.ok) {
                setMessage("✅ Registro exitoso. Ahora puedes iniciar sesión.");
            } else {
                setMessage("❌ Error: " + data.mensaje);
            }
        } catch (error) {
            setMessage("❌ Error al conectar con el servidor");
        }
    };

    return (
        <div>
            <h2>Registro de Usuario</h2>
            <form onSubmit={handleRegister}>
                <input 
                    type="email" 
                    placeholder="Correo electrónico" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <br />
                <input 
                    type="password" 
                    placeholder="Contraseña" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <br />
                <button type="submit">Registrarse</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Register;
