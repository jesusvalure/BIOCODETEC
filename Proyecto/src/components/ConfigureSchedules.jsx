import React from "react";

const ConfigureSchedules = () => {
  return (
    <div>
      <h2>Configurar Horarios</h2>
      <p>Aquí puedes configurar los horarios de los doctores.</p>
      {/* Ejemplo de formulario para configurar horarios */}
      <form>
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
        <button type="submit" className="btn btn-primary">Guardar</button>
      </form>
    </div>
  );
};

export default ConfigureSchedules;
