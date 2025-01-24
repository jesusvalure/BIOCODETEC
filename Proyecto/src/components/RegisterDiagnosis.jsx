import React, { useState } from "react";
import pacientes from "../data/pacientes.json";

const RegistrarDiagnostico = () => {
  const [diagnostico, setDiagnostico] = useState("");
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState("");

  const handleDiagnostico = () => {
    if (pacienteSeleccionado && diagnostico) {
      console.log(
        `Paciente: ${pacienteSeleccionado}, Diagnóstico: ${diagnostico}`
      );

      // Aquí podrías agregar el diagnóstico al backend usando fetch o axios.
      alert("Diagnóstico registrado con éxito.");
      setDiagnostico("");
      setPacienteSeleccionado("");
    } else {
      alert("Por favor selecciona un paciente y escribe un diagnóstico.");
    }
  };

  return (
    <div>
      <h2>Registrar Diagnóstico</h2>
      <div>
        <label htmlFor="paciente">Seleccionar Paciente:</label>
        <select
          id="paciente"
          value={pacienteSeleccionado}
          onChange={(e) => setPacienteSeleccionado(e.target.value)}
        >
          <option value="">Seleccionar</option>
          {pacientes.map((paciente) => (
            <option key={paciente.cedula} value={paciente.nombre}>
              {paciente.nombre}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="diagnostico">Diagnóstico:</label>
        <textarea
          id="diagnostico"
          value={diagnostico}
          onChange={(e) => setDiagnostico(e.target.value)}
        />
      </div>
      <button onClick={handleDiagnostico}>Registrar</button>
    </div>
  );
};

export default RegistrarDiagnostico;
