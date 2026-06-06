import type { CSSProperties } from 'react';
import { useEffect, useRef, useState } from 'react';
import { hostDialogue } from './hostDialogue';
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
  onSwear: () => void;
};

export default function HostCharacterWalk({ onSwear }: HostCharacterWalkProps) {
  const [paused, setPaused] = useState(false);
  const resumeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (resumeTimerRef.current !== null) {
        window.clearTimeout(resumeTimerRef.current);
      }
    };
  }, []);

  function handleClick() {
    onSwear();
    setPaused(true);

    if (resumeTimerRef.current !== null) {
      window.clearTimeout(resumeTimerRef.current);
    }

    resumeTimerRef.current = window.setTimeout(() => {
      setPaused(false);
      resumeTimerRef.current = null;
    }, PAUSE_MS);
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
        {paused && (
          <div className="host-walk-bubble" role="status">
            <p className="host-walk-bubble-line">{hostDialogue}</p>
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
