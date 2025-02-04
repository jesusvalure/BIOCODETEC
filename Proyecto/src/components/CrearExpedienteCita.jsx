import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { RiSave3Fill, RiLogoutBoxLine, RiContactsFill } from "react-icons/ri";

const CrearExpediente = () => {
    const [padecimientos, setPadecimientos] = useState("");
    const [diagnostico, setDiagnostico] = useState("");
    const [receta, setReceta] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const Paciente = location.state?.paciente;

    const handleGuardar = () => {
        const expediente = {
            padecimientos,
            diagnostico,
            receta
        };

        console.log("Expediente guardado:", expediente);
        alert("Expediente guardado con éxito.");

        // Aquí podrías hacer una solicitud POST para guardar en el backend
        // fetch('/api/expediente', { method: 'POST', body: JSON.stringify(expediente) })

        navigate('/dashboard'); // Redirige al dashboard después de guardar
    };

    return (
        <div style={styles.background}>
            <div style={styles.container}>
                <div style={styles.divHead}>
                    <button style={styles.btn} onClick={() => navigate("/")}><RiContactsFill /></button>
                    <div style={styles.divHeadInfo}>
                        <h2 style={styles.textInfo1}>{Paciente.Nombre}</h2>
                        <p style={styles.textInfo2}>Correo: {Paciente.Correo}</p>
                        <p style={styles.textInfo2}>Cedula: {Paciente.Cedula}</p>
                        <p style={styles.textInfo2}>Celular: {Paciente.Celular}</p>
                    </div>
                </div>
                

                <textarea
                    style={styles.textArea}
                    placeholder="Padecimientos"
                    value={padecimientos}
                    onChange={(e) => setPadecimientos(e.target.value)}
                />

                <textarea
                    style={styles.textArea}
                    placeholder="Diagnóstico"
                    value={diagnostico}
                    onChange={(e) => setDiagnostico(e.target.value)}
                />

                <textarea
                    style={styles.textArea}
                    placeholder="Receta"
                    value={receta}
                    onChange={(e) => setReceta(e.target.value)}
                />

                <button style={styles.buttonGuardar} onClick={handleGuardar}>
                    <RiSave3Fill style={{ marginRight: "8px" }} /> Guardar
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
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#d0dcf5",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        textAlign: "center",
        width: "600px",
    },
    divHead: {
        width: "100%",
        display: 'flex', 
        justifyContent: 'flex-start', 
        alignItems: 'center',
         margin: "1px"
    },
    divHeadInfo: {
        display: 'flex',
        flexDirection: 'column',   
        alignItems: 'flex-start',  
        gap: '0px',                
        padding: '0px',            
        margin: '0px',             
    },
    textArea: {
        width: "90%",
        height: "100px",
        margin: "10px 0",
        padding: "10px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        resize: "none",
        fontSize: "14px",
    },
    buttonGuardar: {
        backgroundColor: "#373f4f",
        color: "white",
        border: "none",
        padding: "10px 20px",
        borderRadius: "5px",
        cursor: "pointer",
        fontWeight: "bold",
        display: "flex",
        alignItems: "center",
        marginTop: "10px"
    },
    btn: {
        fontSize: "60px",
        height: "100px",
        width: "105px",
        padding: "10px",
        background: "#373f4f"
    },
    textInfo2: {
        margin: '0px',              // Asegura que no haya margen entre los hijos
        padding: '2px 0',           // Opcional: un poco de espacio interno si lo deseas
        fontSize: '15px', 
        marginLeft: '10px',
    },
    textInfo1: {
        margin: '0px',              // Asegura que no haya margen entre los hijos
        padding: '2px 0',           // Opcional: un poco de espacio interno si lo deseas
        fontSize: '20px', 
        marginLeft: '10px',
    }
};

export default CrearExpediente;