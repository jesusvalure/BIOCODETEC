const fs = require("fs");
const path = require("path");
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors({ origin: "http://localhost:5175" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


function saveData(fileName, data) {
    const dirPath = path.join(__dirname, "Data");
    const filePath = path.join(dirPath, fileName);

    try {
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }

        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
        console.log(`✅ Datos guardados en ${filePath}`);
    } catch (error) {
        console.error(`❌ Error al guardar datos en ${filePath}:`, error);
    }
}


// Función para cargar datos de un archivo JSON
function loadData(fileName) {
    try {
        const filePath = path.join(__dirname, "Data", fileName);
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, JSON.stringify([], null, 2), "utf-8"); // Crear archivo si no existe
            return [];
        }
        const jsonData = fs.readFileSync(filePath, "utf8");
        return JSON.parse(jsonData);
    } catch (error) {
        console.error("Error al cargar el archivo:", error);
        return [];
    }
}


// Endpoints para obtener datos
app.get("/patients", (req, res) => {
    res.json(loadData("patients.json"));
});

app.get("/doctors", (req, res) => {
    res.json(loadData("doctors.json"));
});

app.get("/admins", (req, res) => {
    res.json(loadData("admins.json"));
});

app.get("/receptionists", (req, res) => {
    res.json(loadData("receptionists.json"));
});

// Endpoint de login
app.post("/login", (req, res) => {
    console.log("Datos recibidos:", req.body);

    const { Usuario, Contrasena } = req.body;
    const patients = loadData("patients.json");
    const doctors = loadData("doctors.json");
    const admins = loadData("admins.json");
    const receptionists = loadData("receptionists.json");

    let patient = patients.find(u => u.Usuario.toLowerCase() === Usuario.toLowerCase() && u.Contrasena === Contrasena);
    let doctor = doctors.find(u => u.Usuario.toLowerCase() === Usuario.toLowerCase() && u.Contrasena === Contrasena);
    let admin = admins.find(u => u.Usuario.toLowerCase() === Usuario.toLowerCase() && u.Contrasena === Contrasena);
    let receptionist = receptionists.find(u => u.Usuario.toLowerCase() === Usuario.toLowerCase() && u.Contrasena === Contrasena);

    let userData = patient || doctor || admin || receptionist;
    
    if (userData) {
        res.json({
            success: true,
            message: "✅ Login exitoso",
            user: {
                Nombre: userData.Nombre,
                Usuario: userData.Usuario,
                Tipo: userData.Tipo,
            }
        });
    } else {
        let patientU = patients.find(x => x.Usuario.toLowerCase() === Usuario.toLowerCase() );
        let patientC = patients.find(x => x.Contrasena === Contrasena);
        let doctorU = doctors.find(x => x.Usuario.toLowerCase() === Usuario.toLowerCase());
        let doctorC = doctors.find(x => x.Contrasena === Contrasena);
        let adminU = admins.find(x => x.Usuario.toLowerCase() === Usuario.toLowerCase());
        let adminC = admins.find(x => x.Contrasena === Contrasena);
        let receptionistU = receptionists.find(x => x.Usuario.toLowerCase() === Usuario.toLowerCase());
        let receptionistC = receptionists.find(x => x.Contrasena === Contrasena);

        if (patientU && !patientC) {
            res.status(401).json({ success: false, message: "Contraseña incorrecta" });
        } else if (doctorU && !doctorC) {
            res.status(401).json({ success: false, message: "Contraseña incorrecta" });
        } else if (adminU && !adminC) {
            res.status(401).json({ success: false, message: "Contraseña incorrecta" });
        } else if (receptionistU && !receptionistC) {
            res.status(401).json({ success: false, message: "Contraseña incorrecta" });
        } else {
            res.status(401).json({ success: false, message: "Usuario no encontrado" });
        }
    }
});



