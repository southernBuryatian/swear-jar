import spriteSheet from '../../assets/hostCharacters/Zantia_is_it_you_my_dear.png';

/** Horizontal strip: 192×32 px, 6 even frames @ 32×32 */
export const girlfriendWalkSprite = {
  src: spriteSheet,
  frameCount: 6,
  frameWidth: 32,
  frameHeight: 32,
  sheetWidth: 192,
  sheetHeight: 32,
  displayScale: 7,
  bubbleLiftRatio: 0.12,
} as const;

export const girlfriendWalkDisplay = {
  width: girlfriendWalkSprite.frameWidth * girlfriendWalkSprite.displayScale,
  height: girlfriendWalkSprite.frameHeight * girlfriendWalkSprite.displayScale,
  sheetWidth: girlfriendWalkSprite.sheetWidth * girlfriendWalkSprite.displayScale,
  bubbleLift: Math.round(
    girlfriendWalkSprite.frameHeight *
      girlfriendWalkSprite.displayScale *
      girlfriendWalkSprite.bubbleLiftRatio,
  ),
} as const;
