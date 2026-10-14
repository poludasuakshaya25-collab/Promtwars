import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertTriangle, Info, AlertCircle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => {
        let icon = <Info size={16} style={{ color: 'var(--teal-light)', flexShrink: 0 }} />;
        let toastClass = 'toast';

        if (toast.type === 'success') {
          icon = <CheckCircle2 size={16} style={{ color: 'var(--emerald-success)', flexShrink: 0 }} />;
          toastClass = 'toast toast-success';
        } else if (toast.type === 'warning') {
          icon = <AlertTriangle size={16} style={{ color: 'var(--amber-warning)', flexShrink: 0 }} />;
          toastClass = 'toast toast-warning';
        } else if (toast.type === 'error') {
          icon = <AlertCircle size={16} style={{ color: 'var(--rose-danger)', flexShrink: 0 }} />;
          toastClass = 'toast toast-error';
        }

        return (
          <div key={toast.id} className={toastClass}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {icon}
              <span style={{ color: '#fff', fontSize: '0.82rem', lineHeight: 1.4 }}>
                {toast.message}
              </span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '2px'
              }}
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
