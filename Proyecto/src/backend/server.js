const fs = require("fs");
const path = require("path");
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors({ origin: "http://localhost:5174" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


function saveData(fileName, data) {
    const filePath = path.join(__dirname, "data", fileName);
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    } catch (error) {
        console.error("❌ Error al guardar datos:", error);
    }
}

// Función para cargar datos de un archivo JSON
function loadData(fileName) {
    try {
        const filePath = path.resolve(__dirname, "Data", fileName);
        if (!fs.existsSync(filePath)) {
            throw new Error(`Archivo no encontrado: ${filePath}`);
        }

        const jsonData = fs.readFileSync(filePath, "utf8");
        return JSON.parse(jsonData);
    } catch (error) {
        console.error("Error al cargar el archivo:", error);
        return []; // o lanzar error
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


// Ruta para guardar la cita
app.post('/guardar-cita', (req, res) => {
    console.log(req.body);
    const cita = req.body;

    // Cargar los datos de doctores y pacientes
    const doctores = loadData('doctors.json');
    const pacientes = loadData('patients.json');

    // Buscar el doctor en los datos cargados
    const doctor = doctores.find(d => d.Cedula === cita.doctorCedula);

    if (!doctor) {
        return res.status(404).send('Doctor no encontrado');
    }

    // Obtener la fecha seleccionada
    const fecha = cita.fecha;

    // Verificar si ya existe ese día en el horario del doctor
    if (!doctor.Horario[fecha]) {
        doctor.Horario[fecha] = [
            // Cada uno de los intervalos de hora
            [[0, { "Paciente": "", "Cedula": "", "Tipo": "" }],
             [1, { "Paciente": "", "Cedula": "", "Tipo": "" }]],
        ];
    }

    // Buscar un espacio vacío (0) en el horario
    let espacioDisponible = false;
    const horario = doctor.Horario[fecha];

    for (let i = 0; i < horario.length; i++) {
        for (let j = 0; j < horario[i].length; j++) {
            if (horario[i][j][0] === 0) {
                horario[i][j] = [1, {Paciente: cita.paciente, Cedula: cita.pacienteCedula, Tipo: cita.tipoCita}];
                espacioDisponible = true;
                break;
            }
        }
        if (espacioDisponible) break;
    }

    if (!espacioDisponible) {
        return res.status(400).send('No hay espacio disponible para la cita en la fecha seleccionada');
    }

    // Guardar los cambios en los doctores
    saveData('doctors.json', doctores);

    // Ahora actualizamos los datos del paciente
    const paciente = pacientes.find(p => p.Cedula === cita.pacienteCedula);

    if (!paciente) {
        return res.status(404).send('Paciente no encontrado');
    }

    // Agregar la cita al historial del paciente
    if (!paciente.Citas) {
        paciente.Citas = [];
    }

    paciente.Citas.push({
        doctor: cita.doctor,
        especialidad: cita.especialidad,
        fecha: cita.fecha,
        hora: cita.hora,
        tipo: cita.tipoCita
    });

    // Guardar los cambios en los pacientes
    saveData('patients.json', pacientes);

    res.status(200).send({ message: 'Cita confirmada y guardada correctamente' });
});

app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
