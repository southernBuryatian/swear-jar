import { useCallback, useRef, useState } from 'react';
import HostCharacterWalk from './HostCharacter/HostCharacterWalk.tsx';
import Intro from './Intro/Intro.tsx';
import { bricksDialogue } from './Intro/introDialogue';
import PainfulBricks from './Inventory/PainfulBricks/PainfulBricks.tsx';
import Inventory from './Inventory/Inventory.tsx';
import {
  createPlacedRoomItem,
  type PlacedRoomItem,
} from './Room/roomPlacement';
import RoomPlacedItems from './Room/RoomPlacedItems.tsx';
import Wishlist from './Wishlist/Wishlist.tsx';
import type { InventoryItem } from './Inventory/inventoryConfig';

const BRICKS_TUTORIAL_CLICKS = 5;

export default function App() {
  const [jarSlips, setJarSlips] = useState(0);
  const [bricksDialogueDone, setBricksDialogueDone] = useState(false);
  const [painfulBricksDone, setPainfulBricksDone] = useState(false);
  const [coins, setCoins] = useState(0);
  const [purchasedWishlistIds, setPurchasedWishlistIds] = useState<number[]>(
    [],
  );
  const coinsRef = useRef(0);
  const purchasedWishlistRef = useRef<number[]>([]);
  const [roomItems, setRoomItems] = useState<PlacedRoomItem[]>([]);
  const [coinsPerSecond, setCoinsPerSecond] = useState(0);

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

  const handleInventoryPurchase = useCallback((item: InventoryItem) => {
    setRoomItems((current) => [...current, createPlacedRoomItem(item.icon)]);
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

  const showBricksTutorial =
    jarSlips >= BRICKS_TUTORIAL_CLICKS && !painfulBricksDone;
  const showBricksDialogue = showBricksTutorial && !bricksDialogueDone;
  const showPainfulBricks = showBricksTutorial && bricksDialogueDone;

  return (
    <>
      <div className="app-layout">
        <div className="app-room-column">
          <div className="app-room">
            <RoomPlacedItems items={roomItems} />
            <HostCharacterWalk
              coinsPerSecond={coinsPerSecond}
              onSwear={addJarSlip}
            />
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
            onItemPurchased={handleInventoryPurchase}
            onCoinsPerSecondChange={setCoinsPerSecond}
          />
        </div>
      </div>
      {showBricksDialogue && (
        <div className="app-tutorial-overlay">
          <main className="app-shell">
            <Intro
              lines={bricksDialogue}
              completeLabel="Got it"
              onComplete={() => setBricksDialogueDone(true)}
            />
          </main>
        </div>
      )}
      {showPainfulBricks && (
        <div className="app-tutorial-overlay">
          <main className="app-shell">
            <PainfulBricks onContinue={() => setPainfulBricksDone(true)} />
          </main>
        </div>
      )}
    </>
  );
}
