import { Check } from 'lucide-react';
import { formatCompactNumber } from '../formatCompactNumber';
import { wishlistItems } from './wishlistConfig';
import './Wishlist.css';

type WishlistProps = {
  coins: number;
  purchasedIds: number[];
  onPurchase: (id: number, price: number) => boolean;
};

export default function Wishlist({
  coins,
  purchasedIds,
  onPurchase,
}: WishlistProps) {
  return (
    <section className="wishlist" aria-label="Wishlist">
      <h2 className="wishlist-heading">Wishlist</h2>
      <ul className="wishlist-board">
        {wishlistItems.map((item) => {
          const purchased = purchasedIds.includes(item.id);
          const canAfford = coins >= item.price;

          return (
            <li
              className={`wishlist-item${purchased ? ' wishlist-item--purchased' : ''}`}
              key={item.id}
            >
              <div className="wishlist-item-info">
                <p className="wishlist-item-name">{item.name}</p>
                {item.comment && (
                  <p className="wishlist-item-comment">{item.comment}</p>
                )}
              </div>
              {purchased ? (
                <p className="wishlist-item-done">
                  <Check aria-hidden="true" />
                  <span>Purchased</span>
                </p>
              ) : (
                <div className="wishlist-item-action">
                  <p className="wishlist-item-price">
                    {formatCompactNumber(item.price)} coins
                  </p>
                  <button
                    type="button"
                    onClick={() => onPurchase(item.id, item.price)}
                    disabled={!canAfford}
                  >
                    Buy
                  </button>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
