import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { RiCalendar2Fill, RiSubtractFill, RiCloseLine, RiCheckLine  } from "react-icons/ri";

const CitasDoctor = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [matrizCitas, setMatrizCitas] = useState(
        Array(8).fill().map(() => Array(3).fill(-1)) //Matriz con todo = -1
    );
    const [diasLaboralesDoc, setDiasLaboralesDoc] = useState(null);

    const horarios = [["8:00", "8:20", "8:40"], 
                      ["9:00", "9:20", "9:40"], 
                      ["10:00", "10:20", "10:40"], 
                      ["11:00", "11:20", "11:40"], 
                      ["13:00", "13:20", "13:40"], 
                      ["14:00", "14:20", "14:40"], 
                      ["15:00", "15:20", "15:40"], 
                      ["16:00", "16:20", "16:40"]];
    
     

                      

    const [buttonStates, setButtonStates] = useState(matrizCitas);

    const { doctor, paciente } = location.state || {}; 
    

    if (!doctor || typeof doctor.Nombre !== "string") {
        return (
            <div>
                <p>No se encontró información del doctor. Redirigiendo...</p>
                <button onClick={() => navigate("/select-doctor", { state: {paciente: paciente} })}>Volver</button>
            </div>
        );
    }

    useEffect(() => {
        if (doctor && doctor.DiasLaborales) {
            setDiasLaboralesDoc(doctor.DiasLaborales);
            console.log(diasLaboralesDoc);
        }
    }, [doctor]); 

    if (!paciente || typeof paciente.Nombre !== "string") {
        return (
            <div>
                <p>No se encontró información del paciente. Redirigiendo...</p>
                <button onClick={() => navigate("/select-doctor", { state: {paciente: paciente} })}>Volver</button>
            </div>
        );
    }

    const handleChange = (date) => {
            if (date instanceof Date) {
                setSelectedDate(date);
                const formattedDate = format(date, "yyyy-MM-dd");
    
                if (doctor.Horario[formattedDate]) {
                    setMatrizCitas(doctor.Horario[formattedDate]);
                    setButtonStates(doctor.Horario[formattedDate]);
                } else {
                    const nuevaMatriz = Array(8).fill().map(() => Array(3).fill(0));
                    setMatrizCitas(nuevaMatriz);
                    setButtonStates(nuevaMatriz);
                }
            } 
        };

    const handleButtonClick = (row, col) => {
        const selectedHour = horarios[row][col];
        setSelectedTime(selectedHour);
        console.log(matrizCitas[row][col]);
        if (matrizCitas[row][col] !== -1) {
            console.log("2");
            // Alternar entre 0 y 1 en la matriz de estados
            setButtonStates((prevStates) => {
                const newStates = prevStates.map((r, rowIndex) =>
                    r.map((val, colIndex) => 
                        rowIndex === row && colIndex === col ? (val === 0 ? 1 : 0) : val
                    )
                );
                return newStates;
            });
        }
    };

    const handleAccept = () => {
        setErrorMessage("");

        if (selectedDate && selectedTime) {
            setShowModal(true);
        } else {
            setErrorMessage("Selecciona una fecha y una hora antes de continuar.");
        }
    };

    const handleConfirm = () => {
        const formattedDate = format(selectedDate, "yyyy-MM-dd");
        doctor.Horario[formattedDate] = buttonStates;
        console.log("Cita confirmada:", {
            doctor: doctor.Nombre,
            especialidad: doctor.Especialidad,
            paciente: paciente.Nombre,
            cedula: paciente.Cedula,
            fecha: formattedDate,
            hora: selectedTime
        });

        // Lógica para guardar la cita en la base de datos

        setShowModal(false);
        navigate("/panel-paciente", { state: {paciente: paciente} });
    };

    return (
        <div style={styles.background}>
            <div style={styles.container}>
                <h2>Dr. {doctor.Nombre}</h2>
                <h3>{doctor.Especialidad}</h3>

                {/* Selector de fecha */}
                <div style={styles.datePickerDiv}>
                    <p style={styles.text2}><RiCalendar2Fill style={{ fontSize: "20px" }} /> </p>
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleChange}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="YYYY-MM-DD"
                        className="customDatepicker"
                        filterDate={(date) => diasLaboralesDoc[date.getDay()] === 1}
                    />
                </div>

                {/* Matriz de botones */}
                <div style={styles.grid}>
                    {buttonStates.map((row, rowIndex) => (
                        <div key={`row-${rowIndex}`} style={styles.row}>
                            {row.map((value, colIndex) => (
                                <button
                                    key={`button-${rowIndex}-${colIndex}`}
                                    style={{
                                        ...styles.button,
                                        backgroundColor: 
                                            value === 0 ? "#4CAF50" : 
                                            value === 1 ? "#E74C3C" : "white", // Verde, Rojo o Blanco
                                        color: value === -1 ? "black" : "white",
                                        border: value === -1 ? "1px solid black" : "none",
                                    }}
                                    onClick={() => handleButtonClick(rowIndex, colIndex)}
                                >
                                    {value === 0 ? <RiCheckLine /> : value === 1 ? <RiCloseLine /> : <RiSubtractFill />}
                                    {/* Horario debajo del ícono */}
                                    <div style={styles.textHorario}>{horarios[rowIndex][colIndex]}</div>
                                </button>
                            ))}
                        </div>
                    ))}
                </div>

                {/* Botones de navegación */}
                <div style={styles.containerBtn}>
                    <button style={styles.buttonVolver} onClick={() => navigate("/select-doctor", { state: {paciente: paciente} })}>Volver</button>
                    <button style={styles.buttonAceptar} onClick={handleAccept}>Aceptar</button>
                </div>

                {/* Modal de Confirmación */}
                {showModal && (
                    <div style={styles.modalOverlay}>
                        <div style={styles.modal}>
                            {console.log(paciente)}
                            <h3>Confirmar Cita</h3>
                            <p><strong>Doctor:</strong> {doctor.Nombre}</p>
                            <p><strong>Especialidad:</strong> {doctor.Especialidad}</p>
                            <p><strong>Paciente:</strong> {paciente.Nombre}</p>
                            <p><strong>Cedula:</strong> {paciente.Cedula}</p>
                            <p><strong>Fecha:</strong> {format(selectedDate, "yyyy-MM-dd")}</p>
                            <p><strong>Hora:</strong> {selectedTime}</p>
                            

                            <div style={styles.containerBtn}>
                                <button style={styles.buttonVolver} onClick={() => setShowModal(false)}>Atrás</button>
                                <button style={styles.buttonAceptar} onClick={handleConfirm}>Confirmar</button>
                            </div>
                        </div>
                    </div>
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
    text2: {
        fontSize: "16px",
        marginLeft: "95px",
        marginRight: "10px",
        marginTop: "1px",
    },
    container: {
        backgroundColor: "#d0dcf5",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        textAlign: "center",
        width: "400px",
    },
    datePickerDiv: {
        background: "#d0dcf5",
        display: "flex",
        justifyContent: "left",
        alignItems: "column",
        height: "20px",
        width: "350px",
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(1, 1fr)",
        gap: "1px",
        marginTop: "20px",
    },
    row: {
        display: "flex",
        justifyContent: "center",
    },
    button: {
        width: "65px",
        height: "45px",
        padding: "10px",
        borderRadius: "5px",
        border: "1px solid #d0dcf5",
        cursor: "pointer",
        fontWeight: "bold",
        fontSize: "11px",
        textAlign: "center",
        marginRight: "2px",
        marginTop: "2px"
    },
    buttonVolver: {
        backgroundColor: "#373f4f",
        border: "1px solid #ccc",
        borderRadius: "5px",
        marginRight: "30px",
        marginTop: "20px",
        cursor: "pointer",
        fontWeight: "bold",
        color: "white",
        width: "130px",
    },
    buttonAceptar: {
        backgroundColor: "#373f4f",
        border: "1px solid #ccc",
        borderRadius: "5px",
        marginLeft: "45px",
        marginTop: "20px",
        cursor: "pointer",
        fontWeight: "bold",
        color: "white",
        width: "130px",
    },
    modalOverlay: { 
        position: "fixed", 
        top: 0, 
        left: 0,
        width: "100%", 
        height: "100%", 
        backgroundColor: "rgba(0, 0, 0, 0.5)", 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center" 
    },
    modal: { 
        backgroundColor: "white", 
        padding: "20px", 
        borderRadius: "10px", 
        textAlign: "center" 
    },
};

export default CitasDoctor;
