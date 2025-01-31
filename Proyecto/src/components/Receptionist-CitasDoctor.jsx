import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { BiSolidCalendar } from "react-icons/bi";
import { TfiCheck } from "react-icons/tfi";
import { TfiClose } from "react-icons/tfi";

const ReceptionistHorarioDoc = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(null);

    const horarios = [["8:00", "8:20", "8:40"], 
                      ["9:00", "9:20", "9:40"], 
                      ["10:00", "10:20", "10:40"], 
                      ["11:00", "11:20", "11:40"], 
                      ["13:00", "13:20", "13:40"], 
                      ["14:00", "14:20", "14:40"], 
                      ["15:00", "15:20", "15:40"], 
                      ["16:00", "16:20", "16:40"]];

    const matrizPrueba = [[1, 0, 0], 
                          [0, 0, 0], 
                          [0, 0, 1], 
                          [1, 1, 1], 
                          [1, 0, 1], 
                          [1, 0, 0], 
                          [1, 1, 1], 
                          [1, 1, 1]];  

    // Inicializar estado con los valores de matrizPrueba
    const [buttonStates, setButtonStates] = useState(matrizPrueba);

    const { doctor } = location.state || {};

    if (!doctor || typeof doctor.Nombre !== "string") {
        return (
            <div>
                <p>No se encontró información del doctor. Redirigiendo...</p>
                <button onClick={() => navigate("/list-doctorsReceptionistHorarioDoc")}>Volver</button>
            </div>
        );
    }

    const handleChange = (date) => {
        if (date instanceof Date) {
            setSelectedDate(date);
            const formattedDate = format(date, "yyyy-MM-dd");
            console.log("Fecha seleccionada (YYYY-MM-DD):", formattedDate);
        } else {
            console.error("Fecha inválida seleccionada:", date);
        }
    };

    const handleButtonClick = (row, col) => {
        // Alternar entre 0 y 1 en la matriz de estados
        setButtonStates((prevStates) => {
            const newStates = prevStates.map((r, rowIndex) =>
                r.map((val, colIndex) => 
                    rowIndex === row && colIndex === col ? (val === 0 ? 1 : 0) : val
                )
            );
            return newStates;
        });

        console.log(`Botón en (${row}, ${col}) cambiado a: ${buttonStates[row][col] === 0 ? 1 : 0}`);
    };

    return (
        <div style={styles.background}>
            <div style={styles.container}>
                <h2>{doctor.Nombre}</h2>
                <h3>{doctor.Especialidad}</h3>

                {/* Selector de fecha */}
                <div style={styles.datePickerDiv}>
                    <p style={styles.text2}><BiSolidCalendar style={{ fontSize: "20px" }} /> </p>
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleChange}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="YYYY-MM-DD"
                        className="customDatepicker"
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
                                        backgroundColor: value === 0 ? "#4CAF50" : "#E74C3C", // Verde si 0, rojo si 1
                                        color: "white"
                                    }}
                                    onClick={() => handleButtonClick(rowIndex, colIndex)}
                                >
                                    {value === 0 ? <TfiCheck /> : <TfiClose />}
                                    {/* Horario debajo del ícono */}
                                    <div style={styles.textHorario}>{horarios[rowIndex][colIndex]}</div>
                                </button>
                            ))}
                        </div>
                    ))}
                </div>

                {/* Botones de navegación */}
                <div style={styles.containerBtn}>
                    <button style={styles.buttonVolver} onClick={() => navigate("/list-doctors")}>Volver</button>
                    <button style={styles.buttonAceptar} onClick={() => navigate("/list-doctors")}>Aceptar</button>
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
