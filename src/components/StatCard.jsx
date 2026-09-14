import { TrendingUp, TrendingDown } from 'lucide-react';

export default function StatCard({ title, value, change, changeType, icon: Icon, color }) {
  return (
    <div className="group bg-white rounded-2xl p-5 border border-slate-100 shadow-card hover:shadow-card-lg hover:-translate-y-0.5 transition-all duration-300">
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <p className="text-slate-500 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-slate-800 mt-1 tracking-tight">{value}</p>
          {change !== undefined && (
            <div className={`inline-flex items-center gap-1 mt-2 text-xs font-semibold px-2 py-0.5 rounded-full ${
              changeType === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'
            }`}>
              {changeType === 'up' ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
              <span>{change}%</span>
              <span className="text-slate-400 font-normal">vs mes anterior</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-2xl ${color} shadow-lg shadow-slate-900/10 group-hover:scale-105 transition-transform duration-300`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
}