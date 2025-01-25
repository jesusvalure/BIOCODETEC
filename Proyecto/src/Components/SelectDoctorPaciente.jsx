import React, { useState } from "react";
import doctors from '../Data/doctors.json';
// import Styles from './SelectDoctorPaciente.css';

const App = () => {
  const [especialidad, setEspecialidad] = useState("");
  const [doctor, setDoctor] = useState("");
  const [doctoresFiltrados, setDoctoresFiltrados] = useState([]);

  // Obtener las especialidades únicas del JSON
  const especialidades = [...new Set(doctors.map((doc) => doc.Especialidad))];

  const handleEspecialidadChange = (e) => {
    const selectedEspecialidad = e.target.value;
    setEspecialidad(selectedEspecialidad);

    // Filtrar doctores por la especialidad seleccionada
    setDoctoresFiltrados(
      doctors.filter((doc) => doc.Especialidad === selectedEspecialidad)
    );
    setDoctor("");
  };

  const handleDoctorChange = (e) => {
    setDoctor(e.target.value);
  };

  const handleAceptar = () => {
    if (!especialidad) {
      alert("Por favor, selecciona una especialidad antes de continuar.");
      return;
    }
    if (!doctor) {
      alert("Por favor, selecciona un doctor antes de continuar.");
      return;
    }
    alert(`Especialidad: ${especialidad}\nDoctor: ${doctor}`);
  };

  const handleVolver = () => {
    alert("Volviendo a la pantalla anterior.");
  };

  return (
    <div style={styles.background}>
      <div style={styles.container}>
        <h2 style={styles.title}>Registrar cita</h2>
        <div style={styles.field}>
          <label style={styles.label}>Especialidad:</label>
          <select
            value={especialidad}
            onChange={handleEspecialidadChange}
            style={styles.select}
          >
            <option value="">-- Selecciona una especialidad --</option>
            {especialidades.map((esp, index) => (
              <option key={index} value={esp}>
                {esp}
              </option>
            ))}
          </select>
        </div>
        <div style={styles.field}>
          <label style={styles.label}>Doctor:</label>
          <select
            value={doctor}
            onChange={handleDoctorChange}
            style={styles.select}
            disabled={!especialidad}
          >
            <option value="">-- Selecciona un doctor --</option>
            {doctoresFiltrados.map((doc, index) => (
              <option key={index} value={doc.Nombre}>
                {doc.Nombre}
              </option>
            ))}
          </select>
        </div>
        <div style={styles.buttons}>
          <button onClick={handleVolver} style={styles.button}>
            Atrás
          </button>
          <button onClick={handleAceptar} style={styles.button}>
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  background: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#090063", // Azul oscuro
  },
  container: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
    width: "300px",
  },
  title: {
    marginBottom: "20px",
    fontSize: "18px",
    fontWeight: "bold",
  },
  field: {
    marginBottom: "15px",
    textAlign: "left",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
  },
  select: {
    width: "100%",
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  button: {
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "8px 15px",
    cursor: "pointer",
    fontWeight: "bold",
    width: "100px",
    margin: "0 5px",
  },
};

export default App;