import  { useState } from 'react';
import '../assets/Style.css';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.jpg';
import { TbContainer } from 'react-icons/tb';
import pacientes from '../backend/Data/patients.json'
import doctores from '../backend/Data/doctors.json'
import recepcionistas from '../backend/Data/receptionists.json'
import admins from '../backend/Data/admins.json'

const LoginForm = () => {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [errorUsuario, setErrorUsuario] = useState("");
    const [errorContrasena, setErrorContrasena] = useState("");
    const [message, setMessage] = useState("");

    const buscarUsuario = (nombreUsuario) => {
        const listas = [pacientes, doctores, recepcionistas, admins];
    
        for (const lista of listas) {
            const usuarioEncontrar = lista.find(u => u.Usuario === nombreUsuario);
            if (usuarioEncontrar) {
                return usuarioEncontrar; // Retorna el objeto tal cual está en la lista
            }
        }
    
        return null; // No se encontró el usuario
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorUsuario(""); // Resetea los errores antes de una nueva validación
        setErrorContrasena("");

        if (!usuario) {
            setErrorUsuario("⚠️ Ingresa tu usuario");
            return;
        } 
        if (!contrasena) {
            setErrorContrasena("⚠️ Ingresa tu contraseña");
            return;
        }

        const enviarUsuario = buscarUsuario(usuario);
    
        try {
            const response = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ Usuario: usuario, Contrasena: contrasena }),
            });
            console.log("Point 1");
    
            const data = await response.json();
            
            if (data.success) {
                
                const loggedUser = { ...data.user, nombre: data.user.usuario }; 
                localStorage.setItem("user", JSON.stringify(loggedUser));
                console.log("Usuario logueado:", loggedUser);
                console.log("Point 2");
                // Redirección según el tipo de usuario
                switch (Number(loggedUser.Tipo)) {  // Asegura que Tipo sea numérico
                    case 4:
                        navigate("/admin-dashboard", {state: { paciente: enviarUsuario }});
                        break;
                    case 2:
                        navigate("/doctor-dashboard", {state: { paciente: enviarUsuario }});
                        break;
                    case 3:
                        navigate("/recepcionist-dashboard", {state: { paciente: enviarUsuario }});
                        break;
                    case 1:
                        console.log("Point 3");
                        navigate("/panel-paciente", {state: { paciente: enviarUsuario }});
                        break;
                    default:
                        setMessage("❌ Error: Rol de usuario no válido");
                }
            } else {
                // Dependiendo del error, muestra el mensaje debajo del campo correspondiente
                if (data.message.includes("Usuario no encontrado")) {
                    setErrorUsuario("❌ Usuario no registrado");
                } else if (data.message.includes("Contraseña incorrecta")) {
                    setErrorContrasena("❌ Contraseña incorrecta");
                } else {
                    setErrorUsuario("❌ Error desconocido, intenta de nuevo.");
                }
            }
        } catch (error) {
            setMessage("❌ Error de conexión con el servidor");
        }
    };
    
    const handleCreateAccount = () => {
        navigate('/register'); // Redirige a la pantalla de registro
    };

    return (
        <div className="login-container d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4 shadow-lg" style={styles}>
            <div className="text-center mb-4">
                <img
                    src={logo}
                    alt="MediTech Logo"
                    style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        borderRadius: "50%"
                    }}
                />
            </div>
            <h2 className="text-center mb-4">Inicio de sesión</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group mb-3" style={styles.contInput}>
                    <label htmlFor="user">Usuario</label>
                    <input
                        type="text"
                        id="user"
                        name="user"
                        placeholder="Ingrese su usuario"
                        style={styles.textInput}
                        required
                        value={usuario} // Vincula el estado
                        onChange={(e) => setUsuario(e.target.value)} // Actualiza el estado
                    />
                    {errorUsuario && <p style={styles.textError}>{errorUsuario}</p>}
                </div>
                <div className="form-group mb-4" style={styles.contInput}>
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Ingrese su contraseña"
                        style={styles.textInput}
                        required
                        value={contrasena} // Vincula el estado
                        onChange={(e) => setContrasena(e.target.value)} // Actualiza el estado
                    />
                    {errorContrasena && <p style={styles.textError}>{errorContrasena}</p>}
                </div>
                <button type="submit" style={styles.button}>
                    Iniciar Sesión
                </button>
            </form>

            <div className="text-center mt-3">
                <a href="#create-account" 
                onClick={handleCreateAccount} 
                className="d-block">
                    ¿No estás registrado? Crea una cuenta
                </a>
            </div>
        </div>
    </div>
        
    );
};

const styles = {
    container: {
        textAlign: "center",
    },
    contInput: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    button: {
        backgroundColor: "#373f4f",
        border: "1px solid #ccc",
        borderRadius: "5px",
        padding: "8px 15px",
        cursor: "pointer",
        fontWeight: "bold",
        fontSize: "12px",
        color: "white",
        width: "150px",
        margin: "10px",
    },
    textError: {
        color: "red",
        fontSize: "12px",
        marginTop: "0px",
    },
    textInput: {
        width: "70%",
        padding: "8px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        marginBottom: "10px",
    }
};


export default LoginForm;
