import { createContext, useContext, useState } from 'react';
import { appointments as initialAppointments, patients, doctors, departments } from '../data/mockData';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [appointmentsList, setAppointmentsList] = useState(initialAppointments);
  const [patientsList] = useState(patients);
  const [doctorsList] = useState(doctors);
  const [departmentsList] = useState(departments);

  const addAppointment = (appointment) => {
    const newAppointment = {
      ...appointment,
      id: appointmentsList.length + 1,
      status: 'pendiente',
    };
    setAppointmentsList((prev) => [newAppointment, ...prev]);
    return newAppointment;
  };

  const updateAppointmentStatus = (id, status) => {
    setAppointmentsList((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status } : apt))
    );
  };

  const cancelAppointment = (id) => {
    updateAppointmentStatus(id, 'cancelada');
  };

  const confirmAppointment = (id) => {
    updateAppointmentStatus(id, 'confirmada');
  };

  const completeAppointment = (id) => {
    updateAppointmentStatus(id, 'completada');
  };

  const getPatientById = (id) => patientsList.find((p) => p.id === id);
  const getDoctorById = (id) => doctorsList.find((d) => d.id === id);
  const getDepartmentById = (id) => departmentsList.find((d) => d.id === id);

  const getDoctorAppointments = (doctorId) =>
    appointmentsList.filter((apt) => apt.doctor === doctorId);

  const getPatientAppointments = (patientId) =>
    appointmentsList.filter((apt) => apt.patient === patientId);

  const getTodayAppointments = () => {
    const today = new Date().toISOString().split('T')[0];
    return appointmentsList.filter((apt) => apt.date === today);
  };

  const getUpcomingAppointments = () => {
    const today = new Date().toISOString().split('T')[0];
    return appointmentsList
      .filter((apt) => apt.date >= today && apt.status !== 'cancelada' && apt.status !== 'completada')
      .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));
  };

  return (
    <AppContext.Provider
      value={{
        appointments: appointmentsList,
        patients: patientsList,
        doctors: doctorsList,
        departments: departmentsList,
        addAppointment,
        updateAppointmentStatus,
        cancelAppointment,
        confirmAppointment,
        completeAppointment,
        getPatientById,
        getDoctorById,
        getDepartmentById,
        getDoctorAppointments,
        getPatientAppointments,
        getTodayAppointments,
        getUpcomingAppointments,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
