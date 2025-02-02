import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TfiCheck, TfiClose } from "react-icons/tfi";
import { RiLogoutBoxLine, RiFileWarningLine, RiFileCheckLine } from "react-icons/ri";

const HorarioDoctor = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { doctor } = location.state || {};

    const diasSemana = ["Dom", "Lun", "Mar", "Mié", "Juv", "Vie", "Sab"];

    if (!doctor || typeof doctor.Nombre !== "string") {
        return (
            <div>
                <p>No se encontró información del doctor. Redirigiendo...</p>
                <button onClick={() => navigate("/list-doctors")}>Volver</button>
            </div>
        );
    }

    // Estado para controlar si hay cambios guardados
    const [cambiosGuardados, setCambiosGuardados] = useState(true); // Default: No hay cambios

    // Usamos doctor.DíasLaborales si existe, sino, usamos un array de 0s
    const [vectorEstado, setVectorEstado] = useState(doctor.DiasLaborales);

    // Función para alternar el estado de un día específico
    const toggleEstado = (index) => {
        setVectorEstado(prevState => {
            const nuevoEstado = [...prevState];
            nuevoEstado[index] = nuevoEstado[index] === 1 ? 0 : 1; 
            setCambiosGuardados(false); 
            return nuevoEstado;
        });
    };

     // Función para guardar los cambios
     const guardarCambios = () => {
        console.log("Horario Guardado:", vectorEstado);
        setCambiosGuardados(true); 
    };

    return (
        <div style={styles.background}>
            <div style={styles.container}>
                <h2 style={styles.title}>Horario de Dr. {doctor.Nombre}</h2>
                <h3>{doctor.Especialidad}</h3>
                <p>Días Laborales</p>
                <div>
                    {diasSemana.map((dia, index) => (
                        <button
                            key={index}
                            onClick={() => index !== 0 && toggleEstado(index)} 
                            style={{
                                ...styles.button,
                                backgroundColor: vectorEstado[index] === 1 ? "#4CAF50" : "#E74C3C",
                                color: "white",
                                cursor: index === 0 ? "not-allowed" : "pointer", 
                                opacity: index === 0 ? 0.6 : 1, 
                            }}
                        >
                            {vectorEstado[index] === 1 ? <TfiCheck /> : <TfiClose />}
                            {dia}
                        </button>
                    ))}
                </div>
                <button 
                    style={styles.btnVolver}
                    title="Volver"
                    onClick={() => navigate("/list-doctors")}>
                        <RiLogoutBoxLine />
                </button>
                <button 
                    style={styles.btnGuardar}
                    title="Guardar"
                    onClick={guardarCambios}>
                        {cambiosGuardados ? <RiFileCheckLine /> : <RiFileWarningLine />}
                </button>
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
      alignItems: "center",
      width: "550px",
    },
    title: {
      marginBottom: "1px",
      fontSize: "28px",
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
      marginTop: "20px",
      width: "100%",
    },
    button: {
        width: "65px",
        height: "70px",
        padding: "10px",
        borderRadius: "5px",
        border: "1px solid #d0dcf5",
        cursor: "pointer",
        fontWeight: "bold",
        fontSize: "18px",
        textAlign: "center",
        marginRight: "2px",
        marginTop: "2px"
    },
    btnVolver: {
      width: "30px",
      height: "30px",
      borderRadius: "5px",
      position: "absolute",
      left: "66%",
      top: "33%",
      marginDown: "5px",
      border: "none",
      background: "transparent",
      cursor: "pointer",
      color: "#373f4f",
      fontSize: "20px"
    },
    btnGuardar: {
        width: "30px",
        height: "30px",
        borderRadius: "5px",
        position: "absolute",
        left: "64%",
        top: "33%",
        marginDown: "5px",
        border: "none",
        background: "transparent",
        cursor: "pointer",
        color: "#373f4f",
        fontSize: "20px"
      },
  };
export default HorarioDoctor;