// Endpoint para registrar un nuevo usuario
app.post("/register", (req, res) => {
    try {
        const { Nombre, Cedula, Celular, Correo, Edad, Peso, Estatura, Padecimientos, Usuario, Contrasena, Tipo} = req.body;


        const patients = loadData("patients.json");

        // Verificar si el usuario ya existe
        if (patients.some(user => user.Cedula === Cedula)) {
            return res.status(409).json({ message: "❌ El usuario con esta cédula ya existe" });
        }
        

        // Crear nuevo usuario
        const newUser = { Nombre, Cedula, Celular, Correo, Edad, Peso, Estatura, Padecimientos, Usuario, Contrasena, Tipo };
        patients.push(newUser);

        // Guardar en patients.json
        fs.writeFileSync(
            path.resolve(__dirname, "Data", "patients.json"),
            JSON.stringify(patients, null, 2)
        );

        res.json({ message: "✅ Usuario registrado con éxito", user: newUser });
    } catch (error) {
        console.error("❌ Error en /register:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

app.post("/registerEmployee", (req, res) => {
    try {
        const { Cedula, Nombre, Correo, Telefono, Usuario, Contrasena, Tipo, Especialidad } = req.body;
        
        let fileName;
        if (Tipo === "Doctor") {
            fileName = "doctors.json";
        } else if (Tipo === "Recepcionista") {
            fileName = "receptionists.json";
        } else {
            return res.status(400).json({ message: "❌ Tipo de usuario inválido" });
        }

        const employees = loadData(fileName);

        // Validar duplicados por Cédula o Usuario
        if (employees.some(emp => emp.Cedula === Cedula || emp.Usuario.toLowerCase() === Usuario.toLowerCase())) {
            return res.status(409).json({ message: "❌ El usuario ya existe" });
        }

        // Formato correcto del JSON
        let newEmployee;
        if (Tipo === "Doctor") {
            newEmployee = {
                Nombre,
                Cedula,
                Celular : Telefono,
                Correo,
                Usuario,
                Contrasena,
                Especialidad,
                Tipo : 2,
                DiasLaborales: [1, 0, 1, 0, 1, 0], // Lunes, Miércoles, Viernes
                Horario: {}, // Siempre vacío
            };
        } else if (Tipo === "Recepcionista") {
            newEmployee = {
                Nombre,
                Cedula,
                Celular : Telefono,
                Correo,
                Usuario,
                Contrasena,
                Tipo : 3,
            };
        }

        // Agregar al archivo correspondiente
        employees.push(newEmployee);
        saveData(fileName, employees);

        res.json({ message: `✅ ${Tipo} registrado con éxito`, user: newEmployee });
    } catch (error) {
        console.error("❌ Error en /registerEmployee:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});


app.post('/guardarcita', (req, res) => {
    console.log(req.body);
    const { NombreDoctor, Especialidad, NombrePaciente, CedulaPaciente, Fecha, Hora } = req.body;

    // Cargar los datos
    const doctores = loadData('doctors.json');
    const pacientes = loadData('patients.json');

    let doctor = doctores.find(d => d.Nombre === NombreDoctor);
    if (!doctor) return res.status(404).json({ success: false, message: "Doctor no encontrado" });

    // Inicializar estructura si no existe
    if (!doctor.Horario) doctor.Horario = {};
    if (!doctor.Horario[Fecha]) {
        doctor.Horario[Fecha] = Array(8).fill().map(() => Array(3).fill([0, { Paciente: "", Cedula: "", Tipo: "" }]));
    }

    // Obtener las coordenadas correctas
    let coordx = req.body.coordx;
    let coordy = req.body.coordy;

    if (coordx === -1 || coordy === -1) {
        return res.status(400).json({ success: false, message: "No hay espacio disponible para esta hora" });
    }

    // Guardar la cita en la matriz
    doctor.Horario[Fecha][coordx][coordy] = [1, { Paciente: NombrePaciente, Cedula: CedulaPaciente, Tipo: "Consulta" }];

    // Guardar en la lista de citas del paciente
    let paciente = pacientes.find(p => p.Cedula === CedulaPaciente);
    if (!paciente) return res.status(404).json({ success: false, message: "Paciente no encontrado" });

    if (!paciente.Citas) paciente.Citas = [];
    paciente.Citas.push({ Doctor: NombreDoctor, Especialidad, Fecha, Hora, Tipo: "Consulta", Sintomas: "", Diagnostico: "", Receta: "" });

    // Guardar en JSON
    saveData("doctors.json", doctores);
    saveData("patients.json", pacientes);

    res.status(200).json({ success: true, message: '✅ Cita confirmada y guardada correctamente', coordx, coordy });
});


app.put("/updateDoctorSchedule", (req, res) => {
    const { Cedula, DiasLaborales } = req.body; // Recibe la cédula del doctor y los nuevos días laborales

    if (!Cedula || !DiasLaborales) {
        return res.status(400).json({ message: "❌ Faltan datos: Cedula y DiasLaborales son requeridos" });
    }

    let doctors = loadData("doctors.json");

    // Buscar al doctor
    let doctorIndex = doctors.findIndex(d => d.Cedula === Cedula);
    if (doctorIndex === -1) {
        return res.status(404).json({ message: "❌ Doctor no encontrado" });
    }

    // Actualizar los días laborales
    doctors[doctorIndex].DiasLaborales = DiasLaborales;

    // Guardar cambios en doctors.json
    saveData("doctors.json", doctors);

    res.json({ message: "✅ Días laborales actualizados con éxito", doctor: doctors[doctorIndex] });
});

app.put("/updatePatient", (req, res) => {
    const { Cedula, Nombre, Correo, Celular, Edad, Peso, Estatura } = req.body;

    let patients = loadData("patients.json");
    let patientIndex = patients.findIndex(p => p.Cedula === Cedula);
    if (patientIndex === -1) return res.status(404).json({ message: "Paciente no encontrado" });

    patients[patientIndex] = { ...patients[patientIndex], Nombre, Correo, Celular, Edad, Peso, Estatura };
    saveData("patients.json", patients);

    res.json({ message: "Información actualizada con éxito", paciente: patients[patientIndex] });
});

app.get("/getPatientAppointments/:Cedula", (req, res) => {
    const { Cedula } = req.params;

    let patients = loadData("patients.json");
    let patient = patients.find(p => p.Cedula === Cedula);
    if (!patient) return res.status(404).json({ message: "Paciente no encontrado" });

    res.json(patient.Citas || []);
});

app.put("/actualizarinfoCita", (req, res) => {
    console.log(req.body);
    const { Cedula, Citas } = req.body;

    let patients = loadData("patients.json");
    let patientIndex = patients.findIndex(p => p.Cedula === Cedula);
    if (patientIndex === -1) return res.status(404).json({ message: "Paciente no encontrado" });

    patients[patientIndex].Citas = Citas;
    saveData("patients.json", patients);

    res.json({ message: "✅ Información de citas actualizada con éxito", citas: Citas });
  });

app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
