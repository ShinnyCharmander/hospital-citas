import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarPlus, User, Stethoscope, Clock, FileText, ChevronDown, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { timeSlots } from '../data/mockData';

export default function NewAppointment() {
  const navigate = useNavigate();
  const { patients, doctors, departments, addAppointment } = useApp();
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    patientId: '',
    departmentId: '',
    doctorId: '',
    date: '',
    time: '',
    reason: '',
  });

  const [errors, setErrors] = useState({});

  const filteredDoctors = form.departmentId
    ? doctors.filter((d) => d.department === Number(form.departmentId) && d.available)
    : doctors.filter((d) => d.available);

  const validate = () => {
    const newErrors = {};
    if (!form.patientId) newErrors.patientId = 'Selecciona un paciente';
    if (!form.departmentId) newErrors.departmentId = 'Selecciona un departamento';
    if (!form.doctorId) newErrors.doctorId = 'Selecciona un doctor';
    if (!form.date) newErrors.date = 'Selecciona una fecha';
    if (!form.time) newErrors.time = 'Selecciona una hora';
    if (!form.reason) newErrors.reason = 'Ingresa el motivo de la consulta';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    addAppointment({
      patient: Number(form.patientId),
      doctor: Number(form.doctorId),
      date: form.date,
      time: form.time,
      reason: form.reason,
    });

    setSuccess(true);
    setTimeout(() => navigate('/citas'), 2000);
  };

  const handleChange = (field, value) => {
    setForm((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === 'departmentId') {
        updated.doctorId = '';
      }
      return updated;
    });
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  if (success) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="bg-white rounded-2xl p-12 border border-slate-100 text-center max-w-md">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-emerald-500" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Cita Agendada</h2>
          <p className="text-slate-500">La cita ha sido registrada exitosamente. Redirigiendo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <CalendarPlus className="text-emerald-500" />
          Nueva Cita
        </h1>
        <p className="text-slate-500 text-sm mt-1">Agenda una nueva cita medica</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 border border-slate-100 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              <User className="w-4 h-4 inline mr-1" />
              Paciente
            </label>
            <div className="relative">
              <select
                value={form.patientId}
                onChange={(e) => handleChange('patientId', e.target.value)}
                className={`w-full px-4 py-3 bg-slate-50 border rounded-xl text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all ${
                  errors.patientId ? 'border-red-300 bg-red-50' : 'border-slate-200'
                }`}
              >
                <option value="">Seleccionar paciente</option>
                {patients.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} - {p.rut}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            {errors.patientId && <p className="text-red-500 text-xs mt-1">{errors.patientId}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              <Stethoscope className="w-4 h-4 inline mr-1" />
              Departamento
            </label>
            <div className="relative">
              <select
                value={form.departmentId}
                onChange={(e) => handleChange('departmentId', e.target.value)}
                className={`w-full px-4 py-3 bg-slate-50 border rounded-xl text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all ${
                  errors.departmentId ? 'border-red-300 bg-red-50' : 'border-slate-200'
                }`}
              >
                <option value="">Seleccionar departamento</option>
                {departments.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            {errors.departmentId && <p className="text-red-500 text-xs mt-1">{errors.departmentId}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              <Stethoscope className="w-4 h-4 inline mr-1" />
              Doctor
            </label>
            <div className="relative">
              <select
                value={form.doctorId}
                onChange={(e) => handleChange('doctorId', e.target.value)}
                disabled={!form.departmentId}
                className={`w-full px-4 py-3 bg-slate-50 border rounded-xl text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                  errors.doctorId ? 'border-red-300 bg-red-50' : 'border-slate-200'
                }`}
              >
                <option value="">Seleccionar doctor</option>
                {filteredDoctors.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} - {d.specialty}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            {errors.doctorId && <p className="text-red-500 text-xs mt-1">{errors.doctorId}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              <CalendarPlus className="w-4 h-4 inline mr-1" />
              Fecha
            </label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => handleChange('date', e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className={`w-full px-4 py-3 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all ${
                errors.date ? 'border-red-300 bg-red-50' : 'border-slate-200'
              }`}
            />
            {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              <Clock className="w-4 h-4 inline mr-1" />
              Hora
            </label>
            <div className="relative">
              <select
                value={form.time}
                onChange={(e) => handleChange('time', e.target.value)}
                className={`w-full px-4 py-3 bg-slate-50 border rounded-xl text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all ${
                  errors.time ? 'border-red-300 bg-red-50' : 'border-slate-200'
                }`}
              >
                <option value="">Seleccionar hora</option>
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            <FileText className="w-4 h-4 inline mr-1" />
            Motivo de la Consulta
          </label>
          <textarea
            value={form.reason}
            onChange={(e) => handleChange('reason', e.target.value)}
            rows={3}
            placeholder="Describe brevemente el motivo de la consulta..."
            className={`w-full px-4 py-3 bg-slate-50 border rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all ${
              errors.reason ? 'border-red-300 bg-red-50' : 'border-slate-200'
            }`}
          />
          {errors.reason && <p className="text-red-500 text-xs mt-1">{errors.reason}</p>}
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-3 text-sm font-medium text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg shadow-emerald-500/25"
          >
            Agendar Cita
          </button>
        </div>
      </form>
    </div>
  );
}
