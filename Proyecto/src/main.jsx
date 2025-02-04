import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import AdminDashboard from './components/AdminDashboard';
import PanelPaciente from './components/PanelPaciente';
import DoctorDashboard from './components/DoctorDashboard';
import ReceptionistDashboard from './components/ReceptionistDashboard';
import RegisterUsers from './components/RegisterUsers';
import PerfilPaciente from './components/PerfilPaciente';
import SelectDoctorPaciente from './components/SelectDoctorPaciente';
import CitasDoctor from './components/CitasDoctor';
import ListDoctors from './components/ListDoctors-Recepcionist';
import CitasSeguimiento from './components/Doctor-CitasSeguimiento';
import HorarioDoctor from './components/HorarioDoctor';
import FormNuevaCitaRecept from './components/NuevaCita-Recept';
import CitasDoctorRecept from './components/SelectCitaDoc-Recept';
import UpdateProfile from './components/ActualizarPerfilPaciente';
import AppointmentHistory from './components/HistorialPaciente';
import CrearExpediente from './components/CrearExpedienteCita';
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
        <Route path="/perfil-paciente" element={<PerfilPaciente />} />
        <Route path="/select-doctor" element={<SelectDoctorPaciente />} />
        <Route path="/citas-doctor" element={<CitasDoctor />} />
        <Route path="/list-doctors" element={<ListDoctors />} />
        <Route path="/citas-seguimiento" element={<CitasSeguimiento />} />
        <Route path="/horario-doctor" element={<HorarioDoctor />}/>
        <Route path="/nueva-cita-recept" element={<FormNuevaCitaRecept />} />
        <Route path="/citas-doctor-recept" element={<CitasDoctorRecept />} />
        <Route path="/update-profile" element={<UpdateProfile />} />
        <Route path="/appointment-history" element={<AppointmentHistory />} />
        <Route path="/crear-expediente" element={<CrearExpediente />} />
        {/* Redirección para rutas inexistentes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  </StrictMode>
);
