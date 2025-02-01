import { useEffect, useState } from 'react';
import '../assets/Style.css';

const AdministrarRoles = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [newRole, setNewRole] = useState('');
  
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const doctorsResponse = await fetch('http://localhost:5000/doctors');
          const receptionistsResponse = await fetch('http://localhost:5000/receptionists');
          
          const doctors = await doctorsResponse.json();
          const receptionists = await receptionistsResponse.json();
  
          // Agregamos un campo "Rol" basado en "Tipo"
          const formattedDoctors = doctors.map(user => ({ ...user, Rol: 'Doctor' }));
          const formattedReceptionists = receptionists.map(user => ({ ...user, Rol: 'Recepcionista' }));
          
          setUsers([...formattedDoctors, ...formattedReceptionists]);
        } catch (error) {
          console.error('Error al obtener los datos:', error);
        }
      };
  
      fetchUsers();
    }, []);
  
    const handleEditRole = (user) => {
      setSelectedUser(user);
      setNewRole(user.Rol);
    };
  
    const handleSaveRole = async () => {
      if (!selectedUser) return;
      
      try {
        await fetch(`http://localhost:5000/users/${selectedUser.Cedula}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ Tipo: newRole === 'Doctor' ? 2 : 3 })
        });
  
        setUsers(users.map(user => user.Cedula === selectedUser.Cedula ? { ...user, Rol: newRole } : user));
        setSelectedUser(null);
      } catch (error) {
        console.error('Error al actualizar el rol:', error);
      }
    };
  
    return (
      <div className="admin-dashboard">
        <h1>Panel de Administración</h1>
        <h2>Gestión de Roles</h2>
        <p>Aquí puedes gestionar los permisos y roles de los usuarios.</p>
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Cédula</th>
              <th>Rol</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.Cedula}>
                <td>{user.Nombre}</td>
                <td>{user.Cedula}</td>
                <td>{user.Rol}</td>
                <td>
                  <button className="btn btn-primary btn-sm" onClick={() => handleEditRole(user)}>Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
  
        {selectedUser && (
          <div className="modal">
            <div className="modal-content">
              <h3>Editar Rol de {selectedUser.Nombre}</h3>
              <select value={newRole} onChange={(e) => setNewRole(e.target.value)}>
                <option value="Doctor">Doctor</option>
                <option value="Recepcionista">Recepcionista</option>
              </select>
              <button className="btn btn-success" onClick={handleSaveRole}>Guardar</button>
              <button className="btn btn-secondary" onClick={() => setSelectedUser(null)}>Cancelar</button>
            </div>
          </div>
        )}
      </div>
    );
  };
export default AdministrarRoles;