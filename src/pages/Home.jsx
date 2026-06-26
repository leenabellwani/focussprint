import { useEffect } from "react";
import TimerDashboard from "../components/TimerDashboard";
import SessionControls from "../components/SessionControls";
import DistractionTracker from "../components/DistractionTracker";
import SessionAnalytics from "../components/SessionAnalytics";
import AuthPanel from "../components/AuthPanel";
import AmbientSounds from "../components/AmbientSounds";
import useFocusTimer from "../hooks/useFocusTimer";
import DailyProgress from "../components/DailyProgress";
import SessionCelebration from "../components/SessionCelebration";
import WeeklyChart from "../components/WeeklyChart";
import StreakHeatmap from "../components/StreakHeatmap";
import ProductivityChart from "../components/ProductivityChart";
import SmartSuggestions from "../components/SmartSuggestions";
import WeeklyReport from "../components/WeeklyReport";
import { pageContainer, appCard } from "../styles/layout";

export default function Home() {
  const {
    timeLeft,
    totalTime,
    mode,
    isRunning,
    sessionDistractions,
    dailyDistractions,
    sessionsCompleted,
    streak,
    focusScore,
    startTimer,
    pauseTimer,
    resetTimer,
    changeMode,
    dailySessions,
    dailyGoal,
    showCelebration,
    dailyProgress,
    history,
  } = useFocusTimer();

  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  return (
    <div style={pageContainer}>
      <div style={appCard}>
        <SessionCelebration trigger={showCelebration} />
        <h1
          style={{
            fontSize: "2.4rem",
            marginBottom: "1rem",
            fontWeight: "900",
            fontFamily: "Lucida Handwriting",
            color: "#8b5cf6",
          }}
        >
          FocusSprint
        </h1>

        <AuthPanel />

        <TimerDashboard
          timeLeft={timeLeft}
          totalTime={totalTime}
          mode={mode}
          onModeChange={changeMode}
        />

        <SessionControls
          onStart={startTimer}
          onPause={pauseTimer}
          onReset={resetTimer}
          isRunning={isRunning}
        />

        <div style={{ marginTop: "1rem" }}>
          <AmbientSounds />
        </div>

        <DailyProgress
          progress={dailyProgress}
          sessions={dailySessions}
          goal={dailyGoal}
        />

        <SessionAnalytics
          sessionsCompleted={sessionsCompleted}
          focusScore={focusScore}
          streak={streak}
          sessionDistractions={sessionDistractions}
        />
        <SmartSuggestions history={history} />

        <ProductivityChart history={history} />

        <WeeklyChart history={history} />
        <WeeklyReport history={history} />
        <StreakHeatmap history={history} />
        <DistractionTracker distractions={dailyDistractions} />
      </div>
    </div>
  );
}
