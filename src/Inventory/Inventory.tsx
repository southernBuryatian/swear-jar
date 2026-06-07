import { Coins, Plus } from 'lucide-react';
import { useEffect, useMemo, useReducer, useRef } from 'react';
import brickImg from '../../assets/painfulBricks/pixel_bricks_red.png';
import { formatCompactNumber } from '../formatCompactNumber';
import { createInitialItems, type InventoryItem } from './inventoryConfig';
import './Inventory.css';

type InventoryProps = {
  jarSlips: number;
};

type InventoryState = {
  coins: number;
  items: InventoryItem[];
};

type InventoryAction =
  | { type: 'add_coins'; amount: number }
  | { type: 'tick' }
  | { type: 'buy'; id: number };

function inventoryReducer(
  state: InventoryState,
  action: InventoryAction,
): InventoryState {
  switch (action.type) {
    case 'add_coins':
      return { ...state, coins: state.coins + action.amount };
    case 'tick': {
      const income = state.items.reduce(
        (sum, item) => sum + item.count * item.baseCoinsPerSecond,
        0,
      );
      return income > 0 ? { ...state, coins: state.coins + income } : state;
    }
    case 'buy': {
      const item = state.items.find((entry) => entry.id === action.id);
      if (!item || state.coins < item.price) {
        return state;
      }

      return {
        coins: state.coins - item.price,
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

export default function Inventory({ jarSlips }: InventoryProps) {
  const [state, dispatch] = useReducer(inventoryReducer, {
    coins: 0,
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
      dispatch({ type: 'add_coins', amount: delta });
    }
    prevJarSlips.current = jarSlips;
  }, [jarSlips]);

  useEffect(() => {
    if (coinsPerSecond === 0) {
      return;
    }

    const intervalId = window.setInterval(() => {
      dispatch({ type: 'tick' });
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [coinsPerSecond]);

  function buyItem(id: number) {
    dispatch({ type: 'buy', id });
  }

  const brickItem = state.items.find((item) => item.id === 1);

  return (
    <div className="inventory">
      <section className="inventory-summary">
        <div className="inventory-heading">
          <img
            className="inventory-brick"
            src={brickImg}
            alt={brickItem?.description ?? 'Brick'}
            width={38}
            height={32}
          />
          <div>
            <h1>Swear Jar</h1>
          </div>
        </div>
        <div className="inventory-total-wrap">
          <div className="inventory-total">
            <Coins aria-hidden="true" />
            <span>{formatCompactNumber(state.coins)}</span>
          </div>
          <p className="inventory-total-rate">
            +{formatCompactNumber(coinsPerSecond)}/s
          </p>
        </div>
      </section>

      <section className="inventory-board" aria-label="Swear jar items">
        {state.items.map((item) => {
          const canAfford = state.coins >= item.price;

          return (
            <article className="inventory-person" key={item.id}>
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
