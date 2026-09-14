import { Calendar, Users, Clock, CheckCircle, CalendarPlus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { useApp } from '../context/AppContext';
import StatCard from '../components/StatCard';
import StatusBadge from '../components/StatusBadge';
import { metricsData } from '../data/mockData';

export default function Dashboard() {
  const { appointments, patients, getPatientById, getDoctorById, getUpcomingAppointments } = useApp();

  const totalCitas = appointments.length;
  const citasCompletadas = appointments.filter((a) => a.status === 'completada').length;
  const citasPendientes = appointments.filter((a) => a.status === 'pendiente').length;
  const upcoming = getUpcomingAppointments().slice(0, 5);

  const today = new Date().toLocaleDateString('es-CL', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 text-white p-6 sm:p-8 shadow-card-lg">
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-20 -left-10 w-72 h-72 rounded-full bg-teal-400/20 blur-3xl" />
        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-emerald-200 text-sm font-medium capitalize mb-1">{today}</p>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-emerald-100/90 text-sm mt-2">
              Bienvenido al sistema de gestion de citas del Hospital Central
            </p>
          </div>
          <Link
            to="/nueva-cita"
            className="inline-flex items-center gap-2 self-start sm:self-auto px-5 py-3 text-sm font-semibold text-emerald-800 bg-white rounded-xl hover:bg-emerald-50 transition-all shadow-lg shadow-emerald-900/20 group"
          >
            <CalendarPlus size={16} />
            Nueva Cita
            <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Citas" value={totalCitas} change={12} changeType="up" icon={Calendar} color="bg-gradient-to-br from-sky-500 to-blue-600" />
        <StatCard title="Completadas" value={citasCompletadas} change={8} changeType="up" icon={CheckCircle} color="bg-gradient-to-br from-emerald-500 to-teal-600" />
        <StatCard title="Pendientes" value={citasPendientes} change={-5} changeType="down" icon={Clock} color="bg-gradient-to-br from-amber-500 to-orange-500" />
        <StatCard title="Pacientes" value={patients.length} change={15} changeType="up" icon={Users} color="bg-gradient-to-br from-violet-500 to-purple-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-100 shadow-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-800">Citas por Dia</h2>
            <span className="text-xs text-slate-400 bg-slate-50 px-2.5 py-1 rounded-full">Ultima semana</span>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={metricsData.weekly} barGap={6}>
              <defs>
                <linearGradient id="barCompleted" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
                <linearGradient id="barCancelled" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f87171" />
                  <stop offset="100%" stopColor="#dc2626" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} axisLine={false} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={12} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 16px 40px -12px rgba(15,23,42,0.16)' }} cursor={{ fill: '#f8fafc' }} />
              <Bar dataKey="completadas" fill="url(#barCompleted)" radius={[6, 6, 0, 0]} name="Completadas" />
              <Bar dataKey="canceladas" fill="url(#barCancelled)" radius={[6, 6, 0, 0]} name="Canceladas" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-card">
          <h2 className="text-lg font-bold text-slate-800 mb-6">Distribucion de Estados</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={metricsData.statusDistribution}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
              >
                {metricsData.statusDistribution.map((entry, index) => (
                  <Cell key={index} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 16px 40px -12px rgba(15,23,42,0.16)' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-4">
            {metricsData.statusDistribution.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-slate-600">{item.name}</span>
                </div>
                <span className="font-semibold text-slate-800">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-800">Proximas Citas</h2>
            <Link to="/citas" className="inline-flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-700 font-medium">
              Ver todas <ArrowRight size={14} />
            </Link>
          </div>
          <div className="space-y-3">
            {upcoming.map((apt) => {
              const patient = getPatientById(apt.patient);
              const doctor = getDoctorById(apt.doctor);
              return (
                <div key={apt.id} className="flex items-center justify-between gap-3 p-3 bg-slate-50 rounded-xl hover:bg-emerald-50/60 transition-colors border border-transparent hover:border-emerald-100">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-11 h-11 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-xl flex items-center justify-center text-white font-semibold text-xs flex-shrink-0 shadow-md shadow-emerald-500/20">
                      {patient?.name?.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-sm text-slate-800 truncate">{patient?.name}</p>
                      <p className="text-xs text-slate-500 truncate">{doctor?.name}</p>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end gap-1">
                    <p className="text-sm font-semibold text-slate-700">{apt.time}</p>
                    <StatusBadge status={apt.status} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-800">Horas Mas Solicitadas</h2>
            <span className="text-xs text-slate-400 bg-slate-50 px-2.5 py-1 rounded-full">Este mes</span>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={metricsData.popularHours}>
              <defs>
                <linearGradient id="linePop" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="hour" stroke="#94a3b8" fontSize={11} axisLine={false} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 16px 40px -12px rgba(15,23,42,0.16)' }} />
              <Line type="monotone" dataKey="count" stroke="url(#linePop)" strokeWidth={3} dot={{ fill: '#3b82f6', r: 4, strokeWidth: 2, stroke: '#fff' }} name="Citas" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-card">
        <h2 className="text-lg font-bold text-slate-800 mb-5">Rendimiento por Departamento</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metricsData.departmentStats.map((dept) => (
            <div key={dept.name} className="p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-emerald-200 hover:-translate-y-0.5 transition-all">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-600">{dept.name}</p>
                <span className="text-xs font-semibold text-emerald-600">{dept.porcentaje}%</span>
              </div>
              <p className="text-2xl font-bold text-slate-800 mt-1">{dept.citas}</p>
              <div className="mt-3 h-2 bg-slate-200/70 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-500"
                  style={{ width: `${dept.porcentaje}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}