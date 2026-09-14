import { useState } from 'react';
import { CalendarDays, Search, Filter, Calendar, MoreVertical, X, Check, Stethoscope, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import StatusBadge from '../components/StatusBadge';

export default function Appointments() {
  const { appointments, getPatientById, getDoctorById, cancelAppointment, confirmAppointment, completeAppointment } = useApp();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');
  const [dateFilter, setDateFilter] = useState('');
  const [activeMenu, setActiveMenu] = useState(null);

  const filtered = appointments.filter((apt) => {
    const patient = getPatientById(apt.patient);
    const doctor = getDoctorById(apt.doctor);
    const matchSearch =
      patient?.name?.toLowerCase().includes(search.toLowerCase()) ||
      doctor?.name?.toLowerCase().includes(search.toLowerCase()) ||
      apt.reason.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'todos' || apt.status === statusFilter;
    const matchDate = !dateFilter || apt.date === dateFilter;
    return matchSearch && matchStatus && matchDate;
  });

  const sorted = [...filtered].sort((a, b) => {
    const dateA = `${a.date}T${a.time}`;
    const dateB = `${b.date}T${b.time}`;
    return dateB.localeCompare(dateA);
  });

  const initials = (name = '') => name.split(' ').map(n => n[0]).join('').slice(0, 2);

  const ActionsMenu = ({ apt }) =>
    apt.status !== 'completada' && apt.status !== 'cancelada' ? (
      <div className="relative">
        <button
          onClick={() => setActiveMenu(activeMenu === apt.id ? null : apt.id)}
          aria-label="Acciones"
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <MoreVertical className="w-5 h-5 text-slate-500" />
        </button>
        {activeMenu === apt.id && (
          <div className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-card-lg border border-slate-100 py-1 z-20 w-44">
            <button
              onClick={() => { confirmAppointment(apt.id); setActiveMenu(null); }}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-emerald-600 hover:bg-emerald-50"
            >
              <Check size={14} /> Confirmar
            </button>
            <button
              onClick={() => { completeAppointment(apt.id); setActiveMenu(null); }}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-blue-600 hover:bg-blue-50"
            >
              <Check size={14} /> Completar
            </button>
            <button
              onClick={() => { cancelAppointment(apt.id); setActiveMenu(null); }}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              <X size={14} /> Cancelar
            </button>
          </div>
        )}
      </div>
    ) : null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <CalendarDays className="text-emerald-500" />
          Gestion de Citas
        </h1>
        <p className="text-slate-500 text-sm mt-1">{appointments.length} citas registradas en total</p>
      </div>

      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-100 shadow-card">
        <div className="flex flex-col lg:flex-row gap-3 mb-6">
          <div className="flex-1 flex items-center bg-slate-50 rounded-xl px-4 py-2.5 border border-slate-200 focus-within:ring-2 focus-within:ring-emerald-500/30 focus-within:bg-white transition-all">
            <Search className="w-4 h-4 text-slate-400 mr-2 flex-shrink-0" />
            <input
              type="text"
              placeholder="Buscar por paciente, doctor o motivo..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent border-none outline-none text-sm w-full text-slate-700 placeholder-slate-400"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-center bg-slate-50 rounded-xl px-3 py-2.5 border border-slate-200">
              <Filter className="w-4 h-4 text-slate-400 mr-2 flex-shrink-0" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-transparent text-sm outline-none text-slate-700 cursor-pointer w-full"
              >
                <option value="todos">Todos los estados</option>
                <option value="confirmada">Confirmadas</option>
                <option value="pendiente">Pendientes</option>
                <option value="completada">Completadas</option>
                <option value="cancelada">Canceladas</option>
              </select>
            </div>
            <div className="flex items-center bg-slate-50 rounded-xl px-3 py-2.5 border border-slate-200">
              <Calendar className="w-4 h-4 text-slate-400 mr-2 flex-shrink-0" />
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="bg-transparent text-sm outline-none text-slate-700 cursor-pointer w-full"
              />
            </div>
          </div>
        </div>

        {sorted.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500">No se encontraron citas</p>
          </div>
        )}

        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider pb-3">Paciente</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider pb-3">Doctor</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider pb-3">Fecha</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider pb-3">Hora</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider pb-3">Motivo</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider pb-3">Estado</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider pb-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((apt) => {
                const patient = getPatientById(apt.patient);
                const doctor = getDoctorById(apt.doctor);
                return (
                  <tr key={apt.id} className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-xl flex items-center justify-center text-white font-semibold text-xs flex-shrink-0">
                          {initials(patient?.name)}
                        </div>
                        <span className="font-medium text-sm text-slate-800">{patient?.name}</span>
                      </div>
                    </td>
                    <td className="py-4 text-sm text-slate-600">{doctor?.name}</td>
                    <td className="py-4 text-sm text-slate-600 whitespace-nowrap">{apt.date}</td>
                    <td className="py-4 text-sm text-slate-600 font-medium">{apt.time}</td>
                    <td className="py-4 text-sm text-slate-500 max-w-[200px] truncate">{apt.reason}</td>
                    <td className="py-4"><StatusBadge status={apt.status} /></td>
                    <td className="py-4"><ActionsMenu apt={apt} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="md:hidden space-y-3">
          {sorted.map((apt) => {
            const patient = getPatientById(apt.patient);
            const doctor = getDoctorById(apt.doctor);
            return (
              <div key={apt.id} className="bg-slate-50 rounded-xl border border-slate-100 p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-11 h-11 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-xl flex items-center justify-center text-white font-semibold text-xs flex-shrink-0">
                      {initials(patient?.name)}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-sm text-slate-800 truncate">{patient?.name}</p>
                      <p className="flex items-center gap-1 text-xs text-slate-500 truncate">
                        <Stethoscope className="w-3.5 h-3.5 flex-shrink-0" />
                        {doctor?.name}
                      </p>
                    </div>
                  </div>
                  <ActionsMenu apt={apt} />
                </div>
                <p className="text-sm text-slate-600 mt-3">{apt.reason}</p>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-200">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <CalendarDays className="w-3.5 h-3.5" />
                    {apt.date}
                    <span className="flex items-center gap-1 ml-2 font-medium text-slate-600">
                      <Clock className="w-3.5 h-3.5" />
                      {apt.time}
                    </span>
                  </div>
                  <StatusBadge status={apt.status} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}