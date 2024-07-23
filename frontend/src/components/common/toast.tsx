import React, { useEffect } from "react";

interface ToastProps {
  message: string;
  type: "info" | "success";
  position: "top-start" | "top-end" | "bottom-start" | "bottom-end";
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, position, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000); // 3초 후에 알림 사라짐
    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 클리어
  }, [onClose]);

  const positionClass = () => {
    switch (position) {
      case "top-start":
        return "toast-top toast-start";
      case "top-end":
        return "toast-top toast-end";
      case "bottom-start":
        return "toast-bottom toast-start";
      case "bottom-end":
        return "toast-bottom toast-end";
      default:
        return "";
    }
  };

  return (
    <div className={`toast ${positionClass()}`}>
      <div className={`alert alert-${type}`}>
        <span>{message}</span>
        <button onClick={onClose} className="ml-2 text-lg font-bold">
          &times;
        </button>
      </div>
    </div>
  );
};

export default Toast;
