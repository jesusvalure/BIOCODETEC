import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ClientProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pacienteLogueado = location.state?.paciente;

  if (!pacienteLogueado) {
    return <p>Cargando datos...</p>;
  }

  return (
    <div style={styles.background}>
      <div style={styles.container}>
        <div style={styles.header}>
          <div>
            <h2>{pacienteLogueado.Nombre}</h2>
            <p>Cédula: {pacienteLogueado.Cedula}</p>
            <p>Correo: {pacienteLogueado.Correo}</p>
            <p>Teléfono: {pacienteLogueado.Celular}</p>
          </div>
          <div>
            <button
              style={styles.primaryButton}
              onClick={() => navigate("/update-profile", { state: { paciente: pacienteLogueado } })}
            >
              Actualizar
            </button>
            <button
              style={styles.secondaryButton}
              onClick={() => navigate("/appointment-history", { state: { paciente: pacienteLogueado } })}
            >
              Historial
            </button>
          </div>
        </div>

        <div style={styles.details}>
          <div style={styles.column}>
            <h3>Información General</h3>
            <p>Edad: {pacienteLogueado.Edad} años</p>
            <p>Peso: {pacienteLogueado.Peso} kg</p>
            <p>Estatura: {pacienteLogueado.Estatura} m</p>
          </div>
          <div style={styles.column}>
            <h3>Padecimientos</h3>
            <ul style={styles.list}>
              {pacienteLogueado.Padecimientos.map((condicion, index) => (
                <li key={index}>{condicion}</li>
              ))}
            </ul>
          </div>
        </div>
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

export default ClientProfile;
