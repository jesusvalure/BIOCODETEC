import React, { useState } from "react";

const ManageRoles = ({ setActiveTab }) => {

  const users = [
    { name: "Juan Pérez", role: "Doctor" },
    { name: "María Gómez", role: "Recepcionista" },
    { name: "Carlos López", role: "Administrador" },
    { name: "Ana Martínez", role: "Paciente" },
  ];

  const [selectedUser, setSelectedUser] = useState(null);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setActiveTab('change role');
  };

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
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.role}</td>
              <td>
                <button
                  className="nav-link"
                  onClick={() => handleEdit(user)}
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageRoles;
