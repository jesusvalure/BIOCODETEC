import  { useState } from 'react';
import '../assets/Style.css';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.jpg';

const LoginForm = () => {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [message, setMessage] = useState("");
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Usuario:", usuario);
        console.log("Contraseña:", contrasena);
    
        try {
            const response = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ Usuario: usuario, Contrasena: contrasena }),
            });
    
            const data = await response.json();
            
            if (data.success) {
                const loggedUser = { ...data.user, nombre: data.user.usuario }; 
                localStorage.setItem("user", JSON.stringify(loggedUser));
                console.log("Usuario logueado:", loggedUser);
    
                // Redirección según el tipo de usuario
                switch (Number(loggedUser.Tipo)) {  // Asegura que Tipo sea numérico
                    case 4:
                        navigate("/admin-dashboard");
                        break;
                    case 2:
                        navigate("/doctor-dashboard");
                        break;
                    case 3:
                        navigate("/recepcionist-dashboard");
                        break;
                    case 1:
                        navigate("/panel-paciente");
                        break;
                    default:
                        setMessage("❌ Error: Rol de usuario no válido");
                }
            } else {
                setMessage("❌ " + data.message);
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
        <div className="card p-4 shadow-lg" style={{ width: '400px' }}>
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
    <div className="form-group mb-3">
        <label htmlFor="user">Usuario</label>
        <input
            type="text"
            id="user"
            name="user"
            placeholder="Ingrese su usuario"
            className="form-control"
            required
            value={usuario} // Vincula el estado
            onChange={(e) => setUsuario(e.target.value)} // Actualiza el estado
        />
    </div>
    <div className="form-group mb-4">
        <label htmlFor="password">Contraseña</label>
        <input
            type="password"
            id="password"
            name="password"
            placeholder="Ingrese su contraseña"
            className="form-control"
            required
            value={contrasena} // Vincula el estado
            onChange={(e) => setContrasena(e.target.value)} // Actualiza el estado
        />
    </div>
    <button type="submit" className="btn btn-primary w-100">
        Iniciar Sesión
    </button>
</form>

            <div className="text-center mt-3">
                <a href="#create-account" onClick={handleCreateAccount} className="d-block">¿No estás registrado? Crea una cuenta</a>
            </div>
        </div>
    </div>
        
    );
};

export default LoginForm;
