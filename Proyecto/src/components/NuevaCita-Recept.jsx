import { useState, useEffect } from "react";
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
  const [pacientes, setPacientes] = useState([]);  // Estado para almacenar pacientes
  const [doctores, setDoctores] = useState([]);    // Estado para almacenar doctores
  const navigate = useNavigate();

  // Obtener los pacientes y doctores desde la API cuando el componente se monta
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Realizar peticiones a la API para obtener pacientes y doctores
        const pacientesResponse = await fetch('http://localhost:5000/patients');
        const doctoresResponse = await fetch('http://localhost:5000/doctors');
        
        const pacientesData = await pacientesResponse.json();
        const doctoresData = await doctoresResponse.json();

        // Actualizar los estados con los datos obtenidos
        setPacientes(pacientesData);
        setDoctores(doctoresData);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, []);

  // Obtener las especialidades únicas de los doctores
  const especialidades = [...new Set(doctores.map((doc) => doc.Especialidad))];

  const handleEspecialidadChange = (e) => {
    const selectedEspecialidad = e.target.value;
    setEspecialidad(selectedEspecialidad);

    // Filtrar doctores por la especialidad seleccionada
    setDoctoresFiltrados(
      doctores.filter((doc) => doc.Especialidad === selectedEspecialidad)
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
    borderRadius: "8px",
    width: "80%",
    maxWidth: "500px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
    textAlign: "center",
  },
  field: {
    marginBottom: "15px",
  },
  label: {
    fontSize: "16px",
    marginBottom: "8px",
  },
  divField: {
    display: "flex",
    alignItems: "center",
  },
  input: {
    padding: "10px",
    fontSize: "14px",
    borderRadius: "4px",
    width: "80%",
  },
  buttonSmall: {
    padding: "10px",
    fontSize: "14px",
    cursor: "pointer",
    marginLeft: "10px",
    backgroundColor: "#4caf50",
    border: "none",
    borderRadius: "4px",
  },
  select: {
    padding: "10px",
    fontSize: "14px",
    borderRadius: "4px",
    width: "100%",
  },
  error: {
    color: "red",
    fontSize: "12px",
  },
  pacienteInfo: {
    marginTop: "10px",
    fontSize: "14px",
    backgroundColor: "#f5f5f5",
    padding: "10px",
    borderRadius: "5px",
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    width: "45%",
  },
};

export default FormNuevaCitaRecept;
