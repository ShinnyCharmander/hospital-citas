import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import NewAppointment from './pages/NewAppointment';
import Appointments from './pages/Appointments';
import Patients from './pages/Patients';
import Metrics from './pages/Metrics';
import SettingsPage from './pages/Settings';

export default function App() {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/nueva-cita" element={<NewAppointment />} />
            <Route path="/citas" element={<Appointments />} />
            <Route path="/pacientes" element={<Patients />} />
            <Route path="/metricas" element={<Metrics />} />
            <Route path="/configuracion" element={<SettingsPage />} />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  );
}
