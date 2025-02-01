import { useState } from 'react';
import '../assets/Style.css';
import AdministrarRoles from './AdministrarRoles';
import ConfigurarHorarios from './ConfigurarHorarioDoctor';
import RegistrarEmpleados from './RegistrarUsuarioAdmin';


const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('roles');
  const render = () => {
    switch (activeTab) {
      case 'roles':
        return <AdministrarRoles />;
      case 'schedules':
        return <ConfigurarHorarios />;
      case 'register':
        return <RegistrarEmpleados />;
      default:
        return <AdministrarRoles />;
    }
  }
  

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
          className={`nav-link ${activeTab === 'schedules' ? 'active' : ''}`}
          onClick={() => setActiveTab('schedules')}
        >
          Configurar Horarios
        </button>
        <button
          className={`nav-link ${activeTab === 'register' ? 'active' : ''}`}
          onClick={() => setActiveTab('register')}
        >
          Registrar Usuarios
        </button>

      </nav>
      {render()}
    </div>
  );
};

export default AdminDashboard;
