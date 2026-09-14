import { Bell, Search, Menu } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-3 sticky top-0 z-30">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center bg-slate-100 rounded-xl px-4 py-2.5 w-80">
            <Search className="w-4 h-4 text-slate-400 mr-2" />
            <input
              type="text"
              placeholder="Buscar paciente, doctor..."
              className="bg-transparent border-none outline-none text-sm text-slate-700 w-full placeholder-slate-400"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="md:hidden text-slate-500 hover:text-slate-700 p-2 hover:bg-slate-100 rounded-xl"
          >
            <Search size={20} />
          </button>

          <div className="relative">
            <button className="text-slate-500 hover:text-slate-700 p-2 hover:bg-slate-100 rounded-xl relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
          </div>

          <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
            <div className="w-9 h-9 bg-emerald-500 rounded-xl flex items-center justify-center text-white font-semibold text-sm">
              RC
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-semibold text-slate-800">Recepcion</p>
              <p className="text-xs text-slate-500">Administrador</p>
            </div>
          </div>
        </div>
      </div>

      {searchOpen && (
        <div className="md:hidden mt-3">
          <div className="flex items-center bg-slate-100 rounded-xl px-4 py-2.5">
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
