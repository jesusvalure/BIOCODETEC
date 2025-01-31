import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiLogoutBoxLine } from "react-icons/ri";


const ReceptionistDashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    
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

    if (!user) {
      return null; // Si no hay usuario, no renderizamos nada
    }

    return (
      <div style={styles.background}>
        <div style={styles.container}>
          <button title="Volver" style={styles.btnVolver} onClick={() => navigate("/")}><RiLogoutBoxLine /></button>
          <h1 style={styles.title}>Panel de Recepcionista</h1>
          <h2>HealthLink</h2>
          <p>Hola {user.Nombre}!</p>
          <div style={styles.buttons}>
            <button style={styles.button} onClick={() => navigate("/list-doctors")}>Consultar Horarios</button>
            <button style={styles.button} onClick={() => navigate("/nueva-cita-recept")}>Registrar Cita</button>
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
      height: "250px"
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
    btnVolver: {
      width: "30px",
      height: "30px",
      borderRadius: "5px",
      position: "absolute",
      left: "64%",
      top: "30%",
      border: "none",
      background: "transparent",
      cursor: "pointer",
      color: "#373f4f",
      fontSize: "25px"
    },
  };
  
  export default ReceptionistDashboard;
  