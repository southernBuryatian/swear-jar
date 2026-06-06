import type { CSSProperties } from 'react';
import { hostWalkSprite } from './hostWalkSprite';
import './HostCharacterWalk.css';

const { src, frameWidth, frameHeight, sheetWidth, displayScale } = hostWalkSprite;

const displayWidth = frameWidth * displayScale;
const displayHeight = frameHeight * displayScale;
const displaySheetWidth = sheetWidth * displayScale;

export default function HostCharacterWalk() {
  const trackStyle = {
    '--host-display-width': `${displayWidth}px`,
    width: displayWidth,
  } as CSSProperties;

  const spriteStyle = {
    '--host-display-sheet-width': `${displaySheetWidth}px`,
    width: displayWidth,
    height: displayHeight,
    backgroundImage: `url(${src})`,
    backgroundSize: `${displaySheetWidth}px ${displayHeight}px`,
  } as CSSProperties;

  return (
    <div className="host-walk-track" style={trackStyle} aria-hidden="true">
      <div className="host-walk-flip">
        <div className="host-walk-sprite" style={spriteStyle} />
      </div>
    </div>
  );
}
