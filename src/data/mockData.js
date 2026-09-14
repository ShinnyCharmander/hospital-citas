export const departments = [
  { id: 1, name: 'Cardiologia', icon: 'Heart', color: '#ef4444' },
  { id: 2, name: 'Pediatria', icon: 'Baby', color: '#3b82f6' },
  { id: 3, name: 'Dermatologia', icon: 'Sparkles', color: '#f59e0b' },
  { id: 4, name: 'Neurologia', icon: 'Brain', color: '#8b5cf6' },
  { id: 5, name: 'Traumatologia', icon: 'Bone', color: '#10b981' },
  { id: 6, name: 'Oftalmologia', icon: 'Eye', color: '#06b6d4' },
  { id: 7, name: 'Ginecologia', icon: 'HeartPulse', color: '#ec4899' },
  { id: 8, name: 'General', icon: 'Stethoscope', color: '#64748b' },
];

export const doctors = [
  { id: 1, name: 'Dr. Carlos Mendoza', department: 1, specialty: 'Cardiologia Interventional', avatar: 'CM', available: true },
  { id: 2, name: 'Dra. Maria Lopez', department: 1, specialty: 'Cardiologia General', avatar: 'ML', available: true },
  { id: 3, name: 'Dr. Juan Perez', department: 2, specialty: 'Pediatria General', avatar: 'JP', available: true },
  { id: 4, name: 'Dra. Ana Garcia', department: 2, specialty: 'Neonatologia', avatar: 'AG', available: false },
  { id: 5, name: 'Dr. Roberto Diaz', department: 3, specialty: 'Dermatologia Cosmetica', avatar: 'RD', available: true },
  { id: 6, name: 'Dra. Laura Fernandez', department: 4, specialty: 'Neurologia Adultos', avatar: 'LF', available: true },
  { id: 7, name: 'Dr. Pedro Sanchez', department: 5, specialty: 'Cirugia Ortopedica', avatar: 'PS', available: true },
  { id: 8, name: 'Dra. Sofia Morales', department: 6, specialty: 'Cirugia Ocular', avatar: 'SM', available: false },
  { id: 9, name: 'Dr. Miguel Torres', department: 7, specialty: 'Obstetricia', avatar: 'MT', available: true },
  { id: 10, name: 'Dra. Carmen Ruiz', department: 8, specialty: 'Medicina General', avatar: 'CR', available: true },
  { id: 11, name: 'Dr. Fernando Castro', department: 8, specialty: 'Medicina Interna', avatar: 'FC', available: true },
  { id: 12, name: 'Dra. Isabel Vargas', department: 3, specialty: 'Dermatologia Pediatrica', avatar: 'IV', available: true },
];

const iso = (offset) => {
  const t = new Date();
  t.setDate(t.getDate() + offset);
  return t.toLocaleDateString('en-CA');
};

export const patients = [
  { id: 1, name: 'Rodrigo Gonzalez', rut: '12.345.678-9', age: 28, phone: '+56912345678', email: 'rodrigo@email.com', lastVisit: iso(-6) },
  { id: 2, name: 'Valentina Rojas', rut: '15.678.901-2', age: 34, phone: '+56987654321', email: 'valentina@email.com', lastVisit: iso(-12) },
  { id: 3, name: 'Mateo Silva', rut: '18.234.567-8', age: 8, phone: '+56911223344', email: 'padres.mateo@email.com', lastVisit: iso(-20) },
  { id: 4, name: 'Camila Herrera', rut: '16.789.012-3', age: 45, phone: '+56955667788', email: 'camila@email.com', lastVisit: iso(-3) },
  { id: 5, name: 'Tomas Reyes', rut: '19.012.345-6', age: 62, phone: '+56999887766', email: 'tomas@email.com', lastVisit: iso(-25) },
  { id: 6, name: 'Isidora Martinez', rut: '14.567.890-1', age: 22, phone: '+56944332211', email: 'isidora@email.com', lastVisit: iso(-9) },
  { id: 7, name: 'Sebastian Navarro', rut: '17.890.123-4', age: 51, phone: '+56977665544', email: 'sebastian@email.com', lastVisit: iso(-15) },
  { id: 8, name: 'Fernanda Cortes', rut: '13.456.789-0', age: 37, phone: '+56922113344', email: 'fernanda@email.com', lastVisit: iso(-2) },
  { id: 9, name: 'Lucas Vergara', rut: '20.123.456-7', age: 5, phone: '+56966554433', email: 'padres.lucas@email.com', lastVisit: iso(-18) },
  { id: 10, name: 'Antonia Flores', rut: '11.234.567-8', age: 29, phone: '+56988776655', email: 'antonia@email.com', lastVisit: iso(-7) },
];

