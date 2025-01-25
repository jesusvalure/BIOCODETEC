import React from "react";

const ManageRoles = () => {
  return (
    <div>
      <h2>Gestión de Roles</h2>
      <p>Aquí puedes gestionar los permisos y roles de los usuarios.</p>
      {/* Ejemplo de tabla para visualizar y modificar roles */}
      <table className="table">
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Rol Actual</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Juan Pérez</td>
            <td>Doctor</td>
            <td>
              <button className="btn btn-primary btn-sm">Editar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ManageRoles;
