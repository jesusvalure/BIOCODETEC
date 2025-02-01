import { useState } from "react";
import "../assets/Style.css";

const RegistrarEmpleados = () => {
    const [formData, setFormData] = useState({
        Cedula: "",
        Nombre: "",
        Correo: "",
        Telefono: "",
        Usuario: "",
        Contrasena: "",
        Tipo: "Doctor",
        Especialidad: ""
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Si es recepcionista, no necesita Especialidad
        const payload = { ...formData };
        if (formData.Tipo === "Recepcionista") {
            delete payload.Especialidad;
        }

        try {
            const response = await fetch("http://localhost:5000/registerEmployee", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage(data.message);
                setFormData({
                    Cedula: "",
                    Nombre: "",
                    Correo: "",
                    Telefono: "",
                    Usuario: "",
                    Contrasena: "",
                    Tipo: "Doctor",
                    Especialidad: ""
                });
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            setMessage("Error al registrar empleado");
        }
    };

    return (
        <div>
            <h2>Registrar Empleados</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="Cedula" placeholder="Cédula" value={formData.Cedula} onChange={handleChange} required />
                <input type="text" name="Nombre" placeholder="Nombre" value={formData.Nombre} onChange={handleChange} required />
                <input type="email" name="Correo" placeholder="Correo" value={formData.Correo} onChange={handleChange} required />
                <input type="text" name="Telefono" placeholder="Teléfono" value={formData.Telefono} onChange={handleChange} required />
                <input type="text" name="Usuario" placeholder="Usuario" value={formData.Usuario} onChange={handleChange} required />
                <input type="password" name="Contrasena" placeholder="Contraseña" value={formData.Contrasena} onChange={handleChange} required />

                <select name="Tipo" value={formData.Tipo} onChange={handleChange}>
                    <option value="Doctor">Doctor</option>
                    <option value="Recepcionista">Recepcionista</option>
                </select>

                {formData.Tipo === "Doctor" && (
                    <input type="text" name="Especialidad" placeholder="Especialidad" value={formData.Especialidad} onChange={handleChange} required />
                )}

                <button type="submit">Registrar</button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
};

export default RegistrarEmpleados;
