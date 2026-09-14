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
  X,
  Stethoscope,
} from 'lucide-react';

const menuItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/nueva-cita', label: 'Nueva Cita', icon: CalendarPlus },
  { path: '/citas', label: 'Citas', icon: CalendarDays },
  { path: '/pacientes', label: 'Pacientes', icon: Users },
  { path: '/metricas', label: 'Metricas', icon: Activity },
  { path: '/configuracion', label: 'Configuración', icon: Settings },
];

export default function Sidebar({ collapsed, onToggle, mobileOpen, onClose }) {
  const reduced = collapsed;

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 flex flex-col
        bg-gradient-to-b from-emerald-700 via-emerald-800 to-teal-900 text-white
        shadow-2xl shadow-emerald-900/20
        transition-all duration-300 ease-in-out
        ${reduced ? 'w-20' : 'w-64'}
        lg:translate-x-0
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
    >
      <div className="flex items-center justify-between px-4 py-5 border-b border-white/10">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="relative w-10 h-10 rounded-xl bg-white/10 ring-1 ring-white/20 flex items-center justify-center flex-shrink-0">
            <Stethoscope className="w-5 h-5 text-emerald-200" />
          </div>
          {!reduced && (
            <div className="min-w-0">
              <h1 className="font-bold text-lg leading-tight truncate">MediCitas</h1>
              <p className="text-emerald-300 text-xs">Hospital Central</p>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1">
          {!reduced && <button aria-label="Cerrar menú" onClick={onClose} className="lg:hidden p-2 -mr-1 rounded-lg text-emerald-200 hover:text-white hover:bg-white/10">
            <X size={18} />
          </button>}
          <button
            aria-label={reduced ? 'Expandir menú' : 'Colapsar menú'}
            onClick={onToggle}
            className="hidden lg:flex p-2 rounded-lg text-emerald-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            {reduced ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>
      </div>

      <nav className="mt-4 px-3 flex-1 overflow-y-auto">
        <p className={`text-[11px] uppercase tracking-widest text-emerald-400 font-semibold mb-2 px-3 ${reduced ? 'text-center' : ''}`}>
          {reduced ? '•••' : 'Menú'}
        </p>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-3 rounded-xl mb-1.5 transition-all duration-200 ${
                isActive
                  ? 'bg-white/15 text-white font-semibold shadow-lg shadow-black/10 ring-1 ring-white/10'
                  : 'text-emerald-200 hover:bg-white/10 hover:text-white'
              }`
            }
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!reduced && <span className="font-medium text-sm truncate">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="p-3">
        <div className={`rounded-xl bg-white/10 ring-1 ring-white/10 p-4 ${reduced ? 'hidden' : ''}`}>
          <p className="text-emerald-200 text-xs mb-1">Horario de atención</p>
          <p className="text-white text-sm font-semibold">Lun - Vie</p>
          <p className="text-emerald-300 text-xs mt-0.5">08:00 - 18:00</p>
        </div>
      </div>
    </aside>
  );
}