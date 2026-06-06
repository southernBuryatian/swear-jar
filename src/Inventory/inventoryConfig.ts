export type InventoryItem = {
  id: number;
  count: number;
  name: string;
  price: number;
  baseCoinsPerSecond: number;
  description?: string;
  swearText?: string;
};

export const inventoryItems: InventoryItem[] = [
  { id: 1, count: 0, name: 'Bricks', price: 3, description: 'OUCH!', swearText: 'Bloody bastard!', baseCoinsPerSecond: 1 },
  { id: 2, count: 0, name: 'Jordan', price: 100, description: 'Jordan', swearText: 'Jordan', baseCoinsPerSecond: 1 },
  { id: 3, count: 0, name: 'Sam', price: 100, description: 'Sam', swearText: 'Sam', baseCoinsPerSecond: 1 },
];

export function createInitialItems(): InventoryItem[] {
  return inventoryItems.map(({ id, count, name, price, baseCoinsPerSecond, description, swearText }) => ({
    id,
    count,
    name,
    price,
    baseCoinsPerSecond,
    description,
    swearText,
  }));
}
