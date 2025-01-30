import React from "react";

const ConfigureSchedules = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí va la lógica para guardar nuevo horario
    console.log("Guardar horario");
  };


  return (
    <div>
      <h2>Configurar Horarios</h2>
      <p>Aquí puedes configurar los horarios de los doctores.</p>
      {/* Ejemplo de formulario para configurar horarios */}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="doctor" className="form-label">Seleccionar Doctor</label>
          <select id="doctor" className="form-select">
            <option value="doctor1">Doctor 1</option>
            <option value="doctor2">Doctor 2</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="schedule" className="form-label">Horario</label>
          <input type="text" id="schedule" className="form-control" placeholder="Ejemplo: 9:00 AM - 5:00 PM" />
        </div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "15vh"}}>
         <button type="submit" className="nav-link">
          Guardar cambios
         </button>
        </div>
      </form>
    </div>
  );
};

export default ConfigureSchedules;
