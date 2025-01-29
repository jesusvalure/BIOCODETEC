const fs = require("fs");
const path = require("path");
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors({ origin: "http://localhost:5175" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Función para cargar datos de un archivo JSON
function loadData(fileName) {
    try {
        const filePath = path.resolve(__dirname, "Data", fileName);
        
        if (!fs.existsSync(filePath)) {
            console.warn(`⚠️ Archivo no encontrado: ${filePath}`);
            return []; // Devuelve un array vacío si el archivo no existe
        }

        const jsonData = fs.readFileSync(filePath, "utf8");
        return JSON.parse(jsonData);
    } catch (error) {
        console.error("❌ Error cargando el archivo:", error);
        return [];
    }
}

// Endpoints para obtener datos
app.get("/users", (req, res) => {
    res.json(loadData("users.json"));
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
    const users = loadData("users.json");
    const doctors = loadData("doctors.json");
    const admins = loadData("admins.json");
    const receptionists = loadData("receptionists.json");

    let user = users.find(u => u.Usuario.toLowerCase() === Usuario.toLowerCase() && u.Contrasena === Contrasena);
    let doctor = doctors.find(u => u.Usuario.toLowerCase() === Usuario.toLowerCase() && u.Contrasena === Contrasena);
    let admin = admins.find(u => u.Usuario.toLowerCase() === Usuario.toLowerCase() && u.Contrasena === Contrasena);
    let receptionist = receptionists.find(u => u.Usuario.toLowerCase() === Usuario.toLowerCase() && u.Contrasena === Contrasena);

    let userData = user || doctor || admin || receptionist;
    
    if (userData) {
        res.json({
            success: true,
            message: "✅ Login exitoso",
            user: {
                Usuario: userData.Usuario,
                Tipo: userData.Tipo,
            }
        });
    } else {
        res.status(401).json({ success: false, message: "❌ Usuario o contraseña incorrectos" });
    }
});



// Endpoint para registrar un nuevo usuario
app.post("/register", (req, res) => {
    console.log("Datos recibidos:", req.body);

    const { Usuario, Contrasena, Tipo } = req.body;
    const users = loadData("users.json");

    const existingUser = users.find(u => u.Usuario.toLowerCase() === Usuario.toLowerCase());
    if (existingUser) {
        res.status(400).json({ success: false, message: "❌ El usuario ya existe" });
        return;
    }

    const newUser = { Usuario, Contrasena, Tipo };
    users.push(newUser);

    fs.writeFileSync(path.resolve(__dirname, "Data", "users.json"), JSON.stringify(users, null, 2));
    res.json({ success: true, message: "✅ Usuario registrado exitosamente", user: newUser });
});




// Iniciar servidor
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
