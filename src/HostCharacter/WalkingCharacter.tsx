import type { CSSProperties } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getRandomSwearDelayMs, pickRandomSwearLine } from './randomSwear';
import './HostCharacterWalk.css';

const PAUSE_MS = 700;

type WalkSpriteConfig = {
  src: string;
  frameCount: number;
  sheetWidth: number;
  displayScale: number;
  frameWidth: number;
  frameHeight: number;
  bubbleLiftRatio: number;
};

type WalkDisplayConfig = {
  width: number;
  height: number;
  sheetWidth: number;
  bubbleLift: number;
};

type WalkingCharacterProps = {
  sprite: WalkSpriteConfig;
  display: WalkDisplayConfig;
  clickLine: string;
  randomLines: readonly string[];
  coinsPerSecond: number;
  onSwear: () => void;
  ariaLabel: string;
  animationDelay?: string;
  className?: string;
};

export default function WalkingCharacter({
  sprite,
  display,
  clickLine,
  randomLines,
  coinsPerSecond,
  onSwear,
  ariaLabel,
  animationDelay = '0s',
  className = '',
}: WalkingCharacterProps) {
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
          showSwear(pickRandomSwearLine(randomLines), false);
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
  }, [coinsPerSecond, randomLines, showSwear]);

  function handleClick() {
    showSwear(clickLine, true);
  }

  const trackStyle = {
    '--host-display-width': `${display.width}px`,
    '--host-display-height': `${display.height}px`,
    '--host-sheet-width': `${display.sheetWidth}px`,
    '--host-bubble-lift': `${display.bubbleLift}px`,
    '--host-walk-delay': animationDelay,
  } as CSSProperties;

  const spriteStyle = {
    backgroundImage: `url(${sprite.src})`,
  } as CSSProperties;

  return (
    <button
      type="button"
      className={`host-walk-track${paused ? ' host-walk-track--paused' : ''}${className ? ` ${className}` : ''}`}
      style={trackStyle}
      onClick={handleClick}
      aria-label={ariaLabel}
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
