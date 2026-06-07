import { useState } from 'react';
import Goblin from './Goblin';
import { introDialogue } from './introDialogue';
import './Intro.css';

type IntroProps = {
  lines?: readonly string[];
  onComplete?: () => void;
  completeLabel?: string;
};

export default function Intro({
  lines = introDialogue,
  onComplete,
  completeLabel = 'Start',
}: IntroProps) {
  const [lineIndex, setLineIndex] = useState(0);
  const isLastLine = lineIndex >= lines.length - 1;
  const line = lines[lineIndex];

  function advance() {
    if (isLastLine) {
      onComplete?.();
      return;
    }
    setLineIndex((index) => index + 1);
  }

  return (
    <div className="intro" role="dialog" aria-label="Game intro">
      <div className="intro-scene">
        <Goblin talkKey={lineIndex} />
        <div className="intro-bubble">
          <p className="intro-line" key={lineIndex}>
            {line}
          </p>
          <span className="intro-tail" aria-hidden="true" />
        </div>
      </div>
      <button className="intro-next" type="button" onClick={advance}>
        {isLastLine ? completeLabel : 'Next'}
      </button>
    </div>
  );
}
