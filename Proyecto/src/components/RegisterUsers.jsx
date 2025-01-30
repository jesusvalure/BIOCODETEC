import React from "react";

const RegisterUsers = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí va la lógica para registrar un usuario
    console.log("Usuario registrado");
  };

  return (
    <div>
      <h2>Registrar Usuario</h2>
      <form onSubmit={handleSubmit}>
      <div className="nav nav-pills justify-content-center mb-4 " style={{ minHeight: "0vh" }}>
        <div className="w-50">
          <div className="mb-3 " >
            <label htmlFor="name" className="form-label" style={{ width: "110px" }}>Nombre:</label>
            <input type="text" id="name" className="form-control" required />
          </div>
          <div className="mb-3 ">
            <label htmlFor="password" className="form-label" style={{ width: "110px"}}>Contraseña:</label>
            <input type="text" id="password" className="form-control" required />
          </div>
          <div className="mb-3 ">
            <label htmlFor="user" className="form-label" style={{ width: "110px" }}>Usuario:</label>
            <input type="text" id="user" className="form-control" required />
          </div>
          <div className="mb-3 ">
            <label htmlFor="role" className="form-label" style={{ width: "110px" }}>Rol:</label>
            <select id="role" className="form-select" required>
              <option value="doctor">Doctor</option>
              <option value="receptionist">Recepcionista</option>
            </select>
          </div>
        </div>
      </div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "15vh"}}>
         <button type="submit" className="nav-link">
          Registrar
         </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterUsers;
