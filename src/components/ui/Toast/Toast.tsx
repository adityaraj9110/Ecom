import React from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { useToastStore, Toast as ToastType } from '@store/toastStore';
import styles from './Toast.module.scss';

const iconMap = {
  success: <CheckCircle size={18} color="var(--color-success)" />,
  error: <AlertCircle size={18} color="var(--color-error)" />,
  info: <Info size={18} color="var(--color-info)" />,
  warning: <AlertTriangle size={18} color="var(--color-warning)" />,
};

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToastStore();

  if (toasts.length === 0) return null;

  return (
    <div className={styles.container}>
      {toasts.map((toast: ToastType) => (
        <div key={toast.id} className={`${styles.toast} ${styles[toast.type]}`}>
          {iconMap[toast.type]}
          <span className={styles.message}>{toast.message}</span>
          <button className={styles.closeBtn} onClick={() => removeToast(toast.id)} aria-label="Dismiss">
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};
