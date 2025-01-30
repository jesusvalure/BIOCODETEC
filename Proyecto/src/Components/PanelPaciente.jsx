import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PanelPaciente = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem('user'));  // Recuperamos el usuario del localStorage

    if (!loggedUser) {
      console.log('No hay usuario logueado');
      navigate('/');  // Redirige al login si no hay usuario
    } else {
      console.log('Usuario logueado:', loggedUser);
      setUser(loggedUser);  // Guardamos los datos del usuario en el estado
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');  // Eliminamos el usuario del localStorage
    navigate('/');  // Redirigimos al login
  };

  const handleGoToProfile = () => {
    navigate('/perfil-paciente');  // Redirige al perfil del paciente
  };

  const handleRegisterCita = () => {
    navigate('/select-doctor');  // Redirige para seleccionar un doctor
  };

  if (!user) {
    return null; // Si no hay usuario, no renderizamos nada
  }

  return (
    <div className="client-profile container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="user-info">
          <h4>Bienvenido, {user.nombre}</h4>  {/* Mostramos el nombre del usuario */}
        </div>
        <div className="user-actions">
          <button className="btn btn-outline-primary me-2" onClick={handleGoToProfile}>
            Ir al Perfil
          </button>
          <button className="btn btn-outline-danger" onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </div>
      </div>

      <h1 className="text-center mb-4">Perfil del Paciente</h1>

      <div className="client-actions mb-4">
        <button className="btn btn-primary me-2">Consultar Citas Pasadas</button>
        <button className="btn btn-success me-2" onClick={handleRegisterCita}>Programar Nueva Cita</button>
      </div>

      <div className="client-info mt-4">
        <h2>Información de Citas</h2>
        <table className="table table-bordered">
          <thead className="thead-light">
            <tr>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Médico</th>
              <th>Especialidad</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>20/12/2024</td>
              <td>10:00 AM</td>
              <td>Dr. Juan Pérez</td>
              <td>Cardiología</td>
              <td>Pendiente</td>
            </tr>
            <tr>
              <td>15/11/2024</td>
              <td>3:00 PM</td>
              <td>Dr. María López</td>
              <td>Dermatología</td>
              <td>Completada</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PanelPaciente;
