import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import doctors from "../backend/Data/doctors.json";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { GrSchedules } from "react-icons/gr";
import { HiArrowRightStartOnRectangle } from "react-icons/hi2";

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
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Nombre</th>
            <th className="border border-gray-300 px-4 py-2">Especialidad</th>
            <th className="border border-gray-300 px-4 py-2">
              <button title="Volver" style={styles.btnVolver} onClick={() => navigate("/recepcionist-dashboard")}><HiArrowRightStartOnRectangle /></button>
            </th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{doctor.Nombre}</td>
              <td className="border border-gray-300 px-4 py-2">{doctor.Especialidad}</td>
              <td className="border border-gray-300 px-4 py-2 flex gap-2">
                <button title="Citas" style={styles.btnAction}><GrSchedules /></button>
                <button title="Horarios" style={styles.btnAction}><RiCalendarScheduleLine /></button>
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
    backgroundColor: "#d0dcf5",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
    width: "600px",
  },
  title: {
    marginBottom: "20px",
    fontSize: "18px",
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
    justifyContent: "space-between",
    marginTop: "20px",
  },
  button: {
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "8px 15px",
    cursor: "pointer",
    fontWeight: "bold",
    color: "black",
    width: "100px",
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
    color: "black"
  },
  btnVolver: {
    width: "30px",
    height: "30px",
    borderRadius: "5px",
    position: "relative",
    left: "40%",
    marginDown: "5px",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    color: "white",
    fontSize: "20px"
  },
}


export default ListTable;