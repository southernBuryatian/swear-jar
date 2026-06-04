import type { CSSProperties } from 'react';
import brickImg from '../../../assets/painfulBricks/pixel_bricks_red.png';
import './PainfulBricks.css';

const RAY_COUNT = 12;

type PainfulBricksProps = {
  onContinue: () => void;
};

export default function PainfulBricks({ onContinue }: PainfulBricksProps) {
  return (
    <button
      className="painful-bricks"
      type="button"
      onClick={onContinue}
      aria-label="Continue to swear jar"
    >
      <div className="painful-bricks-stage" aria-hidden="true">
        <div className="painful-bricks-rays">
          {Array.from({ length: RAY_COUNT }, (_, index) => (
            <span
              key={index}
              className="painful-bricks-ray"
              style={{ '--ray-index': index } as CSSProperties}
            />
          ))}
        </div>
        <div className="painful-bricks-glow" />
        <img
          className="painful-bricks-sprite"
          src={brickImg}
          alt=""
          width={38}
          height={32}
        />
      </div>
      <p className="painful-bricks-hint">Click to continue</p>
    </button>
  );
}
