import { Activity, BarChart3, PieChart as PieIcon, TrendingUp } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area, Legend,
} from 'recharts';
import { metricsData } from '../data/mockData';

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#ec4899', '#64748b'];

export default function Metrics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <Activity className="text-emerald-500" />
          Metricas y Analiticas
        </h1>
        <p className="text-slate-500 text-sm mt-1">Analisis detallado del rendimiento del hospital</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-card">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="w-5 h-5 text-blue-500" />
            <h2 className="text-lg font-bold text-slate-800">Citas Mensuales</h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={metricsData.monthly}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
              <Bar dataKey="citas" fill="#3b82f6" radius={[6, 6, 0, 0]} name="Citas" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-card">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-emerald-500" />
            <h2 className="text-lg font-bold text-slate-800">Ingresos Mensuales</h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={metricsData.monthly}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                formatter={(value) => [`$${value.toLocaleString()}`, 'Ingresos']}
              />
              <Area type="monotone" dataKey="ingresos" stroke="#10b981" fill="#10b98130" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-card">
          <div className="flex items-center gap-2 mb-6">
            <PieIcon className="w-5 h-5 text-violet-500" />
            <h2 className="text-lg font-bold text-slate-800">Citas por Departamento</h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={metricsData.departmentStats} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis type="number" stroke="#94a3b8" fontSize={12} />
              <YAxis type="category" dataKey="name" stroke="#94a3b8" fontSize={11} width={100} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
              <Bar dataKey="citas" radius={[0, 6, 6, 0]} name="Citas">
                {metricsData.departmentStats.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-card">
          <div className="flex items-center gap-2 mb-6">
            <Activity className="w-5 h-5 text-amber-500" />
            <h2 className="text-lg font-bold text-slate-800">Distribucion de Estados</h2>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={metricsData.statusDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={95}
                paddingAngle={5}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {metricsData.statusDistribution.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {metricsData.statusDistribution.map((item) => (
              <div key={item.name} className="flex items-center gap-2 bg-slate-50 p-3 rounded-xl">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></div>
                <div>
                  <p className="text-sm font-medium text-slate-700">{item.name}</p>
                  <p className="text-lg font-bold text-slate-800">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-100">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            <h2 className="text-lg font-bold text-slate-800">Horas Populares de la Semana</h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={metricsData.popularHours}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="hour" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', r: 5 }} activeDot={{ r: 7 }} name="Num. de Citas" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-100">
          <h2 className="text-lg font-bold text-slate-800 mb-6">Resumen Semanal Comparativo</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={metricsData.weekly}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
              <Legend />
              <Bar dataKey="citas" fill="#6366f1" radius={[6, 6, 0, 0]} name="Total Citas" />
              <Bar dataKey="completadas" fill="#10b981" radius={[6, 6, 0, 0]} name="Completadas" />
              <Bar dataKey="canceladas" fill="#ef4444" radius={[6, 6, 0, 0]} name="Canceladas" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
