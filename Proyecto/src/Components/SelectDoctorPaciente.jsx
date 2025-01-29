import React, { useState } from "react";
import doctors from '../backend/Data/doctors.json';
import { useNavigate } from 'react-router-dom';

const SelectDoctorCliente = () => {
  const [especialidad, setEspecialidad] = useState("");
  const [doctor, setDoctor] = useState("");
  const [doctoresFiltrados, setDoctoresFiltrados] = useState([]);
  const [errorEspecialidad, setErrorEspecialidad] = useState("");
  const [errorDoctor, setErrorDoctor] = useState("");
  const navigate = useNavigate();

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
    setErrorEspecialidad("");
  };

  const handleDoctorChange = (e) => {
    setDoctor(e.target.value);
    setErrorDoctor("");
  };

  const handleAceptar = () => {
    let valid = true;

    if (!especialidad) {
      setErrorEspecialidad("Por favor, selecciona una especialidad.");
      valid = false;
    }
    if (!doctor) {
      setErrorDoctor("Por favor, selecciona un doctor.");
      valid = false;
    }
    if (valid) {
      const selectedDoctor = doctoresFiltrados.find((doc) => doc.Nombre === doctor);
      console.log("Doctor seleccionado:", selectedDoctor.Nombre);
      console.log("Horario del doctor:", selectedDoctor.Horario);
      navigate("/horario-doctor", { state: { doctor: selectedDoctor } });
    }
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
          {errorEspecialidad && <p style={styles.error}>{errorEspecialidad}</p>}
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
          {errorDoctor && <p style={styles.error}>{errorDoctor}</p>}
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
    width: "100vw",
    backgroundColor: "#373f4f",
  },
  container: {
    backgroundColor: "#d0dcf5",
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
  error: {
    color: "red",
    fontSize: "12px",
    marginTop: "5px",
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
    color: "black",
    width: "100px",
    margin: "0 5px",
  },
};


export default SelectDoctorCliente;