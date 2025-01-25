import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import AdminDashboard from './components/AdminDashboard';
import ClientProfile from './components/ClientProfile';
import DoctorDashboard from './components/DoctorDashboard';
import ReceptionistDashboard from './components/ReceptionistDashboard';
import RegisterDiagnosis from './components/RegisterDiagnosis'; // Importa el componente

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Router>
      <Routes>
        {/* Ruta para el login */}
        <Route path="/" element={<LoginForm />} />
        {/* Ruta para el panel de administración */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/client-profile" element={<ClientProfile />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/recepcionist-dashboard" element={<ReceptionistDashboard />} />
        {/* Ruta para registrar diagnóstico */}
        <Route path="/register-diagnosis" element={<RegisterDiagnosis />} />
      </Routes>
    </Router>
  </StrictMode>
);

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
                <Route path="/register-diagnosis" element={<RegisterDiagnosis />} />
            </Routes>
        </Router>
    );
}

export default App;
