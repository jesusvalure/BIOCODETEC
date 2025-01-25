import React from 'react';
import '../assets/Style.css';

const ClientProfile = () => {
  return (
    <div className="client-profile container">
      <h1 className="text-center mb-4">Perfil del Paciente</h1>

      <div className="client-actions">
        <button className="btn btn-primary">Consultar Citas Pasadas</button>
        <button className="btn btn-secondary">Revisar Recetas Médicas</button>
        <button className="btn btn-success">Programar Nueva Cita</button>
        <button className="btn btn-danger">Cancelar Cita</button>
      </div>

      <div className="client-info mt-4">
        <h2>Información de Citas</h2>
        <table>
          <thead>
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
