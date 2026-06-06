import { Coins, Plus, RotateCcw } from 'lucide-react';
import { useMemo } from 'react';
import brickImg from '../../assets/painfulBricks/pixel_bricks_red.png';
import { defaultEntries, type JarEntry } from './defaultEntries';
import { inventoryConfig } from './inventoryConfig';
import './Inventory.css';

type InventoryProps = {
  entries: JarEntry[];
  jarSlips: number;
  onAddOne: (id: number) => void;
  onReset: () => void;
};

export default function Inventory({
  entries,
  jarSlips,
  onAddOne,
  onReset,
}: InventoryProps) {
  const total = useMemo(
    () => entries.reduce((sum, entry) => sum + entry.count, 0) + jarSlips,
    [entries, jarSlips],
  );

  const { bricks } = inventoryConfig;

  return (
    <div className="inventory">
      <section className="inventory-summary">
        <div className="inventory-heading">
          <img
            className="inventory-brick"
            src={brickImg}
            alt={bricks.name}
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

      <section className="inventory-board" aria-label="Swear jar entries">
        {entries.map((entry) => (
          <article className="inventory-person" key={entry.id}>
            <div>
              <h2>{entry.name}</h2>
              <p>{entry.count} slips</p>
            </div>
            <button type="button" onClick={() => onAddOne(entry.id)}>
              <Plus aria-hidden="true" />
              <span>Add</span>
            </button>
          </article>
        ))}
      </section>

      <button className="inventory-reset" type="button" onClick={onReset}>
        <RotateCcw aria-hidden="true" />
        <span>Reset</span>
      </button>
    </div>
  );
}

export { defaultEntries };
