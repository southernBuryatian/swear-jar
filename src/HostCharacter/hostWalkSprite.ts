import spriteSheet from '../../assets/hostCharacter/Office_Man_Crouch_Walk.png';

/** Horizontal strip: 192×32 px, 6 even frames @ 32×32 */
export const hostWalkSprite = {
  src: spriteSheet,
  frameCount: 6,
  frameWidth: 32,
  frameHeight: 32,
  sheetWidth: 192,
  sheetHeight: 32,
  displayScale: 2.5,
} as const;

export const hostWalkDisplay = {
  width: hostWalkSprite.frameWidth * hostWalkSprite.displayScale,
  height: hostWalkSprite.frameHeight * hostWalkSprite.displayScale,
  sheetWidth: hostWalkSprite.sheetWidth * hostWalkSprite.displayScale,
} as const;
