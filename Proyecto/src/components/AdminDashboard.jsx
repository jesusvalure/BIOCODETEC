import React, { useState } from 'react';
import ManageRoles from './ManageRoles';
import RegisterUsers from './RegisterUsers';
import ConfigureSchedules from './ConfigureSchedules';
import '../assets/Style.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('roles');

  const renderContent = () => {
    switch (activeTab) {
      case 'roles':
        return <ManageRoles />;
      case 'register':
        return <RegisterUsers />;
      case 'schedules':
        return <ConfigureSchedules />;
      default:
        return <ManageRoles />;
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Panel de Administración</h1>
      <nav className="nav nav-pills justify-content-center mb-4">
        <button
          className={`nav-link ${activeTab === 'roles' ? 'active' : ''}`}
          onClick={() => setActiveTab('roles')}
        >
          Gestionar Roles
        </button>
        <button
          className={`nav-link ${activeTab === 'register' ? 'active' : ''}`}
          onClick={() => setActiveTab('register')}
        >
          Registrar Usuarios
        </button>
        <button
          className={`nav-link ${activeTab === 'schedules' ? 'active' : ''}`}
          onClick={() => setActiveTab('schedules')}
        >
          Configurar Horarios
        </button>
      </nav>
      <div className="gestion-roles">{renderContent()}</div>
    </div>
  );
};

export default AdminDashboard;
