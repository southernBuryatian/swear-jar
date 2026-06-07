export const DANCE_CLASSES_WISHLIST_ID = 1;
export const DANCE_CLASSES_INCOME_MULTIPLIER = 3;
export const GIRLFRIEND_WISHLIST_ID = 3;
export const GIRLFRIEND_INCOME_MULTIPLIER = 1.5;
export const PROMOTION_WISHLIST_ID = 4;
export const EMAIL_INCOME_MULTIPLIER = 5;

export type WishlistItem = {
  id: number;
  name: string;
  price: number;
  comment?: string;
};

export const wishlistItems: WishlistItem[] = [
    {
        id: 1,
        name: 'To take dance classes and reconnect with my body',
        price: 100000,
        comment: 'Improved body awareness. Pinches and stepping on bricks hurt more. (x3 coins from clicks and bricks)',
      },
  {
    id: 3,
    name: 'To have enough money to let my girlfriend move in with me',
    price: 750000,
    comment: 'Good. She swears too! (x1.5 multiplier)',
  },
//   {
//     id: 2,
//     name: 'To hire an engineer to fix the damn leaks',
//     price: 200000,
//     comment:
//       'Fixes leaks. Swears like a sailor. (removes 1 leak per second, adds up to the swear jar for an each leak)',
//   },
  {
    id: 4,
    name: 'To buy that course to get promoted',
    price: 1200000,
    comment: 'Congratulations! More responsibility, more swearing. (x5 multiplier for work emails)',
  },
];