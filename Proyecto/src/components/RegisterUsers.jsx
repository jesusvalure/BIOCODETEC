import React from "react";

const RegisterUsers = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí va la lógica para registrar un usuario
    console.log("Usuario registrado");
  };

  return (
    <div>
      <h2>Registrar Usuarios</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Nombre</label>
          <input type="text" id="name" className="form-control" required />
        </div>
        <div className="mb-3">
          <label htmlFor="role" className="form-label">Rol</label>
          <select id="role" className="form-select" required>
            <option value="doctor">Doctor</option>
            <option value="receptionist">Recepcionista</option>
          </select>
        </div>
        <button type="submit" className="btn btn-success">Registrar</button>
      </form>
    </div>
  );
};

export default RegisterUsers;
