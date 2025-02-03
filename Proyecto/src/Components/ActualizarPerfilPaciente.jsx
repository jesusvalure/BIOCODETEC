import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const paciente = location.state?.paciente;
  
  const [formData, setFormData] = useState({
    Nombre: paciente?.Nombre || "",
    Correo: paciente?.Correo || "",
    Celular: paciente?.Celular || "",
    Edad: paciente?.Edad || "",
    Peso: paciente?.Peso || "",
    Estatura: paciente?.Estatura || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/updatePatient", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Cedula: paciente.Cedula, ...formData }),
    });

    const data = await response.json();
    alert(data.message);
    if (response.ok) navigate("/perfil-paciente", { state: { paciente: { ...paciente, ...formData } } });
  };

  return (
    <div style={styles.background}>
      <div style={styles.container}>
        <h2>Actualizar Información</h2>
        <form onSubmit={handleSubmit}>
          {["Nombre", "Correo", "Celular", "Edad", "Peso", "Estatura"].map((field) => (
            <div key={field} style={styles.inputGroup}>
              <label>{field}</label>
              <input type="text" name={field} value={formData[field]} onChange={handleChange} />
            </div>
          ))}
          <button type="submit" style={styles.primaryButton}>Guardar Cambios</button>
        </form>
      </div>
    </div>
  );
};

// Estilos en línea
const styles = {
    background: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      width: "100vw",
      backgroundColor: "#373f4f",
    },
    container: {
      backgroundColor: "#d0dcf5",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      maxWidth: "600px",
      margin: "0 auto",
      fontFamily: "Arial, sans-serif",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottom: "1px solid #ccc",
      paddingBottom: "10px",
      marginBottom: "20px",
    },
    details: {
      display: "flex",
      justifyContent: "space-between",
    },
    column: {
      flex: 1,
      marginRight: "10px",
    },
    list: {
      listStyleType: "none",
      padding: 0,
    },
    primaryButton: {
      backgroundColor: "#4b5c7d",
      color: "white",
      border: "none",
      padding: "10px 15px",
      borderRadius: "5px",
      cursor: "pointer",
      marginRight: "10px",
    },
    secondaryButton: {
      backgroundColor: "#4b5c7d",
      color: "white",
      border: "none",
      padding: "10px 15px",
      borderRadius: "5px",
      cursor: "pointer",
    },
  };

export default UpdateProfile;
