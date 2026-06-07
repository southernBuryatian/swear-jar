import { Coins, Plus } from 'lucide-react';
import { useEffect, useMemo, useReducer, useRef } from 'react';
import goblinIcon from '../../assets/goblin/sprite_0.png';
import { formatCompactNumber } from '../formatCompactNumber';
import {
  AC_LEAK_ITEM_ID,
  EXISTENTIAL_DREAD_ITEM_ID,
  createInitialItems,
  type InventoryItem,
} from './inventoryConfig';
import './Inventory.css';

type InventoryProps = {
  jarSlips: number;
  coins: number;
  onAddCoins: (amount: number) => void;
  onSpendForInventory: (price: number) => boolean;
  onItemPurchased: (item: InventoryItem) => void;
  onCoinsPerSecondChange: (coinsPerSecond: number) => void;
  onLeakCountChange: (leakCount: number) => void;
  onExistentialDreadChange: (hasExistentialDread: boolean) => void;
};

type InventoryState = {
  items: InventoryItem[];
};

type InventoryAction = { type: 'buy'; id: number };

function inventoryReducer(
  state: InventoryState,
  action: InventoryAction,
): InventoryState {
  switch (action.type) {
    case 'buy': {
      return {
        items: state.items.map((entry) =>
          entry.id === action.id
            ? { ...entry, count: entry.count + 1 }
            : entry,
        ),
      };
    }
    default:
      return state;
  }
}

export default function Inventory({
  jarSlips,
  coins,
  onAddCoins,
  onSpendForInventory,
  onItemPurchased,
  onCoinsPerSecondChange,
  onLeakCountChange,
  onExistentialDreadChange,
}: InventoryProps) {
  const [state, dispatch] = useReducer(inventoryReducer, {
    items: createInitialItems(),
  });
  const prevJarSlips = useRef(jarSlips);

  const coinsPerSecond = useMemo(
    () =>
      state.items.reduce(
        (sum, item) => sum + item.count * item.baseCoinsPerSecond,
        0,
      ),
    [state.items],
  );

  useEffect(() => {
    const delta = jarSlips - prevJarSlips.current;
    if (delta > 0) {
      onAddCoins(delta);
    }
    prevJarSlips.current = jarSlips;
  }, [jarSlips, onAddCoins]);

  useEffect(() => {
    onCoinsPerSecondChange(coinsPerSecond);
  }, [coinsPerSecond, onCoinsPerSecondChange]);

  useEffect(() => {
    const leakItem = state.items.find((item) => item.id === AC_LEAK_ITEM_ID);
    onLeakCountChange(leakItem?.count ?? 0);
  }, [state.items, onLeakCountChange]);

  useEffect(() => {
    const dreadItem = state.items.find(
      (item) => item.id === EXISTENTIAL_DREAD_ITEM_ID,
    );
    onExistentialDreadChange((dreadItem?.count ?? 0) > 0);
  }, [state.items, onExistentialDreadChange]);

  useEffect(() => {
    if (coinsPerSecond === 0) {
      return;
    }

    const intervalId = window.setInterval(() => {
      onAddCoins(coinsPerSecond);
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [coinsPerSecond, onAddCoins]);

  function buyItem(id: number) {
    const item = state.items.find((entry) => entry.id === id);
    if (!item || !onSpendForInventory(item.price)) {
      return;
    }

    dispatch({ type: 'buy', id });
    onItemPurchased(item);
  }

  return (
    <div className="inventory">
      <section className="inventory-summary">
        <div className="inventory-heading">
          <img
            className="inventory-brick"
            src={goblinIcon}
            alt="Goblin"
            width={48}
            height={48}
          />
          <div>
            <h1>Swear Jar</h1>
          </div>
        </div>
        <div className="inventory-total-wrap">
          <div className="inventory-total">
            <Coins aria-hidden="true" />
            <span>{formatCompactNumber(coins)}</span>
          </div>
          <p className="inventory-total-rate">
            +{formatCompactNumber(coinsPerSecond)}/s
          </p>
        </div>
      </section>

      <section className="inventory-board" aria-label="Swear jar items">
        {state.items.map((item) => {
          const canAfford = coins >= item.price;

          return (
            <article className="inventory-person" key={item.id}>
              <div className="inventory-person-main">
                <img
                  className="inventory-item-icon"
                  src={item.icon}
                  alt=""
                  width={32}
                  height={28}
                />
                <div className="inventory-person-info">
                <p className="inventory-item-label">{item.name}</p>
                {item.description && (
                  <p className="inventory-eyebrow">{item.description}</p>
                )}
                <p className="inventory-item-rates">
                  <span>
                    +{formatCompactNumber(item.baseCoinsPerSecond)}/s each
                  </span>
                  <span>
                    +{formatCompactNumber(item.count * item.baseCoinsPerSecond)}
                    /s total
                  </span>
                </p>
                <p className="inventory-item-count">
                  We have {formatCompactNumber(item.count)} of them!
                </p>
                </div>
              </div>
              <div className="inventory-person-action">
                <p className="inventory-item-price">
                  {formatCompactNumber(item.price)} coins
                </p>
                <button
                  type="button"
                  onClick={() => buyItem(item.id)}
                  disabled={!canAfford}
                >
                  <Plus aria-hidden="true" />
                  <span>Buy</span>
                </button>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}
