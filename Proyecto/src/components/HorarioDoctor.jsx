import React, { useState } from 'react';
import { useLocation ,useNavigate } from 'react-router-dom';

const HorarioDoctor = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const actualDoctor = location.state || {};

    const handleVolver = () => {
        navigate(-1);
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>{selectedDoctor.Nombre}</h2>
            <p>Especialidad: {selectedDoctor.Especialidad}</p>
            
            <button onClick={() => navigate("/")} style={styles.button}>
            Volver
            </button>
        </div>
    );
}

const styles = {
    container: {
      padding: "20px",
      backgroundColor: "#f4f4f9",
      borderRadius: "10px",
      width: "80%",
      margin: "50px auto",
      textAlign: "left",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    },
    title: {
      fontSize: "24px",
      marginBottom: "20px",
      color: "#333",
    },
    button: {
      padding: "10px 15px",
      backgroundColor: "#001d72",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
  };
  
  export default HorarioDoctor;