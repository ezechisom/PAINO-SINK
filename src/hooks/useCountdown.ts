import { useState, useEffect } from 'react';

export interface CountdownResult {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  isExpired: boolean;
  totalSecondsLeft: number;
}

export function useCountdown(targetIsoDate: string): CountdownResult {
  const calculateTime = (): CountdownResult => {
    const target = new Date(targetIsoDate).getTime();
    const now = new Date().getTime();
    const difference = target - now;

    if (difference <= 0 || isNaN(target)) {
      return {
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
        isExpired: true,
        totalSecondsLeft: 0,
      };
    }

    const d = Math.floor(difference / (1000 * 60 * 60 * 24));
    const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((difference % (1000 * 60)) / 1000);

    return {
      days: d.toString().padStart(2, '0'),
      hours: h.toString().padStart(2, '0'),
      minutes: m.toString().padStart(2, '0'),
      seconds: s.toString().padStart(2, '0'),
      isExpired: false,
      totalSecondsLeft: Math.floor(difference / 1000),
    };
  };

  const [timeLeft, setTimeLeft] = useState<CountdownResult>(calculateTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTime());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetIsoDate]);

  return timeLeft;
}
