import { Coins, Plus, RotateCcw } from 'lucide-react';
import { useMemo, useState } from 'react';
import brickImg from '../../assets/painfulBricks/pixel_bricks_red.png';
import { inventoryConfig } from './inventoryConfig';
import './Inventory.css';

const defaultEntries = [
  { id: 1, name: 'Alex', count: 3 },
  { id: 2, name: 'Jordan', count: 1 },
  { id: 3, name: 'Sam', count: 2 },
];

export default function Inventory() {
  const [entries, setEntries] = useState(defaultEntries);
  const total = useMemo(
    () => entries.reduce((sum, entry) => sum + entry.count, 0),
    [entries],
  );

  function addOne(id: number) {
    setEntries((current) =>
      current.map((entry) =>
        entry.id === id ? { ...entry, count: entry.count + 1 } : entry,
      ),
    );
  }

  function reset() {
    setEntries(defaultEntries);
  }

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
            <button type="button" onClick={() => addOne(entry.id)}>
              <Plus aria-hidden="true" />
              <span>Add</span>
            </button>
          </article>
        ))}
      </section>

      <button className="inventory-reset" type="button" onClick={reset}>
        <RotateCcw aria-hidden="true" />
        <span>Reset</span>
      </button>
    </div>
  );
}
