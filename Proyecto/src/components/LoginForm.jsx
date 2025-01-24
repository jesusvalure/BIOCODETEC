import React from 'react';
import '../assets/Style.css';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.jpg';

const LoginForm = () => {
    const navigate = useNavigate();

    // Credenciales válidas de ejemplo
    const validCredentials = {
        email: "admin123@gmail.com",
        password: "admin123"
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevenir comportamiento por defecto del formulario
        const email = event.target.email.value;
        const password = event.target.password.value;

        if (email === validCredentials.email && password === validCredentials.password) {
            alert("Inicio de sesión exitoso");
            navigate("/admin-dashboard"); // Redirigir al Dashboard del Administrador
        }if (email === 'cliente@mail.com' && password === '12345') {
            navigate('/client-profile'); 
        }if (email === 'doctor@mail.com' && password === 'doctor123') {
            navigate('/doctor-dashboard');
        }if (email === 'recepcionist@mail.com' && password === 'recept123') {
            navigate('/recepcionist-dashboard');
          } else {
            alert('Credenciales inválidas');
        }
    };

    return (
        <div className="login-container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow-lg" style={{ width: '400px' }}>
                <div className="text-center mb-4">
                    <img
                        src="/src/assets/logo.jpg"
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
                        <label htmlFor="email">Correo Electrónico</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Ingrese su correo"
                            className="form-control"
                            required
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
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        Iniciar Sesión
                    </button>
                </form>
                <div className="text-center mt-3">
                    <a href="#forgot-password" className="d-block">¿Has olvidado la contraseña?</a>
                    <a href="#create-account" className="d-block">¿No estás registrado? Crea una cuenta</a>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
