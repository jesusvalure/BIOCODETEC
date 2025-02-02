import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";

const PanelPaciente = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  const pacienteLogueado = location.state?.paciente; 

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem('user'));  // Recuperamos el usuario del localStorage

    if (!loggedUser) {
      console.log('No hay usuario logueado');
      navigate('/');  // Redirige al login si no hay usuario
    } else {
      console.log('Usuario logueado:', loggedUser);
      setUser(loggedUser);  // Guardamos los datos del usuario en el estado
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');  // Eliminamos el usuario del localStorage
    navigate('/');  // Redirigimos al login
  };

  const handleGoToProfile = () => {
    navigate('/perfil-paciente', {state: { paciente: pacienteLogueado}});  // Redirige al perfil del paciente
  };

  const handleRegisterCita = () => {
    navigate('/select-doctor', {state: { paciente: pacienteLogueado}});  // Redirige para seleccionar un doctor
  };

  if (!user) {
    return null; // Si no hay usuario, no renderizamos nada
  }

  return (
    <div style={styles.background}>
      <div style={styles.container}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div style={styles.divUserName}>
            <button style={styles.btnPerfil} onClick={handleGoToProfile}>
              <FaRegUser />
            </button>
            <h2 className="text-center mb-4">{user.Nombre}</h2>  {/* Mostramos el nombre del usuario */}
          </div>
          <div className="user-actions">
            
            <button style={styles.btnVolver} onClick={handleLogout}>
              <TbLogout2 />
            </button>
          </div>
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
                <th className="border border-gray-300 px-4 py-2">Médico</th>
                <th className="border border-gray-300 px-4 py-2">Especialidad</th>
                <th className="border border-gray-300 px-4 py-2">Tipo</th>
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
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
    width: "500px",
    height: "500px"
  },
  title: {
    marginBottom: "20px",
    fontSize: "40px",
    fontWeight: "bold",
  },
  field: {
    marginBottom: "15px",
    textAlign: "left",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
  },
  select: {
    width: "100%",
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  error: {
    color: "red",
    fontSize: "12px",
    marginTop: "5px",
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "30px",
    marginBottom: "50px",
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
    left: "65%",
    top: "12%",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    color: "#373f4f",
    fontSize: "20px",
    padding: "1px",
  },
  divUserName: {
    height: "50px",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",

  }
};


export default PanelPaciente;
