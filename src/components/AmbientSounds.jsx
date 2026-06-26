import { useEffect, useRef, useState } from "react";

export default function AmbientSounds() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    audioRef.current = new Audio(
      "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    );

    audioRef.current.loop = true;

    return () => {
      audioRef.current.pause();
    };
  }, []);

  const toggleSound = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      <button
        onClick={toggleSound}
        style={{
          padding: "0.8rem 1.2rem",
          borderRadius: "12px",
          border: "none",
          cursor: "pointer",
        }}
      >
        {isPlaying ? "🔇 Stop Ambient Sound" : "🌧 Play Ambient Sound"}
      </button>
    </div>
  );
}
