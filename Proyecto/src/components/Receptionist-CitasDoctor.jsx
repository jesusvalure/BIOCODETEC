import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { RiCalendar2Fill, RiSubtractFill, RiCloseLine, RiCheckLine } from "react-icons/ri";

const ReceptionistHorarioDoc = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [matrizCitas, setMatrizCitas] = useState(Array(8).fill().map(() => Array(3).fill(-1)));
    const [diasLaboralesDoc, setDiasLaboralesDoc] = useState(null);
    const [buttonStates, setButtonStates] = useState(null);

    const horarios = [["8:00", "8:20", "8:40"], 
                      ["9:00", "9:20", "9:40"], 
                      ["10:00", "10:20", "10:40"], 
                      ["11:00", "11:20", "11:40"], 
                      ["13:00", "13:20", "13:40"], 
                      ["14:00", "14:20", "14:40"], 
                      ["15:00", "15:20", "15:40"], 
                      ["16:00", "16:20", "16:40"]];

    const Doctor = location.state?.doctor;

    console.log(Doctor);

    if (!Doctor || typeof Doctor.Nombre !== "string") {
        return (
            <div>
                <p>No se encontró información del doctor. Redirigiendo...</p>
                <button onClick={() => navigate("/list-doctorsReceptionistHorarioDoc")}>Volver</button>
            </div>
        );
    }

    useEffect(() => {
        if (Doctor && Doctor.DiasLaborales) {
            setDiasLaboralesDoc(Doctor.DiasLaborales);
        }
    }, [Doctor]);

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
        if (matrizCitas[row][col][0] === 1) {
            // Si el cupo está ocupado, no hacer nada
            return;
        }

         if (date instanceof Date) {
            setSelectedDate(date);
            const formattedDate = format(date, "yyyy-MM-dd");

            if (Doctor.Horario[formattedDate]) {
                const matrizJson = Doctor.Horario[formattedDate];
                setMatrizCitas(matrizJson.map(fila => fila.map(celda => celda[0])));
                console.log("Matriz seteada desde el JSON");
            } else {
                setMatrizCitas(Array(8).fill().map(() => Array(3).fill(0))); // Llenar con ceros si la fecha no existe
            }
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
        try {
            const response = await fetch('http://localhost:5000/guardarcita', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(Doctor.Nombre,Doctor.Especialidad,Paciente.Nombre,Paciente.Cedula,formattedDate,selectedTime),
            });
    
            if (response.ok) {
                console.log('Cita confirmada y guardada');
                setShowModal(false);
                navigate("/recepcionist-dashboard");
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

                {/* Botones de navegación */}
                <div style={styles.containerBtn}>
                    <button style={styles.buttonVolver} onClick={() => navigate("/list-doctors", { state: { paciente: Paciente } })}>Volver</button>
                    <button style={styles.buttonAceptar} onClick={handleAccept}>Aceptar</button>
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
    containerBtn: {
        backgroundColor: "#d0dcf5",
        marginTop: "25px"
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
        width: "100px",
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
        width: "100px",
    }
};

export default ReceptionistHorarioDoc;
