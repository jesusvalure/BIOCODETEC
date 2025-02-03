import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { RiCalendar2Fill, RiSubtractFill, RiCloseLine, RiCheckLine } from "react-icons/ri";

const CitasDoctor = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [matrizCitas, setMatrizCitas] = useState(Array(8).fill().map(() => Array(3).fill(-1)));
    const [diasLaboralesDoc, setDiasLaboralesDoc] = useState(null);

    const horarios = [["8:00", "8:20", "8:40"], 
                      ["9:00", "9:20", "9:40"], 
                      ["10:00", "10:20", "10:40"], 
                      ["11:00", "11:20", "11:40"], 
                      ["13:00", "13:20", "13:40"], 
                      ["14:00", "14:20", "14:40"], 
                      ["15:00", "15:20", "15:40"], 
                      ["16:00", "16:20", "16:40"]];
    
    const { Doctor, Paciente } = location.state || {}; 

    if (!Doctor || typeof Doctor.Nombre !== "string") {
        return (
            <div>
                <p>No se encontró información del doctor. Redirigiendo...</p>
                <button onClick={() => navigate("/select-doctor", { state: { paciente: Paciente } })}>Volver</button>
            </div>
        );
    }

    useEffect(() => {
        if (Doctor && Doctor.DiasLaborales) {
            setDiasLaboralesDoc(Doctor.DiasLaborales);
        }
    }, [Doctor]);

    if (!Paciente || typeof Paciente.Nombre !== "string") {
        return (
            <div>
                <p>No se encontró información del paciente. Redirigiendo...</p>
                <button onClick={() => navigate("/select-doctor", { state: { paciente: Paciente } })}>Volver</button>
            </div>
        );
    }

    const handleChange = (date) => {
        if (date instanceof Date) {
            setSelectedDate(date);
            const formattedDate = format(date, "yyyy-MM-dd");

            if (Doctor.Horario[formattedDate]) {
                setMatrizCitas(Doctor.Horario[formattedDate]);
            } else {
                setMatrizCitas(Array(8).fill().map(() => Array(3).fill(0)));
            }
        } 
    };

    const handleButtonClick = (row, col) => {
        const selectedHour = horarios[row][col];
        setSelectedTime(selectedHour);
        if (matrizCitas[row][col] !== -1) {
            const newStates = [...matrizCitas];
            newStates[row][col] = newStates[row][col] === 0 ? 1 : 0; // Toggle status (0 to 1 or vice versa)
            setMatrizCitas(newStates);
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

    const handleConfirm = async () => {
        const formattedDate = format(selectedDate, "yyyy-MM-dd");
        const citaData = {
            Doctor: Doctor.Nombre,
            Especialidad: Doctor.Especialidad,
            Paciente: Paciente.Nombre,
            Cedula: Paciente.Cedula,
            Fecha: formattedDate,
            Hora: selectedTime,
        };
    
        try {
            const response = await fetch('http://localhost:5000/guardar-cita', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(citaData),
            });
    
            if (response.ok) {
                console.log('Cita confirmada y guardada');
                setShowModal(false);
                navigate("/panel-paciente", { state: { paciente: Paciente } });
            } else {
                console.log('Error en la respuesta del servidor:', response.status);
                setErrorMessage('Hubo un problema al confirmar la cita. Intenta nuevamente.');
            }
        } catch (error) {
            console.log('Error de conexión:', error);
            setErrorMessage('Hubo un problema con la conexión. Intenta más tarde.');
        }
    };
    

    return (
        <div style={styles.background}>
            <div style={styles.container}>
                <h2>Dr. {Doctor.Nombre}</h2>
                <h3>{Doctor.Especialidad}</h3>

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

                <div style={styles.grid}>
                    {matrizCitas.map((row, rowIndex) => (
                        <div key={`row-${rowIndex}`} style={styles.row}>
                            {row.map((value, colIndex) => (
                                <button
                                    key={`button-${rowIndex}-${colIndex}`}
                                    style={{
                                        ...styles.button,
                                        backgroundColor: value === 0 ? "#4CAF50" : value === 1 ? "#E74C3C" : "white",
                                        color: value === -1 ? "black" : "white",
                                        border: value === -1 ? "1px solid black" : "none",
                                    }}
                                    onClick={() => handleButtonClick(rowIndex, colIndex)}
                                >
                                    {value === 0 ? <RiCheckLine /> : value === 1 ? <RiCloseLine /> : <RiSubtractFill />}
                                    <div style={styles.textHorario}>{horarios[rowIndex][colIndex]}</div>
                                </button>
                            ))}
                        </div>
                    ))}
                </div>

                <div style={styles.containerBtn}>
                    <button style={styles.buttonVolver} onClick={() => navigate("/select-doctor", { state: { paciente: Paciente } })}>Volver</button>
                    <button style={styles.buttonAceptar} onClick={handleAccept}>Aceptar</button>
                </div>

                {showModal && (
                    <div style={styles.modalOverlay}>
                        <div style={styles.modal}>
                            <h3>Confirmar Cita</h3>
                            <p><strong>Doctor:</strong> {Doctor.Nombre}</p>
                            <p><strong>Especialidad:</strong> {Doctor.Especialidad}</p>
                            <p><strong>Paciente:</strong> {Paciente.Nombre}</p>
                            <p><strong>Cedula:</strong> {Paciente.Cedula}</p>
                            <p><strong>Fecha:</strong> {format(selectedDate, "yyyy-MM-dd")}</p>
                            <p><strong>Hora:</strong> {selectedTime}</p>

                            <div style={styles.containerBtn}>
                                <button style={styles.buttonVolver} onClick={() => setShowModal(false)}>Atrás</button>
                                <button style={styles.buttonAceptar} onClick={handleConfirm}>Confirmar</button>
                            </div>
                        </div>
                    </div>
                )}

                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            </div>
        </div>
    );
};


    // Estilos para el componente
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
            marginBottom: "10px",
        },
        button: {
            fontSize: "16px",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            margin: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "10px",
            cursor: "pointer",
            transition: "0.3s",
        },
        textHorario: {
            fontSize: "12px",
            marginTop: "5px",
            color: "#6c757d"
        },
        buttonVolver: {
            backgroundColor: "#3498db",
            border: "none",
            color: "white",
            padding: "10px 20px",
            textAlign: "center",
            textDecoration: "none",
            display: "inline-block",
            fontSize: "16px",
            margin: "10px",
            cursor: "pointer",
            borderRadius: "5px",
            width: "100px",
        },
        buttonAceptar: {
            backgroundColor: "#2ecc71",
            border: "none",
            color: "white",
            padding: "10px 20px",
            textAlign: "center",
            textDecoration: "none",
            display: "inline-block",
            fontSize: "16px",
            margin: "10px",
            cursor: "pointer",
            borderRadius: "5px",
            width: "100px",
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
            alignItems: "center",
        },
        modal: {
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            textAlign: "center",
            boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)",
            width: "300px",
        },
    };

export default CitasDoctor;