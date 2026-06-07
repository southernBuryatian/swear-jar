import brickIcon from '../../assets/inventory/painfulBricks/pixel_bricks_red.png';
import dirtySockIcon from '../../assets/inventory/dirtySocks/slime sock alt 4.png';
import mosquitoIcon from '../../assets/inventory/mosquitos/Fly-Sheet.png';

export type InventoryItem = {
  id: number;
  count: number;
  name: string;
  price: number;
  baseCoinsPerSecond: number;
  icon: string;
  description?: string;
  swearText?: string;
};

export const inventoryItems: InventoryItem[] = [
  {
    id: 1,
    count: 0,
    name: 'Bricks',
    price: 3,
    description: 'OUCH!',
    swearText: 'Bloody bastard!',
    baseCoinsPerSecond: 1,
    icon: brickIcon,
  },
  {
    id: 2,
    count: 0,
    name: 'Dirty sock',
    price: 100,
    description:
      'The smell is not that bad, I do not know why he is complaining',
    swearText: 'Sam',
    baseCoinsPerSecond: 7,
    icon: dirtySockIcon,
  },
  {
    id: 3,
    count: 0,
    name: 'Air Conditioner leak',
    price: 100,
    description:
      'They say there was an ancient torture: to listen the water leaks drop by drop.',
    swearText: 'Jordan',
    baseCoinsPerSecond: 20,
    icon: brickIcon,
  },
  {
    id: 4,
    count: 0,
    name: 'An accidental email from work',
    price: 1000,
    description: "Let's put it this way: I have my own connections.",
    swearText: 'Sam',
    baseCoinsPerSecond: 100,
    icon: brickIcon,
  },
  {
    id: 5,
    count: 0,
    name: 'A mosquito',
    price: 5000,
    description: 'You can hear it. You cannot find it.',
    swearText: 'WHERE ARE YOU?!',
    baseCoinsPerSecond: 500,
    icon: mosquitoIcon,
  },
  {
    id: 6,
    count: 0,
    name: 'Existential dread',
    price: 1000,
    description:
      'It is the feeling of being lost and without purpose. Makes you swear a lot!',
    swearText: 'Sam',
    baseCoinsPerSecond: 100,
    icon: brickIcon,
  },
];

export function createInitialItems(): InventoryItem[] {
  return inventoryItems.map(
    ({
      id,
      count,
      name,
      price,
      baseCoinsPerSecond,
      icon,
      description,
      swearText,
    }) => ({
      id,
      count,
      name,
      price,
      baseCoinsPerSecond,
      icon,
      description,
      swearText,
    }),
  );
}
