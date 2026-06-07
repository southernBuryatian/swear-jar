import { useCallback, useRef, useState } from 'react';
import HostCharacterWalk from './HostCharacter/HostCharacterWalk.tsx';
import Inventory from './Inventory/Inventory.tsx';
import Wishlist from './Wishlist/Wishlist.tsx';

export default function App() {
  const [jarSlips, setJarSlips] = useState(0);
  const [coins, setCoins] = useState(0);
  const [purchasedWishlistIds, setPurchasedWishlistIds] = useState<number[]>(
    [],
  );
  const coinsRef = useRef(0);
  const purchasedWishlistRef = useRef<number[]>([]);

  const addJarSlip = useCallback(() => {
    setJarSlips((count) => count + 1);
  }, []);

  const addCoins = useCallback((amount: number) => {
    coinsRef.current += amount;
    setCoins(coinsRef.current);
  }, []);

  const spendForInventory = useCallback((price: number) => {
    if (coinsRef.current < price) {
      return false;
    }

    coinsRef.current -= price;
    setCoins(coinsRef.current);
    return true;
  }, []);

  const purchaseWishlistItem = useCallback((id: number, price: number) => {
    if (purchasedWishlistRef.current.includes(id)) {
      return false;
    }

    if (coinsRef.current < price) {
      return false;
    }

    coinsRef.current -= price;
    purchasedWishlistRef.current = [...purchasedWishlistRef.current, id];
    setCoins(coinsRef.current);
    setPurchasedWishlistIds([...purchasedWishlistRef.current]);
    return true;
  }, []);

  return (
    <div className="app-layout">
      <div className="app-room-column">
        <div className="app-room">
          <HostCharacterWalk onSwear={addJarSlip} />
        </div>
        <Wishlist
          coins={coins}
          purchasedIds={purchasedWishlistIds}
          onPurchase={purchaseWishlistItem}
        />
      </div>
      <div className="app-panel">
        <Inventory
          jarSlips={jarSlips}
          coins={coins}
          onAddCoins={addCoins}
          onSpendForInventory={spendForInventory}
        />
      </div>
    </div>
  );
}
