"use client"; // Enables client-side rendering for this component

// Import necessary hooks from React
import React, { useState, useEffect, useRef } from "react";

// Import custom UI components and icons from the UI directory and Lucide React library
import { Button } from "@/components/ui/button";
import {
  MinusIcon,
  PauseIcon,
  PlayIcon,
  PlusIcon,
  RefreshCwIcon,
  Timer,
} from "lucide-react";
import { Card, CardTitle } from "@/components/ui/card";


// Define types for the timer status and session type
type TimerStatus = "idle" | "running" | "paused";
type SessionType = "work" | "break";

// Define a TypeScript interface for the Pomodoro state
interface PomodoroState {
  workDuration: number;
  breakDuration: number;
  currentTime: number;
  currentSession: SessionType;
  timerStatus: TimerStatus;
}

// Default export of the PomodoroComponent function
export default function PomodoroComponent() {
  // State hooks for managing the Pomodoro timer state
  const [state, setState] = useState<PomodoroState>({
    workDuration: 25 * 60,
    breakDuration: 5 * 60,
    currentTime: 25 * 60,
    currentSession: "work",
    timerStatus: "idle",
  });

  // Reference for storing the timer interval
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Effect hook to handle the timer logic
  useEffect(() => {
    if (state.timerStatus === "running" && state.currentTime > 0) {
      timerRef.current = setInterval(() => {
        setState((prevState) => ({
          ...prevState,
          currentTime: prevState.currentTime - 1,
        }));
      }, 1000);
    } else if (state.currentTime === 0) {
      clearInterval(timerRef.current as NodeJS.Timeout);
      handleSessionSwitch();
    }
    return () => clearInterval(timerRef.current as NodeJS.Timeout);
  }, [state.timerStatus, state.currentTime]);

  // Function to handle switching between work and break sessions
  const handleSessionSwitch = (): void => {
    setState((prevState) => {
      const isWorkSession = prevState.currentSession === "work";
      return {
        ...prevState,
        currentSession: isWorkSession ? "break" : "work",
        currentTime: isWorkSession
          ? prevState.breakDuration
          : prevState.workDuration,
      };
    });
  };

  // Function to handle start and pause actions
  const handleStartPause = (): void => {
    if (state.timerStatus === "running") {
      setState((prevState) => ({
        ...prevState,
        timerStatus: "paused",
      }));
      clearInterval(timerRef.current as NodeJS.Timeout);
    } else {
      setState((prevState) => ({
        ...prevState,
        timerStatus: "running",
      }));
    }
  };

  // Function to reset the timer
  const handleReset = (): void => {
    clearInterval(timerRef.current as NodeJS.Timeout);
    setState((prevState) => ({
      ...prevState,
      currentTime: prevState.workDuration,
      currentSession: "work",
      timerStatus: "idle",
    }));
  };

  // Function to handle changes in duration for work and break sessions
  const handleDurationChange = (
    type: SessionType,
    increment: boolean
  ): void => {
    setState((prevState) => {
      const durationChange = increment ? 60 : -60;
      if (type === "work") {
        return {
          ...prevState,
          workDuration: Math.max(60, prevState.workDuration + durationChange),
          currentTime:
            prevState.currentSession === "work"
              ? Math.max(60, prevState.workDuration + durationChange)
              : prevState.currentTime,
        };
      } else {
        return {
          ...prevState,
          breakDuration: Math.max(60, prevState.breakDuration + durationChange),
          currentTime:
            prevState.currentSession === "break"
              ? Math.max(60, prevState.breakDuration + durationChange)
              : prevState.currentTime,
        };
      }
    });
  };

  // Function to format time in mm:ss format
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  // JSX return statement rendering the Pomodoro timer UI
  return (
    <div className="flex flex-col items-center justify-center rounded-lg ">
      {/* Center the Pomodoro timer card within the screen */}
      <Card className={`w-full p-6 ${state.currentSession === "work" ? "bg-red-900" : "bg-blue-800"} shadow-lg rounded-lg`}>
        <div className="flex flex-col gap-4">
            <div className='flex items-center justify-center text-zinc-50'>
                <CardTitle className='text-lg sm:text-xl select-none'>Pomodoro</CardTitle>
                <Timer className='ml-auto w-4 h-4' />
            </div>
          <div className="flex flex-col items-center gap-3 ">

            <div className="text-2xl font-medium">
              <span
                className={`text-zinc-50`}
              >
                {state.currentSession === "work" ? "Trabalho" : "Pausa"}
              </span>
            </div>
            {/* Display formatted time */}
            <div className="text-6xl text-zinc-50 font-bold">
              {formatTime(state.currentTime)}
            </div>
          </div>
          <div className="flex items-center justify-center gap-4">
            {/* Buttons to change duration, start/pause, and reset timer */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleDurationChange("work", false)}
            >
              <MinusIcon className="h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleDurationChange("work", true)}
            >
              <PlusIcon className="h-6 w-6" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleStartPause}>
              {state.timerStatus === "running" ? (
                <PauseIcon className="h-6 w-6" />
              ) : (
                <PlayIcon className="h-6 w-6" />
              )}
            </Button>
            <Button variant="outline" size="icon" onClick={handleReset}>
              <RefreshCwIcon className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}