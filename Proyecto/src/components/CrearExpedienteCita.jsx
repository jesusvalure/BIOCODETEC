import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { RiSave3Fill, RiLogoutBoxLine, RiContactsFill, RiAddLargeLine  } from "react-icons/ri";

const CrearExpediente = () => {
    const [sintomas, setSintomas] = useState("");
    const [diagnostico, setDiagnostico] = useState("");
    const [receta, setReceta] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const Paciente = location.state?.paciente;
    const Cita = location.state?.cita;

    const coordX = Cita.X;
    const coordY = Cita.Y;


    const handleGuardar = async () => {
        if (!paciente || !paciente.Citas || paciente.Citas.length === 0) {
            alert("No se encontró una cita asociada.");
            return;
        }

        // Asumimos que la última cita es la que se quiere actualizar
        const nuevaCita = {
            ...paciente.Citas[0], // Copia la última cita
            Sintomas: sintomas,
            Diagnostico: diagnostico,
            Receta: receta
        };

        console.log("Expediente guardado:", expediente);

        navigate('/doctor-dashboard'); 
    };

    return (
        <div style={styles.background}>
            <div style={styles.container}>
                <div style={styles.divHead}>
                    <button style={styles.btn} onClick={() => navigate("/perfil-paciente", {state: { paciente: paciente}})}><RiContactsFill /></button>
                    <div style={styles.divHeadInfo}>
                        <h2 style={styles.textInfo1}>{paciente?.Nombre}</h2>
                        <p style={styles.textInfo2}>Correo: {paciente?.Correo}</p>
                        <p style={styles.textInfo2}>Cédula: {paciente?.Cedula}</p>
                        <p style={styles.textInfo2}>Celular: {paciente?.Celular}</p>
                    </div>
                    <button style={styles.btnSmallBack} onClick={() => navigate("/")}><RiLogoutBoxLine /></button>
                    <button style={styles.btnSmallSeguimiento} ><RiAddLargeLine /> Cita</button>
                </div>

                <textarea
                    style={styles.textArea}
                    placeholder="Síntomas"
                    value={sintomas}
                    onChange={(e) => setSintomas(e.target.value)}
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
        backgroundColor: "#373f4f"
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
        width: "600px"
    },
    divHead: {
        width: "100%",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        margin: "1px"
    },
    divHeadInfo: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "0px",
        padding: "0px",
        margin: "0px"
    },
    textArea: {
        width: "90%",
        height: "100px",
        margin: "10px 0",
        padding: "10px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        resize: "none",
        fontSize: "14px"
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
    btnSmallBack: {
        fontSize: "40px",
        height: "50px",
        width: "50px",
        padding: "10px",
        color: "#373f4f",
        background: "transparent",
        position: "relative",
        bottom: "30px",
        left:"180px",
    },
    btnSmallSeguimiento: {
        display: "flex",
        alignItems: "center",           
        justifyContent: "center",
        fontSize: "15px",
        height: "50px",
        width: "130px",
        padding: "10px",
        color: "white",
        background: "#373f4f",
        position: "relative",
        bottom: "30px",
        left:"1px",
        borderRadius: '50px',
        gap: "5px",
    },
    textInfo2: {
        margin: "0px",
        padding: "2px 0",
        fontSize: "15px",
        marginLeft: "10px"
    },
    textInfo1: {
        margin: "0px",
        padding: "2px 0",
        fontSize: "20px",
        marginLeft: "10px"
    }
};

export default CrearExpediente;
