import React from 'react';
import { BrowserRouter as  Router, Routes, Route } from 'react-router-dom';
import SelectDoctorCliente from './components/SelectDoctorCliente';
import HorarioDoctor from './components/HorarioDoctor';
import PanelPaciente from './components/PanelPaciente';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/select-doctor" element={<SelectDoctorCliente />} />
                <Route path="/horario-doctor" element={<HorarioDoctor />} />
                <Route path="/panel-paciente" element={<PanelPaciente />} />
            </Routes>
        </Router>
    );
}

export default AppRoutes;