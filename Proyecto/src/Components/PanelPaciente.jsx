import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa";
import { RiLogoutBoxLine, RiCalendarCloseLine  } from "react-icons/ri";
import pacientes from '../backend/Data/patients.json';

const PanelPaciente = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [citas, setCitas] = useState([]);

  const pacienteLogueado = location.state?.paciente;

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem('user'));
    if (!loggedUser) {
      console.log('No hay usuario logueado');
      navigate('/');
    } else {
      console.log('Usuario logueado:', loggedUser);
      setUser(loggedUser);
      const paciente = pacientes.find(p => p.Cedula === pacienteLogueado.Cedula);
      console.log('Paciente encontrado:', paciente);
      setCitas(paciente.Citas);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleGoToProfile = () => {
    navigate('/perfil-paciente', { state: { paciente: pacienteLogueado } });
  };

  const handleRegisterCita = () => {
    navigate('/select-doctor', { state: { paciente: pacienteLogueado } });
  };

  const handleCancelCita = (index) => {
    const updatedCitas = citas.filter((_, i) => i !== index);
    setCitas(updatedCitas);
  };

  if (!user) {
    return null;
  }

  return (
    <div style={styles.background}>
      <div style={styles.container}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div style={styles.divUserName}>
            <button style={styles.btnPerfil} onClick={handleGoToProfile}>
              <FaRegUser />
            </button>
            <h2 className="text-center mb-4">{user.Nombre}</h2>
          </div>
          <button style={styles.btnVolver} onClick={handleLogout}>
            <RiLogoutBoxLine />
          </button>
        </div>

        <div style={styles.buttons}>
          <button style={styles.button}>Consultar Citas</button>
          <button style={styles.button} onClick={handleRegisterCita}>Nueva Cita</button>
        </div>

        <div>
          <h2>Información de Citas</h2>
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Fecha</th>
                <th className="border border-gray-300 px-4 py-2">Hora</th>
                <th className="border border-gray-300 px-4 py-2">Doctor</th>
                <th className="border border-gray-300 px-4 py-2">Especialidad</th>
                <th className="border border-gray-300 px-4 py-2">Tipo</th>
                <th className="border border-gray-300 px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {citas.length > 0 ? (
                citas.map((cita, index) => (
                  <tr key={index}>
                    <td>{cita.Fecha}</td>
                    <td>{cita.Hora}</td>
                    <td>{cita.Doctor}</td>
                    <td>{cita.Especialidad}</td>
                    <td>{cita.Tipo}</td>
                    <td>
                      <button style={styles.cancelButton} title="Cancelar Cita" onClick={() => handleCancelCita(index)}><RiCalendarCloseLine /></button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No hay citas registradas</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
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
    backgroundColor: "#d0dcf5",
    display: 'flex',          
    flexDirection: 'column',  
    alignItems: 'center',     
    justifyContent: 'center', 
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
    width: "650px",
    height: "500px"
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "30px",
    marginBottom: "50px",
    width: "500px"
  },
  button: {
    backgroundColor: "#4b5c7d",
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "8px 15px",
    cursor: "pointer",
    fontWeight: "bold",
    color: "white",
    width: "200px",
    margin: "0 5px",
  }, 
  btnPerfil: {
    width: "50px",
    height: "50px",
    borderRadius: "10px",
    position: "relative",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    color: "#373f4f",
    fontSize: "20px",
    padding: "1px",
  },
  btnVolver: {
    width: "50px",
    height: "50px",
    borderRadius: "5px",
    position: "absolute",
    left: "69%",
    top: "14%",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    color: "#373f4f",
    fontSize: "20px",
    padding: "1px",
  },
  cancelButton: {
    background: "transparent",
    color: "#d9534f",
    border: "none",
    borderRadius: "5px",
    padding: "5px 10px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "30px",
    height: "40px",
    width: "60px"
  },
  divUserName: {
    height: "50px",
    width: "600px",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center"
  }
};

export default PanelPaciente;