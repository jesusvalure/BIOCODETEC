import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../assets/Style.css';

const DoctorDashboard = () => {
  const navigate = useNavigate(); 

  const handleRegisterDiagnosis = () => {
    navigate('/register-diagnosis'); // Cambia a la ruta correspondiente
  };

  return (
    <div className="doctor-dashboard container">
      <h1 className="text-center mb-4">Panel del Doctor</h1>

      {/* Acciones principales */}
      <div className="doctor-actions">
        <button className="btn btn-primary">Consultar Historiales Médicos</button>
        <button className="btn btn-secondary" onClick={handleRegisterDiagnosis}>
          Registrar Diagnóstico
        </button>
        <button className="btn btn-success">Emitir Receta Médica</button>
        <button className="btn btn-warning">Agendar Cita de Seguimiento</button>
      </div>

      {/* Lista de pacientes asignados */}
      <div className="doctor-patients mt-4">
        <h2>Pacientes Asignados</h2>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Edad</th>
              <th>Diagnóstico</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Juan Pérez</td>
              <td>45</td>
              <td>Hipertensión</td>
              <td>
                <button className="btn btn-info btn-sm">Ver Historial</button>
                <button className="btn btn-warning btn-sm">Agregar Nota</button>
              </td>
            </tr>
            <tr>
              <td>María López</td>
              <td>30</td>
              <td>Diabetes</td>
              <td>
                <button className="btn btn-info btn-sm">Ver Historial</button>
                <button className="btn btn-warning btn-sm">Agregar Nota</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorDashboard;
