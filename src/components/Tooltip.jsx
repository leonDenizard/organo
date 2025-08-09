import React, { useState, useRef, useEffect } from "react";
import { useFloating, offset, flip, shift, autoUpdate } from "@floating-ui/react-dom";

export default function Tooltip({ children, text, show, onClose }) {
  const { x, y, reference, floating, strategy, update } = useFloating({
    placement: "top",
    middleware: [offset(8), flip(), shift({ padding: 5 })],
    whileElementsMounted: autoUpdate,
  });

  // Fecha tooltip automaticamente depois de um tempo (1.5s)
  useEffect(() => {
    if (!show) return;
    const timeout = setTimeout(onClose, 1500);
    return () => clearTimeout(timeout);
  }, [show, onClose]);

  return (
    <>
      {React.cloneElement(children, { ref: reference })}
      {show && (
        <div
          ref={floating}
          style={{
            position: strategy,
            top: y - 30 ?? 0,
            left: x + 250 ?? 0,
            backgroundColor: "rgba(0,0,0,0.8)",
            color: "white",
            padding: "5px 10px",
            borderRadius: "6px",
            fontSize: "12px",
            whiteSpace: "nowrap",
            pointerEvents: "none",
            userSelect: "none",
            zIndex: 9999,
          }}
          role="tooltip"
        >
          {text}
        </div>
      )}
    </>
  );
}
