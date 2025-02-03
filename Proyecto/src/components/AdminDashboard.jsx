import { useState } from 'react';
import AdministrarRoles from './AdministrarRoles';
import ConfigurarHorarios from './ConfigurarHorarioDoctor';
import RegistrarEmpleados from './RegistrarUsuarioAdmin';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('roles');
  const [focusIndex, setFocusIndex] = useState(0);  // Controlar la selección de los botones

  const tabs = [
    { label: 'Gestionar Roles', value: 'roles' },
    { label: 'Configurar Horarios', value: 'schedules' },
    { label: 'Registrar Usuarios', value: 'register' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'roles':
        return <AdministrarRoles />;
      case 'schedules':
        return <ConfigurarHorarios />;
      case 'register':
        return <RegistrarEmpleados />;
      default:
        return null;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      setFocusIndex((prev) => Math.min(prev + 1, tabs.length - 1));
    } else if (e.key === 'ArrowUp') {
      setFocusIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter') {
      setActiveTab(tabs[focusIndex].value);  // Seleccionar la pestaña activa
    }
  };

  return (
    <div style={styles.background}>
      <div style={styles.container} onKeyDown={handleKeyDown} tabIndex={0}>  {/* Permitir captura de teclas */}
        <h1 style={styles.title}>Panel de Administración</h1>
        <nav style={styles.nav}>
          {tabs.map((tab, index) => (
            <button
              key={tab.value}
              style={{
                ...styles.button,
                ...(index === focusIndex ? styles.activeButton : {}),
              }}
              onClick={() => setActiveTab(tab.value)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
        <div style={styles.content}>{renderContent()}</div>
      </div>
    </div>
  );
};

const styles = {
  background: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
    backgroundColor: "#373f4f",
  },
  container: {
    textAlign: 'center',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '900px',
    margin: '0 auto',
    backgroundColor: '#d0dcf5',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  title: {
    color: '#333',
    marginBottom: '20px',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column', // Cambio para alineación vertical
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '20px',
  },
  button: {
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#919eb8',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s, transform 0.2s',
  },
  activeButton: {
    backgroundColor: '#4b5c7d',
    color: 'white',
    transform: 'scale(1.05)',
  },
  content: {
    padding: '20px',
    backgroundColor: '#d0dcf5',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    maxHeight: '400px',
    overflowY: 'auto',
  },
};

export default AdminDashboard;
