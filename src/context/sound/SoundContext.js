import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
  useRef,
} from "react";

const SoundContext = createContext();

export const useSound = () => useContext(SoundContext);

// Sound file paths
const SOUNDS = {
  fold: "/sounds/fold.mp3",
  check: "/sounds/check.mp3",
  call: "/sounds/call.mp3",
  raise: "/sounds/raise.mp3",
  bet: "/sounds/bet.mp3",
  cardDeal: "/sounds/card-deal.mp3",
  cardFlip: "/sounds/card-flip.mp3",
  chipStack: "/sounds/chip-stack.mp3",
  win: "/sounds/win.mp3",
  lose: "/sounds/lose.mp3",
  buttonClick: "/sounds/button-click.mp3",
  notification: "/sounds/notification.mp3",
  yourTurn: "/sounds/your-turn.mp3",
};

// Preload audio objects
const audioCache = {};

export const SoundProvider = ({ children }) => {
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const savedPreference = localStorage.getItem("poker-sound-enabled");
    return savedPreference !== null ? JSON.parse(savedPreference) : true;
  });

  const [soundVolume, setSoundVolume] = useState(() => {
    const savedVolume = localStorage.getItem("poker-sound-volume");
    return savedVolume !== null ? JSON.parse(savedVolume) : 0.5;
  });

  // Keep refs to avoid stale closure issues
  const soundEnabledRef = useRef(soundEnabled);
  const soundVolumeRef = useRef(soundVolume);

  useEffect(() => {
    soundEnabledRef.current = soundEnabled;
  }, [soundEnabled]);

  useEffect(() => {
    soundVolumeRef.current = soundVolume;
  }, [soundVolume]);

  // Save preferences to localStorage
  useEffect(() => {
    localStorage.setItem("poker-sound-enabled", JSON.stringify(soundEnabled));
  }, [soundEnabled]);

  useEffect(() => {
    localStorage.setItem("poker-sound-volume", JSON.stringify(soundVolume));
  }, [soundVolume]);

  // Preload sounds on mount
  useEffect(() => {
    Object.values(SOUNDS).forEach((src) => {
      if (!audioCache[src]) {
        const audio = new Audio(src);
        audio.preload = "auto";
        audioCache[src] = audio;
      }
    });
  }, []);

  const playSound = useCallback((soundName) => {
    if (!soundEnabledRef.current) return;

    const src = SOUNDS[soundName];
    if (!src) {
      console.warn(`Sound "${soundName}" not found`);
      return;
    }

    try {
      // Create a new Audio instance for each play to allow overlapping sounds
      const audio = new Audio(src);
      audio.volume = soundVolumeRef.current;
      audio.play().catch((error) => {
        // Silently fail if autoplay is blocked
        if (error.name !== "NotAllowedError") {
          console.warn("Sound playback failed:", error);
        }
      });
    } catch (error) {
      console.warn("Error playing sound:", error);
    }
  }, []);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => !prev);
  }, []);

  const value = {
    soundEnabled,
    soundVolume,
    setSoundVolume,
    toggleSound,
    playSound,
    sounds: SOUNDS,
  };

  return (
    <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
  );
};

export default SoundContext;
