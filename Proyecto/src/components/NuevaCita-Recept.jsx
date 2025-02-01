import  { useState } from "react";
import doctors from '../backend/Data/doctors.json';
import pacientes from '../backend/Data/users.json';
import { useNavigate } from 'react-router-dom';
import { RiUserFollowFill } from "react-icons/ri";

const FormNuevaCitaRecept = () => {
  const [especialidad, setEspecialidad] = useState("");
  const [doctor, setDoctor] = useState("");
  const [doctoresFiltrados, setDoctoresFiltrados] = useState([]);
  const [errorEspecialidad, setErrorEspecialidad] = useState("");
  const [errorDoctor, setErrorDoctor] = useState("");
  const [cedula, setCedula] = useState("");
  const [pacienteEncontrado, setPacienteEncontrado] = useState(null);
  const [errorCedula, setErrorCedula] = useState("");
  const navigate = useNavigate();

  // Obtener las especialidades únicas del JSON
  const especialidades = [...new Set(doctors.map((doc) => doc.Especialidad))];

  const handleEspecialidadChange = (e) => {
    const selectedEspecialidad = e.target.value;
    setEspecialidad(selectedEspecialidad);

    // Filtrar doctores por la especialidad seleccionada
    setDoctoresFiltrados(
      doctors.filter((doc) => doc.Especialidad === selectedEspecialidad)
    );
    setDoctor("");
    setErrorEspecialidad("");
  };

  const handleDoctorChange = (e) => {
    setDoctor(e.target.value);
    setErrorDoctor("");
  };

  const handleCedulaChange = (e) => {
    let value = e.target.value;
  
    // Permitir solo números y guiones, pero sin forzar el formato desde el principio
    value = value.replace(/[^0-9-]/g, "");
  
    // Aplicar el límite de caracteres
    if (value.length > 10) return;
  
    setCedula(value);
  
    // Validar solo si tiene el formato completo
    if (value.length === 10 && !/^\d{1}-\d{4}-\d{4}$/.test(value)) {
      setErrorCedula("Formato incorrecto. Debe ser 112341234");
    } else {
      setErrorCedula("");
    }
  };
  
  // Buscar paciente al presionar "Verificar"
  const handleVerificarCedula = () => {
    const paciente = pacientes.find((p) => p.Cedula === cedula);

    if (paciente) {
      setPacienteEncontrado(paciente);
      setErrorCedula(""); // Borrar errores previos
    } else {
      setPacienteEncontrado(null);
      setErrorCedula("Cédula no encontrada.");
    }
  };

  const handleAceptar = () => {
    let valid = true;
  
    if (!especialidad) {
      setErrorEspecialidad("Por favor, selecciona una especialidad.");
      valid = false;
    }
    if (!doctor) {
      setErrorDoctor("Por favor, selecciona un doctor.");
      valid = false;
    }
    if (!pacienteEncontrado) {
      setErrorCedula("Debes verificar la cédula antes de continuar.");
      valid = false;
    }
  
    if (valid) {
      const selectedDoctor = doctoresFiltrados.find((doc) => doc.Nombre === doctor);
  
      navigate("/citas-doctor-recept", { 
        state: { 
          doctor: selectedDoctor, 
          paciente: pacienteEncontrado 
        } 
      });
    }
  };

  const handleVolver = () => {
    navigate("/recepcionist-dashboard");
  };

  return (
    <div style={styles.background}>
      <div style={styles.container}>
        <h2 style={styles.title}>Registrar cita</h2>
        <div style={styles.field}>
          <label style={styles.label}>Número de Cédula:</label>
          <div style={styles.divField}>
            <input
              type="text"
              value={cedula}
              onChange={handleCedulaChange}
              style={styles.input}
              placeholder="Ej: 112341234"
            />
            <button title="Verificar" onClick={handleVerificarCedula} style={styles.buttonSmall}>
              <RiUserFollowFill />
            </button>
          </div>
          {errorCedula && <p style={styles.error}>{errorCedula}</p>}
          {pacienteEncontrado && (
            <div style={styles.pacienteInfo}>
              <p><strong>Nombre:</strong> {pacienteEncontrado.Nombre}</p>
              <p><strong>Correo:</strong> {pacienteEncontrado.Correo}</p>
            </div>
          )}
        </div>
        <div style={styles.field}>
          <label style={styles.label}>Especialidad:</label>
          <select
            value={especialidad}
            onChange={handleEspecialidadChange}
            style={styles.select}
            disabled={!pacienteEncontrado} // Bloqueado si no hay paciente
          >
            <option value="">-- Selecciona una especialidad --</option>
            {especialidades.map((esp, index) => (
              <option key={index} value={esp}>{esp}</option>
            ))}
          </select>
          {errorEspecialidad && <p style={styles.error}>{errorEspecialidad}</p>}
        </div>
        <div style={styles.field}>
          
          <label style={styles.label}>Doctor:</label>
          <select
            value={doctor}
            onChange={handleDoctorChange}
            style={styles.select}
            disabled={!especialidad}
          >
            <option value="">-- Selecciona un doctor --</option>
            {doctoresFiltrados.map((doc, index) => (
              <option key={index} value={doc.Nombre}>
                {doc.Nombre}
              </option>
            ))}
          </select>
          {errorDoctor && <p style={styles.error}>{errorDoctor}</p>}
        </div>
        <div style={styles.buttons}>
          <button onClick={handleVolver} style={styles.button}>
            Atrás
          </button>
          <button onClick={handleAceptar} style={styles.button}>
            Aceptar
          </button>
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
  container: {
    backgroundColor: "#d0dcf5",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
    width: "300px",
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
    backgroundColor: "#4b5c7d",
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "8px 15px",
    cursor: "pointer",
    fontWeight: "bold",
    color: "white",
    width: "200px",
    margin: "0 5px",
  },
  success: {
    color: "green",
    fontSize: "12px",
    marginTop: "5px",
  },
  input: {
    width: "75%",
    height: "10px",
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  buttonSmall: {
    backgroundColor: "transparent",
    border: "none",
    color: "green",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "0px",
    marginLeft: "1px",
    marginBottom: "0px",
    fontSize: "25px",
    height: "40px",
    padding: "8px",
  },
  pacienteInfo: {
    backgroundColor: "#e0f7fa", // Azul claro
    padding: "10px",
    borderRadius: "5px",
    marginTop: "10px",
    border: "1px solid #4CAF50",
    color: "#00796b",
    textAlign: "left",
    fontSize: "14px"
  },
  divField: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    alignItems: "center",
  },
};


export default FormNuevaCitaRecept;