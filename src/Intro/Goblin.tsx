import { useEffect, useState } from 'react';
import { goblinFrames } from './goblinFrames';

const IDLE_MS = 90;

type GoblinProps = {
  /** Change when a new dialogue line is shown — triggers a brief talk burst. */
  talkKey?: number;
};

export default function Goblin({ talkKey: _talkKey = 0 }: GoblinProps) {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(
      () => setFrame((index) => (index + 1) % goblinFrames.length), IDLE_MS,
    );
    return () => window.clearInterval(interval);
  }, []);

  return (
    <figure
      className={`intro-goblin`}
      aria-hidden="true"
    >
      <img src={goblinFrames[frame]} alt="" width={216} height={193} />
    </figure>
  );
}
