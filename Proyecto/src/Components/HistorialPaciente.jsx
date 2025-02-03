import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const AppointmentHistory = () => {
  const location = useLocation();
  const paciente = location.state?.paciente;
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/getPatientAppointments/${paciente.Cedula}`)
      .then(response => response.json())
      .then(data => setHistorial(data))
      .catch(error => console.error("Error:", error));
  }, [paciente.Cedula]);

  return (
    <div style={styles.background}>
      <div style={styles.container}>
        <h2>Historial de Citas</h2>
        {historial.length > 0 ? (
          <ul style={styles.list}>
            {historial.map((cita, index) => (
              <li key={index}>
                <p>Fecha: {cita.Fecha}</p>
                <p>Doctor: {cita.Doctor}</p>
                <p>Motivo: {cita.Motivo}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay citas previas.</p>
        )}
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

export default AppointmentHistory;
