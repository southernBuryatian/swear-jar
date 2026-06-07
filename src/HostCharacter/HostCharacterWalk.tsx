import type { CSSProperties } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { hostDialogue, swearLines } from './hostDialogue';
import { getRandomSwearDelayMs, pickRandomSwearLine } from './randomSwear';
import { hostWalkDisplay, hostWalkSprite } from './hostWalkSprite';
import './HostCharacterWalk.css';

const PAUSE_MS = 700;

const { src } = hostWalkSprite;
const {
  width: displayWidth,
  height: displayHeight,
  sheetWidth: displaySheetWidth,
  bubbleLift,
} = hostWalkDisplay;

type HostCharacterWalkProps = {
  coinsPerSecond: number;
  onSwear: () => void;
};

export default function HostCharacterWalk({
  coinsPerSecond,
  onSwear,
}: HostCharacterWalkProps) {
  const [paused, setPaused] = useState(false);
  const [activeLine, setActiveLine] = useState<string | null>(null);
  const resumeTimerRef = useRef<number | null>(null);
  const randomSwearTimerRef = useRef<number | null>(null);
  const pausedRef = useRef(false);

  pausedRef.current = paused;

  const clearResumeTimer = useCallback(() => {
    if (resumeTimerRef.current !== null) {
      window.clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }
  }, []);

  const showSwear = useCallback(
    (line: string, awardCoin: boolean) => {
      if (awardCoin) {
        onSwear();
      }

      setActiveLine(line);
      setPaused(true);
      clearResumeTimer();

      resumeTimerRef.current = window.setTimeout(() => {
        setPaused(false);
        setActiveLine(null);
        resumeTimerRef.current = null;
      }, PAUSE_MS);
    },
    [clearResumeTimer, onSwear],
  );

  useEffect(() => {
    return () => {
      clearResumeTimer();
      if (randomSwearTimerRef.current !== null) {
        window.clearTimeout(randomSwearTimerRef.current);
      }
    };
  }, [clearResumeTimer]);

  useEffect(() => {
    if (randomSwearTimerRef.current !== null) {
      window.clearTimeout(randomSwearTimerRef.current);
      randomSwearTimerRef.current = null;
    }

    if (coinsPerSecond <= 0) {
      return;
    }

    function scheduleRandomSwear() {
      randomSwearTimerRef.current = window.setTimeout(() => {
        if (!pausedRef.current) {
          showSwear(pickRandomSwearLine(swearLines), false);
        }

        scheduleRandomSwear();
      }, getRandomSwearDelayMs(coinsPerSecond));
    }

    scheduleRandomSwear();

    return () => {
      if (randomSwearTimerRef.current !== null) {
        window.clearTimeout(randomSwearTimerRef.current);
        randomSwearTimerRef.current = null;
      }
    };
  }, [coinsPerSecond, showSwear]);

  function handleClick() {
    showSwear(hostDialogue, true);
  }

  const trackStyle = {
    '--host-display-width': `${displayWidth}px`,
    '--host-display-height': `${displayHeight}px`,
    '--host-sheet-width': `${displaySheetWidth}px`,
    '--host-bubble-lift': `${bubbleLift}px`,
  } as CSSProperties;

  const spriteStyle = {
    backgroundImage: `url(${src})`,
  } as CSSProperties;

  return (
    <button
      type="button"
      className={`host-walk-track${paused ? ' host-walk-track--paused' : ''}`}
      style={trackStyle}
      onClick={handleClick}
      aria-label="Host character"
    >
      <div className="host-walk-character">
        {activeLine && (
          <div className="host-walk-bubble" role="status">
            <p className="host-walk-bubble-line">{activeLine}</p>
            <span className="host-walk-bubble-tail" aria-hidden="true" />
          </div>
        )}
        <div className="host-walk-flip">
          <div className="host-walk-sprite" style={spriteStyle} />
        </div>
      </div>
    </button>
  );
}
