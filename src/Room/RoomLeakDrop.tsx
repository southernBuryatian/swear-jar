import type { CSSProperties } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import leakSprite from '../../assets/inventory/conditionerLeaks/GotinhaSheet32x32.png';
import {
  getLeakDropGapMs,
  getLeakFallDurationMs,
  randomLeakDropX,
} from './roomLeak';
import './RoomLeakDrop.css';

type ActiveLeakDrop = {
  key: string;
  x: number;
  durationMs: number;
};

type RoomLeakDropProps = {
  leakCount: number;
};

export default function RoomLeakDrop({ leakCount }: RoomLeakDropProps) {
  const [activeDrop, setActiveDrop] = useState<ActiveLeakDrop | null>(null);
  const leakCountRef = useRef(leakCount);
  const isAnimatingRef = useRef(false);
  const scheduleTimerRef = useRef<number | null>(null);

  leakCountRef.current = leakCount;

  const clearScheduleTimer = useCallback(() => {
    if (scheduleTimerRef.current !== null) {
      window.clearTimeout(scheduleTimerRef.current);
      scheduleTimerRef.current = null;
    }
  }, []);

  const spawnDrop = useCallback(() => {
    if (leakCountRef.current <= 0 || isAnimatingRef.current) {
      return;
    }

    const count = leakCountRef.current;
    isAnimatingRef.current = true;
    setActiveDrop({
      key: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      x: randomLeakDropX(),
      durationMs: getLeakFallDurationMs(count),
    });
  }, []);

  const scheduleNextDrop = useCallback(() => {
    clearScheduleTimer();

    if (leakCountRef.current <= 0) {
      return;
    }

    scheduleTimerRef.current = window.setTimeout(() => {
      if (isAnimatingRef.current) {
        scheduleNextDrop();
        return;
      }

      spawnDrop();
    }, getLeakDropGapMs(leakCountRef.current));
  }, [clearScheduleTimer, spawnDrop]);

  useEffect(() => {
    if (leakCount <= 0) {
      clearScheduleTimer();
      isAnimatingRef.current = false;
      setActiveDrop(null);
      return;
    }

    if (!isAnimatingRef.current) {
      scheduleNextDrop();
    }
  }, [leakCount, clearScheduleTimer, scheduleNextDrop]);

  useEffect(() => {
    return clearScheduleTimer;
  }, [clearScheduleTimer]);

  function handleDropAnimationEnd() {
    isAnimatingRef.current = false;
    setActiveDrop(null);
    scheduleNextDrop();
  }

  if (!activeDrop) {
    return null;
  }

  return (
    <div className="room-leak-drops" aria-hidden="true">
      <img
        key={activeDrop.key}
        className="room-leak-drop"
        src={leakSprite}
        alt=""
        width={20}
        height={24}
        style={
          {
            '--leak-drop-x': `${activeDrop.x}%`,
            '--leak-fall-duration': `${activeDrop.durationMs}ms`,
          } as CSSProperties
        }
        onAnimationEnd={handleDropAnimationEnd}
      />
    </div>
  );
}
