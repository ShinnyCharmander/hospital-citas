import { Settings as SettingsIcon, Building, Bell, Globe, Save } from 'lucide-react';
import { useState } from 'react';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    hospitalName: 'Hospital Central',
    address: 'Av. Libertador 1234, Santiago',
    phone: '+562 2234 5678',
    email: 'contacto@hospitalcentral.cl',
    openingHour: '08:00',
    closingHour: '18:00',
    appointmentDuration: '30',
    maxDailyAppointments: '40',
    emailNotifications: true,
    smsNotifications: false,
    autoConfirm: false,
    language: 'es',
    theme: 'light',
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <SettingsIcon className="text-emerald-500" />
          Configuracion
        </h1>
        <p className="text-slate-500 text-sm mt-1">Administra la configuracion del sistema</p>
      </div>

      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-100 shadow-card space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
          <Building className="w-5 h-5 text-emerald-500" />
          <h2 className="text-lg font-bold text-slate-800">Informacion del Hospital</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Nombre del Hospital</label>
            <input
              type="text"
              value={settings.hospitalName}
              onChange={(e) => handleChange('hospitalName', e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Direccion</label>
            <input
              type="text"
              value={settings.address}
              onChange={(e) => handleChange('address', e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Telefono</label>
            <input
              type="tel"
              value={settings.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-100 shadow-card space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
          <Globe className="w-5 h-5 text-blue-500" />
          <h2 className="text-lg font-bold text-slate-800">Horario y Citas</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Hora de Apertura</label>
            <input
              type="time"
              value={settings.openingHour}
              onChange={(e) => handleChange('openingHour', e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Hora de Cierre</label>
            <input
              type="time"
              value={settings.closingHour}
              onChange={(e) => handleChange('closingHour', e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Duracion de Cita (min)</label>
            <select
              value={settings.appointmentDuration}
              onChange={(e) => handleChange('appointmentDuration', e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 appearance-none cursor-pointer"
            >
              <option value="15">15 minutos</option>
              <option value="20">20 minutos</option>
              <option value="30">30 minutos</option>
              <option value="45">45 minutos</option>
              <option value="60">60 minutos</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Max. Citas Diarias</label>
            <input
              type="number"
              value={settings.maxDailyAppointments}
              onChange={(e) => handleChange('maxDailyAppointments', e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-100 shadow-card space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
          <Bell className="w-5 h-5 text-amber-500" />
          <h2 className="text-lg font-bold text-slate-800">Notificaciones</h2>
        </div>
        <div className="space-y-4">
          {[
            { key: 'emailNotifications', label: 'Notificaciones por Email', desc: 'Recibe alertas de nuevas citas por correo' },
            { key: 'smsNotifications', label: 'Notificaciones SMS', desc: 'Recibe alertas por mensaje de texto' },
            { key: 'autoConfirm', label: 'Auto-confirmar Citas', desc: 'Las citas se confirman automaticamente al agendar' },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <div>
                <p className="text-sm font-semibold text-slate-700">{item.label}</p>
                <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
              </div>
              <button
                onClick={() => handleChange(item.key, !settings[item.key])}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings[item.key] ? 'bg-emerald-500' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                    settings[item.key] ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                ></div>
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg shadow-emerald-500/25"
        >
          <Save size={16} />
          {saved ? 'Guardado!' : 'Guardar Cambios'}
        </button>
      </div>
    </div>
  );
}
