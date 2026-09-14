import { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

export default function Layout({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const width = sidebarCollapsed ? '5rem' : '16rem';

  return (
    <div className="min-h-screen bg-slate-100" style={{ '--sb-w': width }}>
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      {mobileOpen && (
        <button
          aria-label="Cerrar menú"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-30 bg-slate-900/50 backdrop-blur-sm lg:hidden"
        />
      )}

      <div className="flex flex-col min-h-screen lg:pl-[var(--sb-w)] transition-[padding] duration-300">
        <Navbar onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 w-full max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}