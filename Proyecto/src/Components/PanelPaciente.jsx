import React, { useEffect, useState } from 'react';
import '../assets/Style.css';
import { useNavigate } from 'react-router-dom';

const ClientProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: '' });

  useEffect(() => {
    const loggedUser = location.state || {};
    if (!loggedUser) {
      navigate('/'); 
    } else {
      setUser(loggedUser); 
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser'); 
    navigate('/'); 
  };

  const handleGoToProfile = () => {
    navigate('/perfil-paciente'); 
  };

  const handleRegisterCita = () => {
    navigate('/select-doctor'); 
  }

  return (
    <div className="client-profile container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="user-info">
          <h4>Bienvenido, {user.name}</h4>
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
        <button className="btn btn-secondary me-2">Revisar Recetas Médicas</button>
        <button className="btn btn-success me-2" onClick={handleRegisterCita}>Programar Nueva Cita</button>
        <button className="btn btn-danger">Cancelar Cita</button>
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

export default ClientProfile;