export const timeSlots = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '12:00', '12:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
  '17:00', '17:30',
];

export const appointments = [
  { id: 1, patient: 1, doctor: 1, date: iso(0), time: '09:00', status: 'confirmada', reason: 'Control cardiologico anual' },
  { id: 2, patient: 2, doctor: 3, date: iso(0), time: '10:30', status: 'confirmada', reason: 'Vacunacion pendiente' },
  { id: 3, patient: 3, doctor: 3, date: iso(1), time: '11:00', status: 'pendiente', reason: 'Dolor de garganta persistente' },
  { id: 4, patient: 4, doctor: 5, date: iso(1), time: '14:00', status: 'confirmada', reason: 'Revision de lunar' },
  { id: 5, patient: 5, doctor: 7, date: iso(2), time: '08:30', status: 'pendiente', reason: 'Dolor en rodilla derecha' },
  { id: 6, patient: 6, doctor: 10, date: iso(2), time: '09:00', status: 'confirmada', reason: 'Renovacion receta medica' },
  { id: 7, patient: 7, doctor: 1, date: iso(3), time: '11:30', status: 'cancelada', reason: 'Electrocardiograma' },
  { id: 8, patient: 8, doctor: 6, date: iso(3), time: '14:30', status: 'confirmada', reason: 'Migraña cronica' },
  { id: 9, patient: 9, doctor: 3, date: iso(4), time: '08:00', status: 'pendiente', reason: 'Revision general' },
  { id: 10, patient: 10, doctor: 2, date: iso(4), time: '09:30', status: 'confirmada', reason: 'Chequeo post-operatorio' },
  { id: 11, patient: 1, doctor: 8, date: iso(5), time: '10:00', status: 'pendiente', reason: 'Examen de vista' },
  { id: 12, patient: 4, doctor: 9, date: iso(5), time: '11:00', status: 'confirmada', reason: 'Control prenatal' },
  { id: 13, patient: 6, doctor: 10, date: iso(6), time: '08:30', status: 'confirmada', reason: 'Consulta general' },
  { id: 14, patient: 2, doctor: 5, date: iso(6), time: '09:00', status: 'pendiente', reason: 'Acne severo' },
  { id: 15, patient: 8, doctor: 7, date: iso(7), time: '15:00', status: 'confirmada', reason: 'Resonancia magnetica' },
  { id: 16, patient: 3, doctor: 10, date: iso(7), time: '16:00', status: 'cancelada', reason: 'Fiebre alta' },
  { id: 17, patient: 5, doctor: 1, date: iso(8), time: '08:00', status: 'confirmada', reason: 'Resultados examenes' },
  { id: 18, patient: 9, doctor: 4, date: iso(8), time: '10:00', status: 'pendiente', reason: 'Consulta neonatal' },
  { id: 19, patient: 7, doctor: 6, date: iso(9), time: '14:00', status: 'confirmada', reason: 'Seguimiento neurologico' },
  { id: 20, patient: 10, doctor: 11, date: iso(9), time: '15:30', status: 'confirmada', reason: 'Control medico integral' },
  { id: 21, patient: 1, doctor: 12, date: iso(-1), time: '09:00', status: 'completada', reason: 'Revision dermatologica' },
  { id: 22, patient: 2, doctor: 2, date: iso(-1), time: '10:30', status: 'completada', reason: 'Electrocardiograma' },
  { id: 23, patient: 3, doctor: 3, date: iso(-1), time: '11:00', status: 'completada', reason: 'Consulta pediatrica' },
  { id: 24, patient: 4, doctor: 10, date: iso(-2), time: '14:00', status: 'completada', reason: 'Control de presion' },
  { id: 25, patient: 5, doctor: 7, date: iso(-2), time: '08:30', status: 'completada', reason: 'Radiografia rodilla' },
  { id: 26, patient: 6, doctor: 5, date: iso(-3), time: '09:00', status: 'completada', reason: 'Tratamiento facial' },
  { id: 27, patient: 7, doctor: 1, date: iso(-3), time: '11:30', status: 'completada', reason: 'Ecocardiograma' },
  { id: 28, patient: 8, doctor: 6, date: iso(-4), time: '14:30', status: 'completada', reason: 'Electroencefalograma' },
  { id: 29, patient: 9, doctor: 3, date: iso(-4), time: '08:00', status: 'completada', reason: 'Control de crecimiento' },
  { id: 30, patient: 10, doctor: 9, date: iso(-5), time: '09:30', status: 'completada', reason: 'Control ginecologico' },
  { id: 31, patient: 1, doctor: 10, date: iso(-5), time: '10:00', status: 'completada', reason: 'Consulta general' },
  { id: 32, patient: 4, doctor: 8, date: iso(-6), time: '11:00', status: 'completada', reason: 'Examen visual' },
  { id: 33, patient: 6, doctor: 2, date: iso(-6), time: '15:00', status: 'completada', reason: 'Control cardiologico' },
  { id: 34, patient: 2, doctor: 11, date: iso(-7), time: '08:30', status: 'completada', reason: 'Medicina interna' },
  { id: 35, patient: 8, doctor: 7, date: iso(-7), time: '16:00', status: 'completada', reason: 'TAC cerebral' },
];

