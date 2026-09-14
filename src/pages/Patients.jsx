import { useState } from 'react';
import { Users, Search, Phone, Mail, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Patients() {
  const { patients, getPatientAppointments, getDoctorById } = useApp();
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState(null);

  const filtered = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.rut.includes(search) ||
      p.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <Users className="text-emerald-500" />
          Pacientes
        </h1>
        <p className="text-slate-500 text-sm mt-1">{patients.length} pacientes registrados</p>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-slate-100">
        <div className="flex items-center bg-slate-50 rounded-xl px-4 py-2.5 border border-slate-200 mb-6">
          <Search className="w-4 h-4 text-slate-400 mr-2" />
          <input
            type="text"
            placeholder="Buscar por nombre, RUT o email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent border-none outline-none text-sm w-full text-slate-700 placeholder-slate-400"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((patient) => {
            const patientApts = getPatientAppointments(patient.id);
            const isExpanded = expanded === patient.id;

            return (
              <div key={patient.id} className="bg-slate-50 rounded-xl border border-slate-100 hover:border-emerald-200 transition-all">
                <button
                  onClick={() => setExpanded(isExpanded ? null : patient.id)}
                  className="w-full p-4 text-left flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-sm">
                      {patient.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">{patient.name}</p>
                      <p className="text-xs text-slate-500">{patient.rut} - {patient.age} anos</p>
                    </div>
                  </div>
                  {isExpanded ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                </button>

                {isExpanded && (
                  <div className="px-4 pb-4 space-y-3 border-t border-slate-200 pt-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Phone className="w-4 h-4 text-emerald-500" />
                        {patient.phone}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Mail className="w-4 h-4 text-emerald-500" />
                        {patient.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Calendar className="w-4 h-4 text-emerald-500" />
                        Ultima visita: {patient.lastVisit}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-700 mb-2">
                        Historial de Citas ({patientApts.length})
                      </p>
                      {patientApts.length > 0 ? (
                        <div className="space-y-2 max-h-40 overflow-y-auto">
                          {patientApts.map((apt) => {
                            const doctor = getDoctorById(apt.doctor);
                            return (
                              <div key={apt.id} className="flex items-center justify-between bg-white p-3 rounded-lg border border-slate-100">
                                <div>
                                  <p className="text-sm font-medium text-slate-700">{doctor?.name}</p>
                                  <p className="text-xs text-slate-400">{apt.reason}</p>
                                </div>
                                <div className="text-right">
                                  <p className="text-sm font-medium text-slate-600">{apt.date}</p>
                                  <span className={`text-xs font-medium ${
                                    apt.status === 'completada' ? 'text-blue-500' :
                                    apt.status === 'confirmada' ? 'text-emerald-500' :
                                    apt.status === 'pendiente' ? 'text-amber-500' : 'text-red-500'
                                  }`}>
                                    {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <p className="text-sm text-slate-400">Sin citas registradas</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
