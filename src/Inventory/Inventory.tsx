import { Coins, Plus, RotateCcw } from 'lucide-react';
import { useMemo, useState } from 'react';
import brickImg from '../../assets/painfulBricks/pixel_bricks_red.png';
import { createInitialItems, type InventoryItem } from './inventoryConfig';
import './Inventory.css';

type InventoryProps = {
  jarSlips: number;
  onJarSlipsReset: () => void;
};

export default function Inventory({ jarSlips, onJarSlipsReset }: InventoryProps) {
  const [items, setItems] = useState<InventoryItem[]>(createInitialItems);

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.count, 0) + jarSlips,
    [items, jarSlips],
  );

  function addOne(id: number) {
    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, count: item.count + 1 } : item,
      ),
    );
  }

  const brickItem = items.find((item) => item.id === 1);

  return (
    <main className="app-shell">
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
                <p className="inventory-eyebrow">Team tracker</p>
                <h1>Swear Jar</h1>
              </div>
            </div>
            <div className="inventory-total">
              <Coins aria-hidden="true" />
              <span>{total}</span>
            </div>
          </section>

          <section className="inventory-board" aria-label="Swear jar items">
            {items.map((item) => (
              <article className="inventory-person" key={item.id}>
                <div>
                  {item.description && (
                    <div>
                      <p className="inventory-item-label">{item.name}</p>
                      <p className="inventory-eyebrow">{item.description}</p>
                      <p className="inventory-item-price">{item.price} coins</p>
                    </div>
                  )}
                  <p>{item.count} slips</p>
                </div>
                <button type="button" onClick={() => addOne(item.id)}>
                  <Plus aria-hidden="true" />
                  <span>Add</span>
                </button>
              </article>
            ))}
          </section>
        </div>
    </main>
  );
}
