import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

const HorarioDoctor = () => {
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

    // Estado para la matriz de botones
    const [buttonStates, setButtonStates] = useState(
        Array(8).fill(null).map(() => Array(3).fill(false)) // 8 filas x 3 columnas inicializadas como "false"
    );

    const { doctor } = location.state || {};

    if (!doctor || typeof doctor.Nombre !== "string") {
        return (
            <div>
                <p>No se encontró información del doctor. Redirigiendo...</p>
                <button onClick={() => navigate("/select-doctor")}>Volver</button>
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
        // Modificar el estado del botón seleccionado
        setButtonStates((prevStates) => {
            const newStates = [...prevStates];
            newStates[row][col] = !newStates[row][col]; // Alterna entre true/false
            return newStates;
        });

        console.log(`Botón en (${row}, ${col}) presionado. Nuevo estado: ${!buttonStates[row][col]}`);
    };

    return (
        <div style={styles.background}>
            <div style={styles.container}>
                <div style={styles.info}>
                    <h3>{doctor.Nombre}</h3>
                    <h3 style={styles.text1}>{doctor.Especialidad}</h3>
                </div>

                <div style={styles.datePickerDiv}>
                    <p style={styles.text2}>Fecha: </p>
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleChange}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="YYYY-MM-DD"
                    />
                </div>                

                {/* Matriz de botones */}
                <div style={styles.grid}>
                    {buttonStates.map((row, rowIndex) => (
                        <div key={`row-${rowIndex}`} style={styles.row}>
                            {row.map((col, colIndex) => (
                                <button
                                    key={`button-${rowIndex}-${colIndex}`}
                                    style={{
                                        ...styles.button,
                                        backgroundColor: buttonStates[rowIndex][colIndex] ? "#4CAF50" : "#fff",
                                    }}
                                    onClick={() => handleButtonClick(rowIndex, colIndex)}
                                >
                                     {horarios[rowIndex][colIndex]} {/* Etiqueta del botón */}
                                </button>
                            ))}
                        </div>
                    ))}
                </div>

                <button style={styles.buttonVolver} onClick={() => navigate("/")}>Volver</button>
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
    datePickerDiv: {
        backgroundColor: "#d0dcf5",
        display: "flex",
        justifyContent: "left",
        alignItems: "column",
        height: "20px",
        width: "350px",
    },
    container: {
        backgroundColor: "#d0dcf5",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        textAlign: "center",
        width: "350px",
    },
    info: {
        backgroundColor: "#d0dcf5",
        borderRadius: "10px",
        textAlign: "left",
        width: "300px",
    },
    text1: {
        fontSize: "16px",
        marginTop: "5px",
    },
    text2: {
        fontSize: "16px",
        marginRight: "30px",
        marginTop: "2px",
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(1, 1fr)", // 3 columnas
        gap: "1px",
        marginTop: "20px",
    },
    row: {
        display: "flex",
        justifyContent: "center",
    },
    button: {
        width: "70px",
        padding: "10px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        cursor: "pointer",
        fontWeight: "bold",
        color: "black",
        textAlign: "center",
    },
    buttonVolver: {
        backgroundColor: "#373f4f",
        border: "1px solid #ccc",
        borderRadius: "5px",
        marginTop: "20px",
        cursor: "pointer",
        fontWeight: "bold",
        color: "white"
      }

};

export default HorarioDoctor;
