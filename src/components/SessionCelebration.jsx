import { useEffect, useState } from "react";

export default function SessionCelebration({ trigger }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (trigger) {
      setShow(true);

      const timeout = setTimeout(() => {
        setShow(false);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [trigger]);

  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
      }}
    >
      <div
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          background: "rgba(255,255,255,0.9)",
          padding: "1rem 2rem",
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          animation: "pop 0.4s ease",
        }}
      >
        🎉 Session Complete!
      </div>

      <style>
        {`
          @keyframes pop {
            0% { transform: scale(0.5); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
}
