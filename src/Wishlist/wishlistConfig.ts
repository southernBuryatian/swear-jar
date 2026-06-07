export type WishlistItem = {
  id: number;
  name: string;
  price: number;
  comment?: string;
};

export const wishlistItems: WishlistItem[] = [
  {
    id: 1,
    name: 'To have enough money to let my girlfriend move in',
    price: 100000,
    comment: 'Good. She swears too! (x1.5 multiplier)',
  },
  {
    id: 2,
    name: 'To hire an engineer to fix the damn leaks',
    price: 200000,
    comment:
      'Fixes leaks. Swears like a sailor. (removes 1 leak per second, adds up to the swear jar for an each leak)',
  },
  {
    id: 3,
    name: 'To buy that course to get promoted',
    price: 500000,
    comment: 'Congratulations! More responsibility, more swearing. (x5 multiplier for work emails)',
  },
];