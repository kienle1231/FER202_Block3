import { useContext } from 'react';
import { ToastContext } from '../contexts/ToastContext';

export default function Toaster() {
  const { toasts } = useContext(ToastContext);
  return (
    <div className="toaster">
      {toasts.map((t) => (
        <div key={t.id} className={`toast toast-${t.type}`}>
          {t.message}
        </div>
      ))}
    </div>
  );
}


