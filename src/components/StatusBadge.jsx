export default function StatusBadge({ status }) {
  const styles = {
    confirmada: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    pendiente: 'bg-amber-100 text-amber-700 border-amber-200',
    cancelada: 'bg-red-100 text-red-700 border-red-200',
    completada: 'bg-blue-100 text-blue-700 border-blue-200',
  };

  const labels = {
    confirmada: 'Confirmada',
    pendiente: 'Pendiente',
    cancelada: 'Cancelada',
    completada: 'Completada',
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${styles[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
        status === 'confirmada' ? 'bg-emerald-500' :
        status === 'pendiente' ? 'bg-amber-500' :
        status === 'cancelada' ? 'bg-red-500' : 'bg-blue-500'
      }`}></span>
      {labels[status]}
    </span>
  );
}
