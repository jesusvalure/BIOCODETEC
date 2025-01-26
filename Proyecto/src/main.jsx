import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import AdminDashboard from './components/AdminDashboard';
import PanelPaciente from './components/PanelPaciente';
import DoctorDashboard from './components/DoctorDashboard';
import ReceptionistDashboard from './components/ReceptionistDashboard';
import RegisterDiagnosis from './components/RegisterDiagnosis';
import RegisterUsers from './components/RegisterUsers';
import PerfilPaciente from './components/PerfilPaciente';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Router>
      <Routes>
        {/* Rutas principales */}
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<RegisterUsers />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/panel-paciente" element={<PanelPaciente />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/recepcionist-dashboard" element={<ReceptionistDashboard />} />
        <Route path="/register-diagnosis" element={<RegisterDiagnosis />} />
        <Route path="/perfil-paciente" element={<PerfilPaciente />} />
        {/* Redirección para rutas inexistentes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  </StrictMode>
);
