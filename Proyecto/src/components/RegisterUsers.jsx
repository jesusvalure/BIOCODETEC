import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importar el hook para navegar
import bcrypt from 'bcryptjs';

const RegisterUsers = () => {
  const navigate = useNavigate(); // Inicializar el hook
  const [formData, setFormData] = useState({
    nombreUsuario: "", // Nuevo campo para nombre de usuario
    contrasena: "", // Nuevo campo para contraseña
    apellidos: "",
    nombre: "",
    cedula: "",
    correo: "",
    telefono: "",
    edad: "",
    peso: "",
    altura: "",
    padecimientos: {
      cardiopatia: false,
      hipertension: false,
      asma: false,
      colesterol: false,
      ansiedad: false,
      depresion: false,
      anemia: false,
      obesidad: false,
      otro: "",
    },
  });

  const encryptPassword = async (password) => {
    const saltRounds = 10; // Nivel de complejidad del hash
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log("Hashed Password:", hashedPassword);
    return hashedPassword;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({
        ...formData,
        padecimientos: {
          ...formData.padecimientos,
          [name]: checked,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const hashedPassword = await encryptPassword(formData.contrasena);

    const updatedFormData = {
      ...formData,
      contrasena: hashedPassword, 
    };

    console.log("Usuario registrado con datos seguros:", updatedFormData);
  };

  const handleBack = () => {
    navigate("/"); // Redirigir al login
  };

  return (
    <div style={styles.formContainer}>
      <form onSubmit={handleSubmit} style={styles.formCard}>
        <div style={styles.formRow}>
          <div>
            <h3>Nuevo Usuario</h3>
            <label>Nombre de Usuario:</label>
            <input
              type="text"
              name="nombreUsuario"
              value={formData.nombreUsuario}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <label>Contraseña:</label>
            <input
              type="password"
              name="contrasena"
              value={formData.contrasena}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <label>Apellidos:</label>
            <input
              type="text"
              name="apellidos"
              value={formData.apellidos}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <label>Nombre:</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <label>Cédula:</label>
            <input
              type="text"
              name="cedula"
              value={formData.cedula}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <label>Correo:</label>
            <input
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <label>Teléfono:</label>
            <input
              type="text"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          <div>
            <h3>Información Personal</h3>
            <label>Edad:</label>
            <input
              type="number"
              name="edad"
              value={formData.edad}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <label>Peso:</label>
            <input
              type="number"
              name="peso"
              value={formData.peso}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <label>Altura:</label>
            <input
              type="number"
              name="altura"
              value={formData.altura}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
        </div>
        <div>
          <h3>Padecimientos</h3>
          <label>
            <input
              type="checkbox"
              name="cardiopatia"
              checked={formData.padecimientos.cardiopatia}
              onChange={handleChange}
            />{" "}
            Cardiopatía
          </label>
          <label>
            <input
              type="checkbox"
              name="hipertension"
              checked={formData.padecimientos.hipertension}
              onChange={handleChange}
            />{" "}
            Hipertensión
          </label>
          <label>
            <input
              type="checkbox"
              name="asma"
              checked={formData.padecimientos.asma}
              onChange={handleChange}
            />{" "}
            Asma
          </label>
          <label>
            <input
              type="checkbox"
              name="colesterol"
              checked={formData.padecimientos.colesterol}
              onChange={handleChange}
            />{" "}
            Colesterol Alto
          </label>
          <label>
            <input
              type="checkbox"
              name="ansiedad"
              checked={formData.padecimientos.ansiedad}
              onChange={handleChange}
            />{" "}
            Ansiedad
          </label>
          <label>
            <input
              type="checkbox"
              name="depresion"
              checked={formData.padecimientos.depresion}
              onChange={handleChange}
            />{" "}
            Depresión
          </label>
          <label>
            <input
              type="checkbox"
              name="anemia"
              checked={formData.padecimientos.anemia}
              onChange={handleChange}
            />{" "}
            Anemia
          </label>
          <label>
            <input
              type="checkbox"
              name="obesidad"
              checked={formData.padecimientos.obesidad}
              onChange={handleChange}
            />{" "}
            Obesidad
          </label>
          <label>Otro:</label>
          <input
            type="text"
            name="otro"
            value={formData.padecimientos.otro}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.buttonContainer}>
          <button type="submit" style={styles.btnSubmit}>
            Crear Usuario
          </button>
          <button type="button" onClick={handleBack} style={styles.btnBack}>
            Volver
          </button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  formContainer: {
    padding: "20px",
    backgroundColor: "#001d72",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  formCard: {
    backgroundColor: "white",
    color: "black",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    width: "60%",
  },
  formRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
  },
  input: {
    width: "100%",
    marginBottom: "10px",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    alignItems: "center",
  },
  buttonContainer: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },
  btnSubmit: {
    backgroundColor: "green",
    color: "white",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  btnBack: {
    backgroundColor: "gray",
    color: "white",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default RegisterUsers;
