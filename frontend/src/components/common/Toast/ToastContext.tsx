import React, { createContext, useContext, useState, ReactNode } from "react";
import Toast from "./Toast";

type ToastType = "info" | "success" | "error";
type ToastPosition = "top-start" | "top-end" | "bottom-start" | "bottom-end";

interface Toast {
  message: string;
  type: ToastType;
  position: ToastPosition;
}

interface ToastContextProps {
  toast: Toast | null;
  setToast: (toast: Toast | null) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [toast, setToast] = useState<Toast | null>(null);

  return (
    <ToastContext.Provider value={{ toast, setToast }}>
      {children}
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
