import React from "react";

const ChangeRole = ( ) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí va la lógica para cambiar roll
    console.log("Cambio de rol");
  };

  return (
    <div>
      <h2> Cambiar Rol</h2>
      <form onSubmit={handleSubmit}>
        <div className="label">
          <label htmlFor="name" className="form-label">Usuario: </label>
        </div>
        <div className="mb-3">
          <label htmlFor="role" className="form-label">Rol actual: </label>
        </div>
        <div className="mb-3">
          <label htmlFor="role" className="form-label">Nuevo rol: </label>
          <select id="role" className="form-select" required>
            <option value="doctor">Doctor</option>
            <option value="receptionist">Recepcionista</option>
            <option value="paciente">Paciente</option>
            <option value="admin">Administrador</option>
          </select>
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

export default ChangeRole;