export const metricsData = {
  weekly: [
    { day: 'Lun', citas: 12, completadas: 10, canceladas: 2 },
    { day: 'Mar', citas: 15, completadas: 13, canceladas: 2 },
    { day: 'Mie', citas: 18, completadas: 16, canceladas: 2 },
    { day: 'Jue', citas: 14, completadas: 12, canceladas: 2 },
    { day: 'Vie', citas: 20, completadas: 18, canceladas: 2 },
    { day: 'Sab', citas: 8, completadas: 7, canceladas: 1 },
    { day: 'Dom', citas: 0, completadas: 0, canceladas: 0 },
  ],
  monthly: [
    { month: 'Ene', citas: 180, ingresos: 12600 },
    { month: 'Feb', citas: 165, ingresos: 11550 },
    { month: 'Mar', citas: 200, ingresos: 14000 },
    { month: 'Abr', citas: 190, ingresos: 13300 },
    { month: 'May', citas: 210, ingresos: 14700 },
    { month: 'Jun', citas: 225, ingresos: 15750 },
    { month: 'Jul', citas: 195, ingresos: 13650 },
  ],
  departmentStats: [
    { name: 'Cardiologia', citas: 45, porcentaje: 22 },
    { name: 'Pediatria', citas: 38, porcentaje: 19 },
    { name: 'Dermatologia', citas: 30, porcentaje: 15 },
    { name: 'Neurologia', citas: 25, porcentaje: 12 },
    { name: 'Traumatologia', citas: 28, porcentaje: 14 },
    { name: 'Oftalmologia', citas: 18, porcentaje: 9 },
    { name: 'Ginecologia', citas: 10, porcentaje: 5 },
    { name: 'General', citas: 8, porcentaje: 4 },
  ],
  statusDistribution: [
    { name: 'Completadas', value: 156, color: '#10b981' },
    { name: 'Confirmadas', value: 32, color: '#3b82f6' },
    { name: 'Pendientes', value: 18, color: '#f59e0b' },
    { name: 'Canceladas', value: 14, color: '#ef4444' },
  ],
  popularHours: [
    { hour: '08:00', count: 42 },
    { hour: '09:00', count: 58 },
    { hour: '10:00', count: 65 },
    { hour: '11:00', count: 48 },
    { hour: '12:00', count: 22 },
    { hour: '14:00', count: 55 },
    { hour: '15:00', count: 60 },
    { hour: '16:00', count: 45 },
    { hour: '17:00', count: 30 },
  ],
};
