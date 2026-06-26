import { useEffect, useMemo, useState, useCallback } from "react";
import { getAdaptiveSessionTime } from "../utils/timerHelpers";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase";

const BREAK_TIME = 5 * 60;

export default function useFocusTimer() {
  const [dailyDistractions, setDailyDistractions] = useState(
    Number(localStorage.getItem("dailyDistractions")) || 0
  );
  const DAILY_GOAL = 4;

  const [sessionDistractions, setSessionDistractions] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(
    Number(localStorage.getItem("sessionsCompleted")) || 0
  );
  const [lastResetDate, setLastResetDate] = useState(
    localStorage.getItem("lastResetDate") || ""
  );

  const [streak, setStreak] = useState(
    Number(localStorage.getItem("streak")) || 1
  );

  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("focusHistory")) || []
  );

  const [mode, setMode] = useState("focus");
  const [isRunning, setIsRunning] = useState(false);

  const sessionTime = useMemo(
    () => getAdaptiveSessionTime(dailyDistractions),
    [dailyDistractions]
  );
  const [dailySessions, setDailySessions] = useState(
    Number(localStorage.getItem("dailySessions")) || 0
  );
  const dailyProgress = Math.min(dailySessions / DAILY_GOAL, 1);
  const isGoalComplete = dailySessions >= DAILY_GOAL;

  const totalTime = mode === "focus" ? sessionTime : BREAK_TIME;

  const [timeLeft, setTimeLeft] = useState(totalTime);

  const focusScore = Math.max(0, 100 - dailyDistractions * 10);

  const updateStreak = () => {
    const today = new Date().toDateString();
    const lastSessionDate = localStorage.getItem("lastSessionDate");

    if (lastSessionDate !== today) {
      setStreak((prev) => prev + 1);
      localStorage.setItem("lastSessionDate", today);
    }
  };

  const saveProgress = useCallback(async () => {
    const user = auth.currentUser;
    if (!user) return;

    await setDoc(doc(db, "users", user.uid), {
      sessionsCompleted,
      streak,
      dailyDistractions,
      history,
    });
  }, [sessionsCompleted, streak, dailyDistractions, history]);

  const loadProgress = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const snap = await getDoc(doc(db, "users", user.uid));

    if (snap.exists()) {
      const data = snap.data();

      setSessionsCompleted(data.sessionsCompleted || 0);
      setStreak(data.streak || 1);
      setDailyDistractions(data.dailyDistractions || 0);
      setHistory(data.history || []);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) loadProgress();
    });

    return unsubscribe;
  }, []);

  const handleSessionComplete = useCallback(() => {
    setIsRunning(false);

    if (Notification.permission === "granted") {
      new Notification(
        mode === "focus" ? "Focus session complete 🎉" : "Break finished 🚀"
      );
    }

    if (mode === "focus") {
      setShowCelebration(true); // 👈 trigger animation

      setSessionsCompleted((prev) => prev + 1);
      setDailySessions((prev) => prev + 1);
      updateStreak();

      const today = new Date().toLocaleDateString();

      setHistory((prev) => [
        ...prev,
        {
          date: today,
          completed: true,
          distractions: sessionDistractions,
        },
      ]);

      setSessionDistractions(0);

      setMode("break");
      setTimeLeft(BREAK_TIME);
    } else {
      setMode("focus");
      setTimeLeft(sessionTime);
      setSessionDistractions(0);
    }
  }, [mode, sessionTime, sessionDistractions]);

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning]);

  useEffect(() => {
    if (timeLeft === 0) {
      handleSessionComplete();
    }
  }, [timeLeft, handleSessionComplete]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && isRunning && mode === "focus") {
        setDailyDistractions((prev) => prev + 1);
        setSessionDistractions((prev) => prev + 1);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [isRunning, mode]);

  useEffect(() => {
    localStorage.setItem("dailyDistractions", dailyDistractions);
    localStorage.setItem("dailySessions", dailySessions);
    localStorage.setItem("lastResetDate", lastResetDate);

    localStorage.setItem("sessionsCompleted", sessionsCompleted);
    localStorage.setItem("streak", streak);
    localStorage.setItem("focusHistory", JSON.stringify(history));

    saveProgress();
  }, [
    dailyDistractions,
    dailySessions,
    lastResetDate,
    sessionsCompleted,
    streak,
    history,
    saveProgress,
  ]);

  const startTimer = () => {
    if (mode === "focus") {
      setSessionDistractions(0);
    }

    setIsRunning(true);
  };

  const pauseTimer = () => setIsRunning(false);

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(totalTime);
    setSessionDistractions(0);
  };

  const changeMode = (newMode) => {
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(newMode === "focus" ? sessionTime : BREAK_TIME);
  };

  useEffect(() => {
    localStorage.setItem("dailySessions", dailySessions);
  }, [dailySessions]);

  useEffect(() => {
    const today = new Date().toDateString();

    if (lastResetDate !== today) {
      // Reset daily values
      setDailyDistractions(0);
      setDailySessions(0);

      // Save new reset date
      setLastResetDate(today);
      localStorage.setItem("lastResetDate", today);
    }
  }, [lastResetDate]);

  useEffect(() => {
    const now = new Date();
    const msUntilMidnight =
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1) - now;

    const timer = setTimeout(() => {
      setDailyDistractions(0);
      setDailySessions(0);

      const today = new Date().toDateString();
      setLastResetDate(today);
      localStorage.setItem("lastResetDate", today);
    }, msUntilMidnight);

    return () => clearTimeout(timer);
  }, []);

  return {
    timeLeft,
    totalTime,
    mode,
    isRunning,
    dailyDistractions,
    sessionDistractions,
    sessionsCompleted,
    showCelebration,
    setShowCelebration,
    streak,
    focusScore,
    startTimer,
    pauseTimer,
    resetTimer,
    changeMode,
    dailySessions,
    dailyGoal: DAILY_GOAL,
    dailyProgress,
    isGoalComplete,
    history,
  };
}
