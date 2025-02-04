import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { RiFileTransferLine, RiLogoutBoxLine } from "react-icons/ri";
import pacientes from '../backend/Data/patients.json';

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const doctor = location.state?.doctor;

  const [selectedDate, setSelectedDate] = useState(null);

  const fechas = Object.keys(doctor.Horario);

  const handleCrearExpediente = (c) => {
    let cedula = c.Cedula;
    let pac = pacientes.find(p => p.Cedula === cedula);

    console.log(pac);

    navigate("/crear-expediente", {state:{paciente: pac, doctor: doctor, cita: c}})
  };

  return (
    <div style={styles.background}>
      <div style={styles.container}>
        <div style={styles.divVolver}>
          <button style={styles.btn} onClick={() => navigate("/")}><RiLogoutBoxLine/></button>
        </div>
        <h1 className="text-center mb-4">Bienvenido Dr. {doctor.Nombre}</h1>
        
        {/* Acordeón de Fechas */}
        {doctor && (
        <div style={{ marginBottom: "20px" }}>
          <p>Selecciona una fecha:</p>
          <select 
            onChange={(e) => setSelectedDate(e.target.value)} 
            value={selectedDate || ""}
            style={styles.select}
          >
            <option value="" disabled>Elige una fecha</option>
            {Object.keys(doctor.Horario).map((fecha, index) => (
              <option key={index} value={fecha}>
                {fecha}
              </option>
            ))}
          </select>
        </div>
      )}

        {/* Tabla de Pacientes */}
        {selectedDate && (
        <div>
          <h2>Pacientes Asignados para {selectedDate}</h2>
          <div style={styles.tableContainer}>
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2">Paciente</th>
                  <th className="border border-gray-300 px-4 py-2">Cédula</th>
                  <th className="border border-gray-300 px-4 py-2">Tipo</th>
                  <th className="border border-gray-300 px-4 py-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {doctor.Horario[selectedDate]
                  .flat()
                  .filter(([status, data]) => status === 1)
                  .map(([_, cita], index) => (
                    <tr key={index}>
                      <td>{cita.Paciente}</td>
                      <td>{cita.Cedula}</td>
                      <td>{cita.Tipo}</td>
                      <td>
                        <button style={styles.btnAction} onClick={() => handleCrearExpediente(cita)}>
                          <RiFileTransferLine />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
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
    height: "auto",
  },
  tableContainer: {
    maxHeight: "300px", // Altura máxima de la tabla
    overflowY: "auto",  // Habilita el scroll vertical
    border: "1px solid #ccc",
    marginTop: "10px",
  },
  dateButton: {
    backgroundColor: "#4A90E2",
    color: "white",
    padding: "10px",
    margin: "5px 0",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  btnAction: {
    width: "30px",
    height: "30px",
    padding: "10px",
    borderRadius: "5px",
    marginLeft: "15px",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    color: "black",
    fontSize: "20px",
  },
  btn: {
    width: "40px",
    height: "40px",
    borderRadius: "5px",
    position: "relative",
    marginDown: "5px",
    border: "none",
    left: "280px",
    top: "1px",
    background: "transparent",
    cursor: "pointer",
    color: "#373f4f",
    fontSize: "20px"
  },
  divVolver: {
    display: "flex",
    height: "10px",
    marginTop: "0px",
    padding: "0px",

  }
};

export default DoctorDashboard;
