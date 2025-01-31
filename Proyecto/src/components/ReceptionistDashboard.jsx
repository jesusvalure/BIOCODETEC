import React from 'react';
import { useNavigate } from 'react-router-dom';


const ReceptionistDashboard = () => {
    const navigate = useNavigate();
  
    return (
      <div className="receptionist-dashboard">
        <h1>Panel de Recepcionista</h1>
        <h2>HealthLink</h2>
        <div className="button-group">
          <button onClick={() => navigate("/list-doctors")}>Consultar Horarios</button>
          <button>Registrar Nueva Cita</button>
        </div>
      </div>
    );
  };
  
  export default ReceptionistDashboard;
  