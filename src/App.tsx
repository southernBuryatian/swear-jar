import { useCallback, useRef, useState } from 'react';
import GirlfriendCharacterWalk from './HostCharacter/GirlfriendCharacterWalk.tsx';
import HostCharacterWalk from './HostCharacter/HostCharacterWalk.tsx';
import Intro from './Intro/Intro.tsx';
import { bricksDialogue } from './Intro/introDialogue';
import PainfulBricks from './Inventory/PainfulBricks/PainfulBricks.tsx';
import Inventory from './Inventory/Inventory.tsx';
import {
  createPlacedRoomItem,
  type PlacedRoomItem,
} from './Room/roomPlacement';
import RoomLeakDrop from './Room/RoomLeakDrop.tsx';
import RoomPlacedItems from './Room/RoomPlacedItems.tsx';
import Wishlist from './Wishlist/Wishlist.tsx';
import { GIRLFRIEND_WISHLIST_ID } from './Wishlist/wishlistConfig';
import {
  AC_LEAK_ITEM_ID,
  EXISTENTIAL_DREAD_ITEM_ID,
  type InventoryItem,
} from './Inventory/inventoryConfig';

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
  const [leakCount, setLeakCount] = useState(0);
  const [hasExistentialDread, setHasExistentialDread] = useState(false);

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
    if (
      item.id === AC_LEAK_ITEM_ID ||
      item.id === EXISTENTIAL_DREAD_ITEM_ID
    ) {
      return;
    }

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

  const hasGirlfriend = purchasedWishlistIds.includes(GIRLFRIEND_WISHLIST_ID);

  const showBricksTutorial =
    jarSlips >= BRICKS_TUTORIAL_CLICKS && !painfulBricksDone;
  const showBricksDialogue = showBricksTutorial && !bricksDialogueDone;
  const showPainfulBricks = showBricksTutorial && bricksDialogueDone;

  return (
    <>
      <div className="app-layout">
        <div className="app-room-column">
          <div
            className={`app-room${hasExistentialDread ? ' app-room--existential-dread' : ''}`}
          >
            <RoomPlacedItems items={roomItems} />
            <RoomLeakDrop leakCount={leakCount} />
            <HostCharacterWalk
              coinsPerSecond={coinsPerSecond}
              onSwear={addJarSlip}
            />
            {hasGirlfriend && (
              <GirlfriendCharacterWalk
                coinsPerSecond={coinsPerSecond}
                onSwear={addJarSlip}
              />
            )}
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
            onLeakCountChange={setLeakCount}
            onExistentialDreadChange={setHasExistentialDread}
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
