import { useState } from 'react';
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
        return null;
    }
  };

  return (
    <div style={styles.background}>
    <div style={styles.container}>
      <h1 style={styles.title}>Panel de Administración</h1>
      <nav style={styles.nav}>
        <button
          style={{ ...styles.button, ...(activeTab === 'roles' ? styles.activeButton : {}) }}
          onClick={() => setActiveTab('roles')}
        >
          Gestionar Roles
        </button>
        <button
          style={{ ...styles.button, ...(activeTab === 'schedules' ? styles.activeButton : {}) }}
          onClick={() => setActiveTab('schedules')}
        >
          Configurar Horarios
        </button>
        <button
          style={{ ...styles.button, ...(activeTab === 'register' ? styles.activeButton : {}) }}
          onClick={() => setActiveTab('register')}
        >
          Registrar Usuarios
        </button>
      </nav>
      <div style={styles.content}>{render()}</div>
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
    justifyContent: 'center',
    alignItems: 'center', // Asegura que los botones estén centrados verticalmente
    gap: '10px',
    marginBottom: '20px',
    backgroundColor: '#d0dcf5'
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
    maxHeight: '400px', // Limita la altura del contenido
    overflowY: 'auto', // Habilita desplazamiento vertical
  },
};



export default AdminDashboard;
