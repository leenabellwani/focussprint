import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useEffect, useState } from "react";

export default function AuthPanel() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return auth.onAuthStateChanged(setUser);
  }, []);

  const login = async () => {
    try {
      setLoading(true);
      await signInWithPopup(auth, new GoogleAuthProvider());
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  const buttonStyle = {
    padding: "0.8rem 1.2rem",
    borderRadius: "14px",
    border: "none",
    background: "#8b5cf6",
    color: "white",
    fontWeight: 600,
    cursor: "pointer",
    boxShadow: "0 6px 18px rgba(139, 92, 246, 0.25)",
    transition: "all 0.25s ease",
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "1rem",
      }}
    >
      {user ? (
        <>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <img
              src={user.photoURL}
              alt=""
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
              }}
            />
            <span style={{ fontSize: "0.9rem" }}>{user.displayName}</span>
          </div>

          <button
            onClick={logout}
            style={{
              background: "#f3f0ff",
              border: "none",
              padding: "0.4rem 0.8rem",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <button
          onClick={login}
          style={{
            background: "#8b5cf6",
            color: "#fff",
            padding: "0.6rem 1rem",
            borderRadius: "12px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Sign in
        </button>
      )}
    </div>
  );
}
