import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import doctors from "../backend/Data/doctors.json";
import { RiCalendar2Fill, RiCalendarCheckFill, RiLogoutBoxLine } from "react-icons/ri";

const ListTable = () => {
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/doctors.json")
      .then((response) => response.json())
      .then((data) => setDoctors(data))
      .catch((error) => {});
  }, []);

  return (
    <div style={styles.background}>
      <div style={styles.container}>
      <button 
                title="Volver" 
                style={styles.btnVolver} 
                onClick={() => navigate("/recepcionist-dashboard")}>
                  <RiLogoutBoxLine />
              </button>
      <h1 style={styles.title}>Panel de Recepcionista</h1>
      <div style={styles.buttons}>
            <button style={styles.buttonHere}>Consultar Horarios</button>
            <button style={styles.button}>Registrar Cita</button>
      </div>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Nombre</th>
            <th className="border border-gray-300 px-4 py-2">Especialidad</th>
            <th className="border border-gray-300 px-4 py-2">
              
            </th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{doctor.Nombre}</td>
              <td className="border border-gray-300 px-4 py-2">{doctor.Especialidad}</td>
              <td className="border border-gray-300 px-4 py-2 flex gap-2">
                <button 
                  title="Citas" 
                  style={styles.btnAction} 
                  onClick={() => navigate("/recept-citas-doc", { state: { doctor: doctor } })}>
                    <RiCalendar2Fill  />
                </button>
                <button 
                  title="Horarios" 
                  style={styles.btnAction} 
                  onClick={() => navigate("/horario-doctor", { state: { doctor: doctor } })}>
                    <RiCalendarCheckFill  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

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
  title: {
    marginBottom: "10px",
    fontSize: "35px",
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
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "20px",
    width: "500px",
    marginBottom: "20px",
  },
  button: {
    backgroundColor: "#4b5c7d",
    border: "3px solid #4b5c7d",
    borderRadius: "5px",
    padding: "8px 15px",
    cursor: "pointer",
    fontWeight: "bold",
    color: "white",
    width: "200px",
    margin: "0 5px",
  },
  buttonHere: {
    backgroundColor: "#4b5c7d",
    border: "3px solid #222d45",
    borderRadius: "5px",
    padding: "8px 15px",
    cursor: "pointer",
    fontWeight: "bold",
    color: "white",
    width: "200px",
    margin: "0 5px",
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
    fontSize: "20px"
  },
  btnVolver: {
    width: "30px",
    height: "30px",
    borderRadius: "5px",
    position: "absolute",
    left: "67%",
    top: "17%",
    marginDown: "5px",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    color: "#373f4f",
    fontSize: "20px"
  },
}


export default ListTable;