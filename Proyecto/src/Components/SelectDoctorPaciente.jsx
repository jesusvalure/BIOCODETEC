import React, { useState } from "react";
import doctors from '../Data/doctors.json';
import Styles from './SelectDoctorPaciente.css';

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
    <div style="background">
      <div style="container">
        <h2 style="title">Registrar cita</h2>
        <div style="field">
          <label style="label">Especialidad:</label>
          <select
            value={especialidad}
            onChange={handleEspecialidadChange}
            style="select"
          >
            <option value="">-- Selecciona una especialidad --</option>
            {especialidades.map((esp, index) => (
              <option key={index} value={esp}>
                {esp}
              </option>
            ))}
          </select>
        </div>
        <div style="field">
          <label style="label">Doctor:</label>
          <select
            value={doctor}
            onChange={handleDoctorChange}
            style="select"
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
        <div style="buttons">
          <button onClick={handleVolver} style="button">
            Atrás
          </button>
          <button onClick={handleAceptar} style="button">
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};


export default App;