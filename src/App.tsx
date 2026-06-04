import { Coins, Plus, RotateCcw } from 'lucide-react';
import { useMemo, useState } from 'react';
import React from 'react';

const defaultEntries = [
  { id: 1, name: 'Alex', count: 3 },
  { id: 2, name: 'Jordan', count: 1 },
  { id: 3, name: 'Sam', count: 2 },
];

export default function App() {
  const [entries, setEntries] = useState(defaultEntries);
  const total = useMemo(
    () => entries.reduce((sum, entry) => sum + entry.count, 0),
    [entries],
  );

  function addOne(id) {
    setEntries((current) =>
      current.map((entry) =>
        entry.id === id ? { ...entry, count: entry.count + 1 } : entry,
      ),
    );
  }

  function reset() {
    setEntries(defaultEntries);
  }

  return (
    <main className="app-shell">
      <section className="summary">
        <div>
          <p className="eyebrow">Team tracker</p>
          <h1>Swear Jar</h1>
        </div>
        <div className="total">
          <Coins aria-hidden="true" />
          <span>{total}</span>
        </div>
      </section>

      <section className="board" aria-label="Swear jar entries">
        {entries.map((entry) => (
          <article className="person" key={entry.id}>
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

      <button className="reset" type="button" onClick={reset}>
        <RotateCcw aria-hidden="true" />
        <span>Reset</span>
      </button>
    </main>
  );
}
