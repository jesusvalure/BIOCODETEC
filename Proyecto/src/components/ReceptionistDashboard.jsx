import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HiArrowRightStartOnRectangle } from "react-icons/hi2";


const ReceptionistDashboard = () => {
    const navigate = useNavigate();
  
    return (
      <div style={styles.background}>
        <div style={styles.container}>
          <button title="Volver" style={styles.btnVolver} onClick={() => navigate("/")}><HiArrowRightStartOnRectangle /></button>
          <h1 style={styles.title}>Panel de Recepcionista</h1>
          <h2>HealthLink</h2>
          <div style={styles.buttons}>
            <button style={styles.button} onClick={() => navigate("/list-doctors")}>Consultar Horarios</button>
            <button style={styles.button}>Registrar Cita</button>
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
      marginTop: "75px",
    },
    button: {
      backgroundColor: "#373f4f",
      border: "1px solid #ccc",
      borderRadius: "5px",
      padding: "8px 15px",
      cursor: "pointer",
      fontWeight: "bold",
      fontSize: "18px",
      color: "white",
      width: "200px",
      margin: "0 5px",
    }, 
    btnVolver: {
      width: "30px",
      height: "30px",
      borderRadius: "5px",
      position: "absolute",
      right: "900px",
      top: "230px",
      border: "none",
      background: "transparent",
      cursor: "pointer",
      color: "#373f4f",
      fontSize: "25px"
    },
  }
  
  export default ReceptionistDashboard;
  