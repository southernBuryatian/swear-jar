import { girlfriendDialogue } from './hostDialogue';
import {
  girlfriendWalkDisplay,
  girlfriendWalkSprite,
} from './girlfriendWalkSprite';
import WalkingCharacter from './WalkingCharacter.tsx';

type GirlfriendCharacterWalkProps = {
  coinsPerSecond: number;
  onSwear: () => void;
};

export default function GirlfriendCharacterWalk({
  coinsPerSecond,
  onSwear,
}: GirlfriendCharacterWalkProps) {
  return (
    <WalkingCharacter
      sprite={girlfriendWalkSprite}
      display={girlfriendWalkDisplay}
      clickLine={girlfriendDialogue[0]}
      randomLines={girlfriendDialogue}
      coinsPerSecond={coinsPerSecond}
      onSwear={onSwear}
      ariaLabel="Girlfriend character"
      className="host-walk-track--girlfriend"
      animationDelay="-18s"
    />
  );
}
