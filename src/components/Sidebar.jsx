import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  CalendarPlus,
  CalendarDays,
  Users,
  Settings,
  Activity,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const menuItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/nueva-cita', label: 'Nueva Cita', icon: CalendarPlus },
  { path: '/citas', label: 'Citas', icon: CalendarDays },
  { path: '/pacientes', label: 'Pacientes', icon: Users },
  { path: '/metricas', label: 'Metricas', icon: Activity },
  { path: '/configuracion', label: 'Configuracion', icon: Settings },
];

export default function Sidebar({ collapsed, onToggle }) {
  return (
    <aside
      style={{ width: collapsed ? 80 : 256 }}
      className="fixed left-0 top-0 h-screen bg-gradient-to-b from-emerald-800 to-emerald-900 text-white transition-all duration-300 z-40 flex flex-col"
    >
      <div className="flex items-center justify-between p-4 border-b border-emerald-700/50">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
            <Activity className="w-6 h-6 text-emerald-300" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="font-bold text-lg leading-tight">MediCitas</h1>
              <p className="text-emerald-300 text-xs">Hospital Central</p>
            </div>
          )}
        </div>
        <button
          onClick={onToggle}
          className="text-emerald-300 hover:text-white transition-colors flex-shrink-0"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <nav className="mt-6 px-3 flex-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-3 rounded-xl mb-2 transition-all duration-200 ${
                isActive
                  ? 'bg-white/15 text-white shadow-lg'
                  : 'text-emerald-200 hover:bg-white/10 hover:text-white'
              }`
            }
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span className="font-medium text-sm">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {!collapsed && (
        <div className="p-3">
          <div className="bg-emerald-700/50 rounded-xl p-4">
            <p className="text-emerald-200 text-xs mb-1">Hospital Central</p>
            <p className="text-white text-sm font-semibold">Clinica Medica</p>
            <p className="text-emerald-300 text-xs mt-1">Lun - Vie: 08:00 - 18:00</p>
          </div>
        </div>
      )}
    </aside>
  );
}
