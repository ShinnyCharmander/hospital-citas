import { Bell, Search, Menu, Plus } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ onMenuClick }) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 bg-white/85 backdrop-blur-md border-b border-slate-200/70 px-4 sm:px-6 py-3">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={onMenuClick}
            aria-label="Abrir menú"
            className="lg:hidden text-slate-500 hover:text-slate-700 p-2 -ml-1 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <Menu size={22} />
          </button>

          <div className="hidden md:flex items-center bg-slate-100 rounded-xl px-4 py-2.5 w-72 lg:w-80 focus-within:ring-2 focus-within:ring-emerald-500/30 focus-within:bg-white transition-all">
            <Search className="w-4 h-4 text-slate-400 mr-2 flex-shrink-0" />
            <input
              type="text"
              placeholder="Buscar paciente, doctor..."
              className="bg-transparent border-none outline-none text-sm text-slate-700 w-full placeholder-slate-400"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/nueva-cita"
            className="hidden sm:flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg shadow-emerald-500/25"
          >
            <Plus size={16} />
            Nueva cita
          </Link>

          <button
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Buscar"
            className="md:hidden text-slate-500 hover:text-slate-700 p-2 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <Search size={20} />
          </button>

          <button
            aria-label="Notificaciones"
            className="relative text-slate-500 hover:text-slate-700 p-2 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white"></span>
          </button>

          <div className="flex items-center gap-3 pl-2 sm:pl-3 border-l border-slate-200">
            <div className="w-9 h-9 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-xl flex items-center justify-center text-white font-semibold text-sm shadow-md shadow-emerald-500/30 ring-1 ring-white/40">
              RC
            </div>
            <div className="hidden md:block leading-tight">
              <p className="text-sm font-semibold text-slate-800">Recepcion</p>
              <p className="text-xs text-slate-500">Administrador</p>
            </div>
          </div>
        </div>
      </div>

      {searchOpen && (
        <div className="md:hidden mt-3">
          <div className="flex items-center bg-slate-100 rounded-xl px-4 py-2.5 focus-within:ring-2 focus-within:ring-emerald-500/30 focus-within:bg-white transition-all">
            <Search className="w-4 h-4 text-slate-400 mr-2" />
            <input
              type="text"
              placeholder="Buscar paciente, doctor..."
              className="bg-transparent border-none outline-none text-sm text-slate-700 w-full placeholder-slate-400"
              autoFocus
            />
          </div>
        </div>
      )}
    </header>
  );
}