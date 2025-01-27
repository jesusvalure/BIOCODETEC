import React, { useState } from 'react';
import '../assets/Style.css';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.jpg';
import usuarios from '../Data/users.json';
import doctores from '../Data/doctors.json';
import recepcionistas from '../Data/receptionists.json'; 
import administradores from '../Data/admins.json';
import bcrypt from 'bcryptjs';

const LoginForm = () => {
    const navigate = useNavigate();

    const [errors, setErrors] = useState({ user: '', password: '' });

    const allUsers = [
        ...usuarios,
        ...doctores,
        ...recepcionistas,
        ...administradores
    ];

    const comparePassword = async (password, hashedPassword) => {
        const isMatch = await bcrypt.compare(password, hashedPassword);
        console.log("Password Match:", isMatch);
        return isMatch;
      };
    
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevenir comportamiento por defecto del formulario
        
        const password = event.target.password.value.trim();
        const user = event.target.user.value.trim();

        setErrors({ user: '', password: '' });

        const loggedInUser = allUsers.find((u) => u.Usuario === user);

        if (!loggedInUser) {
            setErrors(prev => ({ ...prev, user: 'El usuario no existe' }));
        } else if (loggedInUser.Contrasena !== password) {
            setErrors((prev) => ({ ...prev, password: "Contraseña incorrecta" }));
        } else {
            // Aquí entra solo si el usuario existe
            switch (loggedInUser.Tipo) {
                case 4:
                    navigate('/admin-dashboard');
                    break;
                case 1:
                    navigate("/panel-paciente", { state: { user: loggedInUser } });
                    break;
                case 2:
                    navigate('/doctor-dashboard');
                    break;
                case 3:
                    navigate('/recepcionist-dashboard');
                    break;
                default:
                    alert('Tipo de usuario no reconocido');
            }
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
                        {errors.user && <small className="text-danger mt-2">{errors.user}</small>}
                        <input
                            type="text"
                            id="user"
                            name="user"
                            placeholder="Ingrese su usuario"
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="password">Contraseña</label>
                        {errors.password && <small className="text-danger mt-2">{errors.password}</small>}
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Ingrese su contraseña"
                            className="form-control"
                            required
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
