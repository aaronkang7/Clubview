import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import "./Toast.css";

const Toast = ({ message }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {visible &&
        createPortal(
          <div className="toast">
            <p className="toasttext">{message}</p>
          </div>,
          document.body
        )}
    </>
  );
};

export default Toast;
