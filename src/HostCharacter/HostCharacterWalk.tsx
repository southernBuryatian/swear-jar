import { hostDialogue, swearLines } from './hostDialogue';
import { hostWalkDisplay, hostWalkSprite } from './hostWalkSprite';
import WalkingCharacter from './WalkingCharacter.tsx';

type HostCharacterWalkProps = {
  coinsPerSecond: number;
  onSwear: () => void;
};

export default function HostCharacterWalk({
  coinsPerSecond,
  onSwear,
}: HostCharacterWalkProps) {
  return (
    <WalkingCharacter
      sprite={hostWalkSprite}
      display={hostWalkDisplay}
      clickLine={hostDialogue}
      randomLines={swearLines}
      coinsPerSecond={coinsPerSecond}
      onSwear={onSwear}
      ariaLabel="Host character"
    />
  );
}
