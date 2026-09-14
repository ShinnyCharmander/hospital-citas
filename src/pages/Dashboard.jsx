import { Calendar, Users, Clock, CheckCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { useApp } from '../context/AppContext';
import StatCard from '../components/StatCard';
import { metricsData } from '../data/mockData';

export default function Dashboard() {
  const { appointments, patients, getPatientById, getDoctorById, getUpcomingAppointments } = useApp();

  const totalCitas = appointments.length;
  const citasCompletadas = appointments.filter((a) => a.status === 'completada').length;
  const citasPendientes = appointments.filter((a) => a.status === 'pendiente').length;
  const upcoming = getUpcomingAppointments().slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1">Bienvenido al sistema de gestion de citas</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Citas" value={totalCitas} change={12} changeType="up" icon={Calendar} color="bg-gradient-to-br from-blue-500 to-blue-600" />
        <StatCard title="Completadas" value={citasCompletadas} change={8} changeType="up" icon={CheckCircle} color="bg-gradient-to-br from-emerald-500 to-emerald-600" />
        <StatCard title="Pendientes" value={citasPendientes} change={-5} changeType="down" icon={Clock} color="bg-gradient-to-br from-amber-500 to-amber-600" />
        <StatCard title="Pacientes" value={patients.length} change={15} changeType="up" icon={Users} color="bg-gradient-to-br from-violet-500 to-violet-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-800">Citas por Dia</h2>
            <span className="text-xs text-slate-400">Ultima semana</span>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={metricsData.weekly}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
              <Bar dataKey="completadas" fill="#10b981" radius={[6, 6, 0, 0]} name="Completadas" />
              <Bar dataKey="canceladas" fill="#ef4444" radius={[6, 6, 0, 0]} name="Canceladas" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-100">
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
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
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
        <div className="bg-white rounded-2xl p-6 border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-800">Proximas Citas</h2>
            <a href="/citas" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
              Ver todas
            </a>
          </div>
          <div className="space-y-3">
            {upcoming.map((apt) => {
              const patient = getPatientById(apt.patient);
              const doctor = getDoctorById(apt.doctor);
              return (
                <div key={apt.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white font-semibold text-xs">
                      {patient?.name?.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <p className="font-medium text-sm text-slate-800">{patient?.name}</p>
                      <p className="text-xs text-slate-500">{doctor?.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-slate-700">{apt.time}</p>
                    <p className="text-xs text-slate-400">{apt.date}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-800">Horas Mas Solicitadas</h2>
            <span className="text-xs text-slate-400">Este mes</span>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={metricsData.popularHours}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="hour" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
              <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', r: 4 }} name="Citas" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-slate-100">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Rendimiento por Departamento</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metricsData.departmentStats.map((dept) => (
            <div key={dept.name} className="p-4 bg-slate-50 rounded-xl">
              <p className="text-sm font-medium text-slate-600">{dept.name}</p>
              <p className="text-xl font-bold text-slate-800 mt-1">{dept.citas}</p>
              <div className="mt-2 h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${dept.porcentaje}%` }}
                ></div>
              </div>
              <p className="text-xs text-slate-400 mt-1">{dept.porcentaje}% del total</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
