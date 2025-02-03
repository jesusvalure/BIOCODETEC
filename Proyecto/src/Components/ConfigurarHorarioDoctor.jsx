import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TfiCheck, TfiClose } from "react-icons/tfi";
import { RiLogoutBoxLine, RiFileWarningLine, RiFileCheckLine } from "react-icons/ri";

const ConfigurarHorarioDoctor = () => {
    const navigate = useNavigate();
    const [doctor, setDoctor] = useState(null);
    const [doctors, setDoctors] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const diasSemana = ["Dom", "Lun", "Mar", "Mié", "Juv", "Vie", "Sab"];

    useEffect(() => {
        fetch("http://localhost:5000/doctors")
            .then((response) => response.json())
            .then((data) => setDoctors(data))
            .catch((error) => console.error("Error al obtener los datos:", error));
    }, []);

    const filteredDoctors = doctors.filter((doc) =>
        doc.Nombre.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const [cambiosGuardados, setCambiosGuardados] = useState(true);
    const [vectorEstado, setVectorEstado] = useState(doctor?.DiasLaborales || Array(7).fill(0));

    const toggleEstado = (index) => {
        setVectorEstado((prevState) => {
            const nuevoEstado = [...prevState];
            nuevoEstado[index] = nuevoEstado[index] === 1 ? 0 : 1;
            setCambiosGuardados(false);
            return nuevoEstado;
        });
    };

    const guardarCambios = () => {
        if (doctor) {
            const updatedDoctor = { ...doctor, DiasLaborales: vectorEstado };

            fetch("http://localhost:5000/updateDoctorSchedule", {
              method: "PUT",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({
                  Cedula: updatedDoctor.Cedula,
                  DiasLaborales: updatedDoctor.DiasLaborales
              })
          })
                .then((response) => {
                    if (response.ok) {
                        setCambiosGuardados(true);
                        alert("Horario guardado exitosamente.");
                    } else {
                        throw new Error("Error al guardar los cambios.");
                    }
                })
                .catch((error) => {
                    console.error("Error:", error);
                    alert("Hubo un error al guardar los cambios.");
                });
        }
    };

    const handleDoctorSelect = (selectedDoctor) => {
        setDoctor(selectedDoctor);
        setVectorEstado(selectedDoctor.DiasLaborales);
    };

    return (
        <div style={styles.background}>
            <div style={styles.container}>
                <input
                    type="text"
                    placeholder="Buscar doctor"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={styles.searchInput}
                />
                <div style={styles.searchResults}>
                    {filteredDoctors.map((doc) => (
                        <div key={doc.Id} onClick={() => handleDoctorSelect(doc)} style={styles.resultItem}>
                            {doc.Nombre} - {doc.Especialidad}
                        </div>
                    ))}
                </div>

                {doctor && (
                    <>
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
                        <button style={styles.btnVolver} title="Volver" onClick={() => navigate("/list-doctors")}>
                            <RiLogoutBoxLine />
                        </button>
                        <button style={styles.btnGuardar} title="Guardar" onClick={guardarCambios}>
                            {cambiosGuardados ? <RiFileCheckLine /> : <RiFileWarningLine />}
                        </button>
                        <button style={styles.btnGuardarExtra} onClick={guardarCambios}>Guardar Cambios</button>
                    </>
                )}
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
        textAlign: "center",
        width: "550px",
    },
    title: {
        fontSize: "28px",
        fontWeight: "bold",
    },
    button: {
        width: "65px",
        height: "70px",
        borderRadius: "5px",
        margin: "5px",
    },
    btnVolver: {
        marginTop: "10px",
        border: "none",
        cursor: "pointer",
    },
    btnGuardar: {
        marginTop: "10px",
        border: "none",
        cursor: "pointer",
    },
    btnGuardarExtra: {
        marginTop: "10px",
        padding: "10px 20px",
        backgroundColor: "#4CAF50",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
    searchInput: {
        width: "100%",
        padding: "10px",
        marginBottom: "15px",
    },
    searchResults: {
        marginBottom: "15px",
    },
    resultItem: {
        padding: "10px",
        cursor: "pointer",
        backgroundColor: "#f1f1f1",
        marginBottom: "5px",
        borderRadius: "5px",
    },
};

export default ConfigurarHorarioDoctor;
