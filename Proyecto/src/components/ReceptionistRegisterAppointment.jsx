import React from "react";

const ReceptionistRegisterAppointment = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    
    console.log("ReceptionistRegisterAppointment");
  };

  return (
    <div>
      <h2>Agregar Cita</h2>
      <form onSubmit={handleSubmit}>
      <div className="align-items-center" >
          <div >
            <label htmlFor="name" className="form-label" >Número de Cédula:</label>
            <input type="text" id="name" className="form-control" required />
          </div>
          <div className="mb-3 d-flex">
            <label htmlFor="password" className="form-label" >Nombre: </label>
          </div>
          <div className="mb-3 d-flex">
            <label htmlFor="password" className="form-label" >Correro electrónico: </label>
          </div>
          <div className="mb-3 d-flex">
            <label htmlFor="especialidad" className="form-label" >Especialidad:</label>
            <select id="especialidad" className="form-select" required>
              <option value="doctor">Doctor</option>
              <option value="receptionist">Recepcionista</option>
            </select>
          </div>
          <div className="mb-3 d-flex">
            <label htmlFor="doctor" className="form-label" >Doctor:</label>
            <select id="doctor" className="form-select" required>
              <option value="doctor">Doctor</option>
              <option value="receptionist">Recepcionista</option>
            </select>
          </div>

      </div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
         <button type="submit" className="nav-link">
          Aceptar
         </button>
        </div>
      </form>
    </div>
  );
};

export default ReceptionistRegisterAppointment;