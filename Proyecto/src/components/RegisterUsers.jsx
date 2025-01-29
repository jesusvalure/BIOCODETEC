import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importar el hook para navegar

const RegisterUsers = () => {
  const navigate = useNavigate(); // Inicializar el hook
  const [formData, setFormData] = useState({
    Nombre: "",
    Cedula: "",
    Celular: "",
    Correo: "",
    Edad: "",
    Peso: "",
    Estatura: "",
    Padecimientos: {
      Cardiopatia: false,
      Hipertension: false,
      Asma: false,
      Colesterol: false,
      Ansiedad: false,
      Depresion: false,
      Anemia: false,
      Obesidad: false,
      Otro: "",
    },
    Usuario: "",
    Contrasena: "",
    Tipo : 1,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Manejo de cambios de campos
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({
        ...formData,
        Padecimientos: {
          ...formData.Padecimientos,
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

  // Manejo del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Limpiar posibles errores
    setSuccess(""); // Limpiar posibles mensajes de éxito

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData), // Enviar todo el objeto formData
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error en el registro");
      }

      setSuccess("✅ Usuario registrado con éxito");
      setFormData({
        Nombre: "",
        Cedula: "",
        Celular: "",
        Correo: "",
        Edad: "",
        Peso: "",
        Estatura: "",
        Padecimientos: {
          Cardiopatia: false,
          Hipertension: false,
          Asma: false,
          Colesterol: false,
          Ansiedad: false,
          Depresion: false,
          Anemia: false,
          Obesidad: false,
          Otro: "",
        },
        Usuario: "",
        Contrasena: "",
        Tipo : 1,
      });
    } catch (err) {
      setError(err.message);
    }
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
            <label>Nombre:</label>
            <input
              type="text"
              name="Nombre"
              value={formData.Nombre}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <label>Cédula:</label>
            <input
              type="text"
              name="Cedula"
              value={formData.Cedula}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <label>Celular:</label>
            <input
              type="text"
              name="Celular"
              value={formData.Celular}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <label>Correo:</label>
            <input
              type="email"
              name="Correo"
              value={formData.Correo}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <label>Usuario:</label>
            <input
              type="text"
              name="Usuario"
              value={formData.Usuario}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <label>Contraseña:</label>
            <input
              type="password"
              name="Contrasena"
              value={formData.Contrasena}
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
              name="Edad"
              value={formData.Edad}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <label>Peso:</label>
            <input
              type="number"
              name="Peso"
              value={formData.Peso}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <label>Estatura:</label>
            <input
              type="number"
              name="Estatura"
              value={formData.Estatura}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
        </div>
        <div>
          <h3>Padecimientos</h3>
          {Object.keys(formData.Padecimientos).map((padecimiento) => (
            <label key={padecimiento}>
              <input
                type="checkbox"
                name={padecimiento}
                checked={formData.Padecimientos[padecimiento]}
                onChange={handleChange}
              />{" "}
              {padecimiento}
            </label>
          ))}
        </div>
        {error && <div style={{ color: "red" }}>{error}</div>}
        {success && <div style={{ color: "green" }}>{success}</div>}
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
