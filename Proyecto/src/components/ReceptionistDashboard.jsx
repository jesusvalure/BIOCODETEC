import React, { useState } from 'react';
import ListDoctors from './ListDoctors';
import ReceptionistRegisterAppointment from './ReceptionistRegisterAppointment';

const ReceptionistDashboard = () => {
  const [activeTab, setActiveTab] = useState('schedules');

  const renderContent = () => {
    switch (activeTab) {
      case 'schedules':
        return <ListDoctors />;
      case 'newAppointment':
        return <ReceptionistRegisterAppointment />;
      default:
        return <ListDoctors />;
    }
  };



    return (

      <div className="receptionist-dashboard">
      <h1>Panel de Recepcionista</h1>
      <nav className="nav nav-pills justify-content-center mb-4">
        <button
          className={`nav-link ${activeTab === 'schedules' ? 'active' : ''}`}
          onClick={() => setActiveTab('schedules')}
        >
          Consultar Horarios
        </button>
        <button
          className={`nav-link ${activeTab === 'newAppointment' ? 'active' : ''}`}
          onClick={() => setActiveTab('newAppointment')}
        >
          Registrar nueva cita
        </button>

      </nav>
      <div className="gestion-roles">{renderContent()}</div>
    </div>
  );


  };
  
  export default ReceptionistDashboard;
  