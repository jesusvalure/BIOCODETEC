import React from 'react';

const ReceptionistDashboard = () => {
    return (
      <div className="receptionist-dashboard">
        <h1>Panel de Recepcionista</h1>
        <h2>Gestión de Citas</h2>
        <ul>
          <li>Consultar horarios y disponibilidad de los doctores.</li>
          <li>Registrar nuevas citas en horarios disponibles.</li>
          <li>Cancelar o reprogramar citas según solicitud del cliente.</li>
        </ul>
        <div className="button-group">
          <button>Consultar Horarios</button>
          <button>Registrar Nueva Cita</button>
          <button>Cancelar/Reprogramar Cita</button>
        </div>
      </div>
    );
  };
  
  export default ReceptionistDashboard;
  