const EDGE_PADDING_PERCENT = 8;
const LOWER_HALF_CHANCE = 0.75;

export type PlacedRoomItem = {
  key: string;
  icon: string;
  x: number;
  y: number;
};

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export function randomRoomPosition() {
  const x = randomBetween(
    EDGE_PADDING_PERCENT,
    100 - EDGE_PADDING_PERCENT,
  );
  const inLowerHalf = Math.random() < LOWER_HALF_CHANCE;
  const yMin = inLowerHalf ? 50 : EDGE_PADDING_PERCENT;
  const yMax = inLowerHalf ? 100 - EDGE_PADDING_PERCENT : 50;
  const y = randomBetween(yMin, yMax);

  return { x, y };
}

export function createPlacedRoomItem(icon: string): PlacedRoomItem {
  const { x, y } = randomRoomPosition();

  return {
    key: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    icon,
    x,
    y,
  };
}
